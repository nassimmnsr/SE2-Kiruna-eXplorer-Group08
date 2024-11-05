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
import com.kirunaexplorer.app.repository.GeoReferenceRepository;
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
    private final GeoReferenceRepository geoReferenceRepository;

    public DocumentService(DocumentRepository documentRepository, GeoReferenceRepository geoReferenceRepository) {
        this.geoReferenceRepository = geoReferenceRepository;
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
    public Long createDocument(DocumentRequestDTO document) {
        Document newDocument = documentRepository.save(document.toDocument());
        geoReferenceRepository.save(document.geolocation().toGeoReference(newDocument));

        return newDocument.getId();
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
     * @param updatedDocument DocumentRequestDTO
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
