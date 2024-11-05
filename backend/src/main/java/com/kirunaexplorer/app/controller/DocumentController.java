package com.kirunaexplorer.app.controller;

import com.kirunaexplorer.app.dto.request.DocumentRequestDTO;
import com.kirunaexplorer.app.dto.response.DocumentBriefResponseDTO;
import com.kirunaexplorer.app.dto.response.DocumentResponseDTO;
import com.kirunaexplorer.app.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/documents")
public class DocumentController {
    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    /***
     * Endpoint to get all documents in brief format
     * @return List of DocumentBriefResponseDTO
     */
    @GetMapping
    public ResponseEntity<List<DocumentBriefResponseDTO>> getAllDocuments() {
        List<DocumentBriefResponseDTO> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    /***
     * Endpoint to get a document by id
     * @param id Document id
     * @return DocumentResponseDTO
     */
    @GetMapping("/{id}")
    public ResponseEntity<DocumentResponseDTO> getDocumentById(@PathVariable Long id) {
        DocumentResponseDTO document = documentService.getDocumentById(id);
        return ResponseEntity.ok(document);
    }

    /***
     * Endpoint to create a document
     * @param document DocumentRequestDTO
     * @return ResponseEntity<Void>
     */
    @PostMapping
    public ResponseEntity<Void> createDocument(@RequestBody DocumentRequestDTO document) {
        DocumentRequestDTO createdDocument = documentService.createDocument(document);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(createdDocument.id())
            .toUri();
        return ResponseEntity.created(location).build();
    }

    /***
     * Endpoint to update a document
     * @param document DocumentRequestDTO
     * @return ResponseEntity<Void>
     */
    @PutMapping
    public ResponseEntity<Void> updateDocument(@RequestBody DocumentRequestDTO document) {
        documentService.updateDocument(document);
        return ResponseEntity.noContent().build();
    }
}


