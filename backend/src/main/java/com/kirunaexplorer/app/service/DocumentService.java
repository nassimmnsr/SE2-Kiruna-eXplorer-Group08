package com.kirunaexplorer.app.service;

import com.kirunaexplorer.app.dto.inout.DocumentDTO;
import com.kirunaexplorer.app.dto.inout.GeolocationDTO;
import com.kirunaexplorer.app.dto.inout.StakeholderDTO;
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
     * @return List of DocumentResponseDTO
     */
    public List<DocumentResponseDTO> getAllDocuments() {
        List<Document> documents = documentRepository.findAll();

        return documents.stream()
            .map(document ->
                new DocumentResponseDTO(
                    new DocumentDTO(
                        document.getId(),
                        document.getTitle(),
                        document.getStakeholders().stream()
                            .map(stakeholder -> new StakeholderDTO(stakeholder.getId(), stakeholder.getName()))
                            .toList(),
                        document.getScale(),
                        document.getIssuanceDate().toString(),
                        document.getType(),
                        0,//document.getNrConnections(),
                        document.getLanguage(),
                        0,//document.getNrPages(),
                        new GeolocationDTO("67.8525", "20.2253"),//document.getGeolocation(),
                        document.getDescription()
                    )
                )
            )
            .toList();
    }
}
