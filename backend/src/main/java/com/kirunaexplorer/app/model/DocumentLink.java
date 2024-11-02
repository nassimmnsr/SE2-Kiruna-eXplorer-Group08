package com.kirunaexplorer.app.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class DocumentLink {

    @EmbeddedId
    private DocumentLinkId id;

    @ManyToOne
    @MapsId("documentId")
    @JoinColumn(name = "document_id")
    private Document document;

    @ManyToOne
    @MapsId("linkedDocumentId")
    @JoinColumn(name = "linked_document_id")
    private Document linkedDocument;

    private String linkType;
    private LocalDateTime createdAt;
}