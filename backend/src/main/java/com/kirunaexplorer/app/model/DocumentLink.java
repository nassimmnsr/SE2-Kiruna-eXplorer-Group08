package com.kirunaexplorer.app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.kirunaexplorer.app.constants.DocumentLinkType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"document", "linkedDocument"})
@ToString(exclude = {"document", "linkedDocument"})
public class DocumentLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for each link

    @ManyToOne
    @JoinColumn(name = "document_id", nullable = false)
    @JsonBackReference
    private Document document; // The originating document

    @ManyToOne
    @JoinColumn(name = "linked_document_id", nullable = false)
    private Document linkedDocument; // The linked document

    @Enumerated(EnumType.STRING)
    private DocumentLinkType type;

    private LocalDateTime createdAt;

}
