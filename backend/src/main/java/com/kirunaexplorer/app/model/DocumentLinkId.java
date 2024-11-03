package com.kirunaexplorer.app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class DocumentLinkId implements Serializable {
    @Column(name = "document_id")
    private Integer documentId;
    @Column(name = "linked_document_id")
    private Integer linkedDocumentId;
}
