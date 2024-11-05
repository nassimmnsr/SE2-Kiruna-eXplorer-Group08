package com.kirunaexplorer.app.service;

import com.kirunaexplorer.app.dto.inout.GeolocationDTO;
import com.kirunaexplorer.app.dto.request.DocumentRequestDTO;
import com.kirunaexplorer.app.dto.response.DocumentBriefResponseDTO;
import com.kirunaexplorer.app.dto.response.DocumentResponseDTO;
import com.kirunaexplorer.app.model.Document;
import com.kirunaexplorer.app.model.DocumentLink;
import com.kirunaexplorer.app.model.DocumentLinkId;
import com.kirunaexplorer.app.model.GeoReference;
import com.kirunaexplorer.app.repository.DocumentRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    /***
     * Get all documents
     * @return List of DocumentBriefResponseDTO
     */
    public List<DocumentBriefResponseDTO> getAllDocuments() {
        List<Document> documents = documentRepository.findAll();

        return documents.stream()
            .map(
                document -> new DocumentBriefResponseDTO(
                    document.getId(),
                    document.getTitle(),
                    document.getScale(),
                    document.getIssuanceDate().toString(),
                    document.getType()
                )
            ).toList();
    }

    /***
     * Get a document by id
     * @param id Document id
     * @return DocumentResponseDTO
     */
    public DocumentResponseDTO getDocumentById(Long id) {
        Document document = documentRepository.findById(id).orElseThrow();

        return new DocumentResponseDTO(
            Math.toIntExact(document.getId()),
            document.getTitle(),
            List.of(document.getStakeholders().split(";")),
            document.getScale(),
            document.getIssuanceDate().toString(),
            document.getType(),
            document.getDocumentLinks().size(),
            document.getLanguage(),
            document.getPages(),
            document.getGeoReference(),
            document.getDescription()
        );
    }

    /***
     * Create a document
     * @param document DocumentRequestDTO
     * @return DocumentRequestDTO
     */
    @Transactional
    public DocumentRequestDTO createDocument(DocumentRequestDTO document) {
        Document newDocument = new Document(
            Long.valueOf(document.id()),
            document.title(),
            document.description(),
            String.join(";", document.stakeholders()),
            document.type(),
            document.scale(),
            LocalDate.parse(document.issuance_date()),
            Document.DatePrecision.FULL_DATE,
            document.language(),
            document.nr_pages(),
            LocalDateTime.now(),
            LocalDateTime.now(),
            null,
            null,
            /*document.links().stream()
                .map(link -> new DocumentLink(
                    new DocumentLinkId(document.id(), getIdFromUri(link.uri())),
                    documentRepository.findById(Long.valueOf(document.id())).orElseThrow(),
                    documentRepository.findById(Long.valueOf(getIdFromUri(link.uri()))).orElseThrow(),
                    link.type(),
                    LocalDateTime.now()
                ))
                .collect(Collectors.toSet()),
            new GeoReference(
                document.id(),
                documentRepository.findById(Long.valueOf(document.id())).orElseThrow(),
                document.geolocation().municipality() != null,  // if municipality is not null, then set it to true, otherwise false
                document.geolocation().municipality() == null ? createPoint(document.geolocation().latitude(), document.geolocation().longitude()) : null       // if municipality is null, then create a point, otherwise set it to null
            ),*/
            null
        );

        newDocument = documentRepository.save(newDocument);

        return new DocumentRequestDTO(
            Math.toIntExact(newDocument.getId()),
            newDocument.getTitle(),
            List.of(newDocument.getStakeholders().split(";")),
            newDocument.getScale(),
            newDocument.getIssuanceDate().toString(),
            newDocument.getType(),
            newDocument.getDocumentLinks().size(),
            newDocument.getLanguage(),
            newDocument.getPages(),
            document.geolocation(),         // this needs to be swapped to a conversion from Point to GeolocationDTO
            newDocument.getDescription(),
            document.links()                // this needs to be swapped to a conversion from DocumentLink to LinksDTO
        );
    }

    /***
     * Create a point for PostGIS
     * @param latitude
     * @param longitude
     * @return Point
     */
    private Point createPoint(String latitude, String longitude) {
        return new GeometryFactory().createPoint(new Coordinate(Double.parseDouble(latitude), Double.parseDouble(longitude)));
    }

    /***
     * Get the id from the uri /documents/{id}
     * @param uri
     * @return Integer
     */
    private Integer getIdFromUri(String uri) {
        return Integer.parseInt(uri.substring(uri.lastIndexOf('/') + 1));
    }

    /***
     * Update a document
     * @param id Document id
     * @param updatedDocument Document
     * @return Document
     */
    @Transactional
    public Document updateDocument(DocumentRequestDTO updatedDocument) {
        return documentRepository.findById(Long.valueOf(updatedDocument.id())).map(existingDocument -> {
            existingDocument.setTitle(updatedDocument.title());
            existingDocument.setDescription(updatedDocument.description());
            existingDocument.setStakeholders(String.join(";", updatedDocument.stakeholders()));
            existingDocument.setType(updatedDocument.type());
            existingDocument.setScale(updatedDocument.scale());
            existingDocument.setIssuanceDate(LocalDate.parse(updatedDocument.issuance_date()));
            existingDocument.setLanguage(updatedDocument.language());
            existingDocument.setPages(updatedDocument.nr_pages());
            existingDocument.setUpdatedAt(LocalDateTime.now()); // Update timestamp
            return documentRepository.save(existingDocument); // Save the updated document
        }).orElseThrow(() -> new RuntimeException("Document not found"));
    }
}
