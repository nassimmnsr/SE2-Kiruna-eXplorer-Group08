package com.kirunaexplorer.app.dto.request;

import com.kirunaexplorer.app.dto.inout.GeoReferenceDTO;
import com.kirunaexplorer.app.dto.inout.LinksDTO;
import com.kirunaexplorer.app.model.Document;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

public record DocumentRequestDTO(
    Long id,

    @NotNull
    @Size(min = 2, max = 64)
    String title,

    @NotNull
    @Size(min = 1)
    List<@Size(min = 2, max = 64) String> stakeholders,

    @NotNull
    @Pattern(regexp = "text|blueprint/material effects|^1:[1-9][0-9]*$")
    String scale,

    @NotNull
    @Pattern(regexp = "^\\d{4}-(0[1-9]|1[0-2])$|^\\d{4}$")
    String issuanceDate,

    @NotNull
    @Pattern(regexp = "Design document|Material effect|Technical document|Prescriptive document|Informative document")
    String type,

    @Min(0)
    Integer nrConnections,

    @Size(min = 2, max = 64)
    String language,

    @Min(0)
    Integer nrPages,

    GeoReferenceDTO geolocation,

    @Size(max = 1000)
    String description,

    List<LinksDTO> links
) {

    /***
     * Converts the DocumentRequestDTO to a Document object.
     * @return Document object
     */
    public Document toDocument() {
        return new Document(
            id,
            title,
            description,
            String.join("/", stakeholders),
            type,
            scale,
            parseIssuanceDate(issuanceDate),
            determineDatePrecision(issuanceDate),
            language,
            nrPages,
            LocalDateTime.now(),
            null,
            new HashSet<>(),
            null,
            new HashSet<>()
        );
    }

    /***
     * Returns the DatePrecision of the date.
     * @param date date
     * @return DatePrecision
     */
    public Document.DatePrecision determineDatePrecision(String date) {
        return switch (date.length()) {
            case 4 -> Document.DatePrecision.YEAR_ONLY;
            case 7 -> Document.DatePrecision.MONTH_YEAR;
            default -> Document.DatePrecision.FULL_DATE;
        };
    }

    public LocalDate parseIssuanceDate(String date) {
        return LocalDate.parse(
            switch (date.length()) {
                case 4 -> date + "-01-01";
                case 7 -> date + "-01";
                default -> date;
            }
        );
    }

}
