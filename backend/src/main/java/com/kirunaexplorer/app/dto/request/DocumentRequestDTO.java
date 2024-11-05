package com.kirunaexplorer.app.dto.request;

import com.kirunaexplorer.app.dto.inout.GeolocationDTO;
import com.kirunaexplorer.app.dto.inout.LinksDTO;
import com.kirunaexplorer.app.model.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

public record DocumentRequestDTO(
    Integer id,
    String title,
    List<String> stakeholders,
    String scale,
    String issuance_date,
    String type,
    Integer nr_connections,
    String language,
    Integer nr_pages,
    GeolocationDTO geolocation,
    String description,
    List<LinksDTO> links
) {

    /***
     * Converts the DocumentRequestDTO to a Document object.
     * @return Document object
     */
    public Document toDocument() {
        return new Document(
            setId(this.id()),
            this.title(),
            this.description(),
            String.join("/", this.stakeholders()),
            this.type(),
            this.scale,
            parseDate(this.issuance_date()),
            getDatePrecision(this.issuance_date()),
            this.language(),
            this.nr_pages(),
            LocalDateTime.now(),
            setUpdateDate(this.id()),
            new HashSet<>(),
            null,
            new HashSet<>()
        );
    }

    /***
     * Converts the DocumentRequestDTO to a Document object.
     * @return Document object
     */
    private LocalDate parseDate(String date) {
        return LocalDate.parse(date.length() == 4 ? date + "-01-01" : date.length() == 7 ? date + "-01" : date);
    }

    /***
     * Returns the DatePrecision of the date.
     * @param date date
     * @return DatePrecision
     */
    private Document.DatePrecision getDatePrecision(String date) {
        return date.length() == 4 ? Document.DatePrecision.YEAR_ONLY : date.length() == 7 ? Document.DatePrecision.MONTH_YEAR : Document.DatePrecision.FULL_DATE;
    }

    /***
     * Sets the update date of the document.
     * @param id document id
     * @return update date
     */
    private LocalDateTime setUpdateDate(Integer id) {
        if(id == null) {        // if id is null, the document is being created, so no update time is set
            return null;
        } else {
            return LocalDateTime.now();
        }
    }

    /***
     * Sets the id of the document.
     * @param id document id
     * @return document id
     */
    private Long setId(Integer id) {
        if(id == null) {        // if id is null, the document is being created, so no id is set
            return null;
        } else {
            return id.longValue();
        }
    }

}
