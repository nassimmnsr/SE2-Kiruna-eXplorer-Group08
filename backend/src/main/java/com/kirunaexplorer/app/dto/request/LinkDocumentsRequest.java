package com.kirunaexplorer.app.dto.request;

import com.kirunaexplorer.app.constants.DocumentLinkType;

public record LinkDocumentsRequest(Long idDocument1, Long idDocument2, DocumentLinkType type) {
}
