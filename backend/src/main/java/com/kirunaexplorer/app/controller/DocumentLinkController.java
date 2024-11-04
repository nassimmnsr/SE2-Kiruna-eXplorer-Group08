package com.kirunaexplorer.app.controller;

import com.kirunaexplorer.app.dto.request.LinkDocumentsRequest;
import com.kirunaexplorer.app.dto.response.LinkDocumentsResponse;
import com.kirunaexplorer.app.service.DocumentLinkService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/documents/links")
public class DocumentLinkController {

    private final DocumentLinkService documentLinkService;

    public DocumentLinkController(DocumentLinkService documentLinkService) {
        this.documentLinkService = documentLinkService;
    }

    @PostMapping
    public ResponseEntity<LinkDocumentsResponse> linkDocuments(@RequestBody LinkDocumentsRequest request) {
        LinkDocumentsResponse response = documentLinkService.linkDocuments(request);
        return new ResponseEntity<>(response, HttpStatus.OK); // Return 200 OK on success
    }
}
