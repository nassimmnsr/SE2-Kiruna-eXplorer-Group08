package com.kirunaexplorer.app.dto.request;

import com.kirunaexplorer.app.dto.inout.GeoReferenceDTO;
import com.kirunaexplorer.app.dto.inout.LinksDTO;
import com.kirunaexplorer.app.model.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

public record DocumentRequestDTO(
    Long id,
    String title,
    List<String> stakeholders,
    String scale,
    String issuanceDate,
    String type,
    Integer nrConnections,
    String language,
    Integer nrPages,
    GeoReferenceDTO geolocation,
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
