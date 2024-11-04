package com.kirunaexplorer.app.service;

import com.kirunaexplorer.app.dto.response.DocumentBriefResponseDTO;
import com.kirunaexplorer.app.dto.response.DocumentResponseDTO;
import com.kirunaexplorer.app.model.Document;
import com.kirunaexplorer.app.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
            document.getId(),
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
}
