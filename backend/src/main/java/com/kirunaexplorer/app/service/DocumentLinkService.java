package com.kirunaexplorer.app.service;

import com.kirunaexplorer.app.dto.request.LinkDocumentsRequest;
import com.kirunaexplorer.app.dto.response.LinkDocumentsResponse;
import com.kirunaexplorer.app.exception.ResourceNotFoundException;
import com.kirunaexplorer.app.model.Document;
import com.kirunaexplorer.app.model.DocumentLink;
import com.kirunaexplorer.app.model.DocumentLinkId;
import com.kirunaexplorer.app.repository.DocumentLinkRepository;
import com.kirunaexplorer.app.repository.DocumentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DocumentLinkService {

    private final DocumentRepository documentRepository;
    private final DocumentLinkRepository documentLinkRepository;

    public DocumentLinkService(DocumentRepository documentRepository, DocumentLinkRepository documentLinkRepository) {
        this.documentRepository = documentRepository;
        this.documentLinkRepository = documentLinkRepository;
    }

    public LinkDocumentsResponse linkDocuments(LinkDocumentsRequest request) {
        Document document = documentRepository.findById(request.idDocument1())
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with ID " + request.idDocument1()));

        Document linkedDocument = documentRepository.findById(request.idDocument2())
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with ID " + request.idDocument2()));

        // Create and set the composite key
        DocumentLinkId documentLinkId = new DocumentLinkId(document.getId(), linkedDocument.getId());
        DocumentLink documentLink = new DocumentLink();
        documentLink.setId(documentLinkId); // Set the composite key

        // Set the other properties
        documentLink.setDocument(document);
        documentLink.setLinkedDocument(linkedDocument);
        documentLink.setType(request.type());
        documentLink.setCreatedAt(LocalDateTime.now());

        documentLinkRepository.save(documentLink);

        return new LinkDocumentsResponse(request.idDocument1(), request.idDocument2(), request.type());
    }

}