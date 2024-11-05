package com.kirunaexplorer.app.dto.response;

import com.kirunaexplorer.app.constants.DocumentLinkType;

public record LinkDocumentsResponse(Long documentId, Long linkedDocumentId, DocumentLinkType type) {
}
