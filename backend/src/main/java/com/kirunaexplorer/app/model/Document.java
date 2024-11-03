package com.kirunaexplorer.app.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
@Table(name =   "DOCUMENT")
public class Document {

    public enum DatePrecision {
        YEAR_ONLY,
        MONTH_YEAR,
        FULL_DATE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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
}