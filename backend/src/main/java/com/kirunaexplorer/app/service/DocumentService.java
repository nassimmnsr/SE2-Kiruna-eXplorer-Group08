package com.kirunaexplorer.app.service;

import com.kirunaexplorer.app.dto.request.DocumentRequestDTO;
import com.kirunaexplorer.app.dto.response.DocumentBriefResponseDTO;
import com.kirunaexplorer.app.dto.response.DocumentResponseDTO;
import com.kirunaexplorer.app.model.Document;
import com.kirunaexplorer.app.repository.DocumentRepository;
import com.kirunaexplorer.app.repository.GeoReferenceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DocumentService {
    private final DocumentRepository documentRepository;
    private final GeoReferenceRepository geoReferenceRepository;

    public DocumentService(DocumentRepository documentRepository, GeoReferenceRepository geoReferenceRepository) {
        this.geoReferenceRepository = geoReferenceRepository;
        this.documentRepository = documentRepository;
    }

    /***
     * Get all documents in brief format
     * @return List of DocumentBriefResponseDTO
     */
    public List<DocumentBriefResponseDTO> getAllDocuments() {
        List<Document> documents = documentRepository.findAll();

        return documents.stream()
            .map(Document::toDocumentBriefResponseDTO)
            .toList();
    }

    /***
     * Get a document by id
     * @param id Document id
     * @return DocumentResponseDTO
     */
    public DocumentResponseDTO getDocumentById(Long id) {
        Document document = documentRepository.findById(id).orElseThrow();

        return document.toDocumentResponseDTO();
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
     * Update a document
     * @param updatedDocument DocumentRequestDTO
     */
    @Transactional
    public void updateDocument(DocumentRequestDTO updatedDocument) {
        documentRepository.findById(Long.valueOf(updatedDocument.id())).map(existingDocument -> {
            existingDocument.updateDocument(updatedDocument);
            geoReferenceRepository.save(existingDocument.getGeoReference());
            return documentRepository.save(existingDocument);
        }).orElseThrow(() -> new RuntimeException("Document not found"));
    }
}
