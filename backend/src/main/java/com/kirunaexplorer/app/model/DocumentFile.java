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
public class DocumentFile {

    @Id
    private Integer id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Document document;

    private String filePath;
    private String fileType;
    private LocalDateTime uploadedAt;
    private Integer fileSize;
}