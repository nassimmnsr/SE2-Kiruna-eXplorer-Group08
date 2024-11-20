package com.kirunaexplorer.app.controller;

import com.kirunaexplorer.app.dto.request.LinkDocumentsRequestDTO;
import com.kirunaexplorer.app.dto.response.LinkDocumentsResponseDTO;
import com.kirunaexplorer.app.service.DocumentLinkService;
import com.kirunaexplorer.app.validation.groups.link.PostLink;
import jakarta.validation.groups.Default;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/documents")
public class DocumentLinkController {

    private final DocumentLinkService documentLinkService;

    public DocumentLinkController(DocumentLinkService documentLinkService) {
        this.documentLinkService = documentLinkService;
    }


    @PostMapping("/{id}/links")
    public ResponseEntity<Void> linkDocuments(@PathVariable Long id, @RequestBody @Validated({Default.class, PostLink.class}) LinkDocumentsRequestDTO request) {
        System.out.println("Linking documents");
        LinkDocumentsResponseDTO response = documentLinkService.linkDocuments(id, request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(response.linkId())
            .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}/links")
    public ResponseEntity<Void> updateLink(@PathVariable Long id, @RequestBody LinkDocumentsRequestDTO request) {
        documentLinkService.updateLink(id, request);
        return ResponseEntity.noContent().build();
    }
}
