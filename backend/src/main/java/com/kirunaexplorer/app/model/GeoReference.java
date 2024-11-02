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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "document_id")
    private Document document;

    @Column(columnDefinition = "geography(Point, 4326)")
    private Point location;

    private String areaDescription;

}
