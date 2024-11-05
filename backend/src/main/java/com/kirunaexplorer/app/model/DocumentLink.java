package com.kirunaexplorer.app.model;

import com.kirunaexplorer.app.constants.DocumentLinkType;
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

    @Enumerated(EnumType.STRING)
    private DocumentLinkType type;
    private LocalDateTime createdAt;

    // TODO write mapping function to convert DocumentLink to DocumentLinkDTO
}