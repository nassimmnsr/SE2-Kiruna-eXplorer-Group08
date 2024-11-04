package com.kirunaexplorer.app.model;

import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class GeoReference {

    @Id
    @Column(name = "document_id") // Primary key and foreign key
    private Long documentId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "document_id")
    private Document document;

    private boolean isEntireMunicipality; // True if it refers to the whole municipality

    @Column(columnDefinition = "geography(Point, 4326)", nullable = true)
    private Point location; // Nullable, used only for specific point

}
