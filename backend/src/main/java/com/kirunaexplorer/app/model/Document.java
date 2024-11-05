package com.kirunaexplorer.app.model;

import com.kirunaexplorer.app.dto.request.DocumentRequestDTO;
import com.kirunaexplorer.app.dto.response.DocumentBriefResponseDTO;
import com.kirunaexplorer.app.dto.response.DocumentResponseDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Table(name = "DOCUMENT")
public class Document {

    public enum DatePrecision {
        YEAR_ONLY,
        MONTH_YEAR,
        FULL_DATE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;
    private String stakeholders;
    private String type;
    private String scale;
    private LocalDate issuanceDate;
    @Enumerated(EnumType.STRING)
    private DatePrecision datePrecision;
    private String language;
    private Integer pages;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "document")
    private Set<DocumentLink> documentLinks;

    @OneToOne(mappedBy = "document", cascade = CascadeType.ALL, orphanRemoval = true)
    private GeoReference geoReference; // One-to-one relationship

    @OneToMany(mappedBy = "id")
    private Set<DocumentFile> documentFiles;


    /***
     * Converts the Document object to a DocumentResponseDTO object.
     * @return DocumentResponseDTO object
     */
    public DocumentResponseDTO toDocumentResponseDTO() {
        return new DocumentResponseDTO(
            this.id.intValue(),
            this.title,
            List.of(this.stakeholders.split("/")),
            this.scale,
            parseDate(this.issuanceDate, this.datePrecision),
            this.type,
            this.documentLinks.size(),
            this.language,
            this.pages,
            this.geoReference.toGeolocationDTO(),
            this.description,
            null            // TODO put the mapping function here for the links
        );
    }

    /***
     * Converts the Document object to a DocumentBriefResponseDTO object.
     * @return DocumentBriefResponseDTO object
     */
    public DocumentBriefResponseDTO toDocumentBriefResponseDTO() {
        return new DocumentBriefResponseDTO(
            this.id,
            this.title,
            this.scale,
            parseDate(this.issuanceDate, this.datePrecision),
            this.type
        );
    }

    /***
     * Update the document with the new data
     * @param updatedDocument DocumentRequestDTO
     */
    public void updateDocument(DocumentRequestDTO updatedDocument) {
        this.title = updatedDocument.title();
        this.description = updatedDocument.description();
        this.stakeholders = String.join("/", updatedDocument.stakeholders());
        this.type = updatedDocument.type();
        this.scale = updatedDocument.scale();
        this.issuanceDate = LocalDate.parse(updatedDocument.issuance_date());
        this.language = updatedDocument.language();
        this.pages = updatedDocument.nr_pages();
        this.updatedAt = LocalDateTime.now();
        this.geoReference = updatedDocument.geolocation().toGeoReference(this);
        // TODO update the links
    }

    /***
     * Parse the date to a string given the precision
     * @param issuanceDate date
     * @param datePrecision precision
     * @return String
     */
    private String parseDate(LocalDate issuanceDate, DatePrecision datePrecision) {
        return switch (datePrecision) {
            case YEAR_ONLY -> issuanceDate.getYear() + "";
            case MONTH_YEAR -> issuanceDate.getMonth().toString() + " " + issuanceDate.getYear();
            case FULL_DATE -> issuanceDate.toString();
        };
    }
}
