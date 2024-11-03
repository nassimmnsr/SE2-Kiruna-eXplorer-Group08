package com.kirunaexplorer.app.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "DOCUMENT")
public class Document {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long docId;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;
    private String stakeholders;
    private String scale;
    private LocalDate issuance_date;
    private String type;
    private String language;
    private Integer pages;
    private LocalDate created_at;
    private LocalDate updated_at;

}
