package com.kirunaexplorer.app.dto.inout;

import com.kirunaexplorer.app.model.Document;
import com.kirunaexplorer.app.model.GeoReference;
import com.kirunaexplorer.app.validation.annotation.OneOfGeoReference;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

import jakarta.validation.constraints.*;

@OneOfGeoReference
public record GeoReferenceDTO(
    @DecimalMin(value = "67.82295")
    @DecimalMax(value = "67.88398")
    Double latitude,  // Latitude as a Double to match the "number" type

    @DecimalMin(value = "20.14402")
    @DecimalMax(value = "20.3687")
    Double longitude,  // Longitude as a Double to match the "number" type

    @Pattern(regexp = "Whole municipality")
    @Size(min = 2, max = 64)
    String municipality  // To match the string type with pattern and length constraints
) {
    public GeoReferenceDTO {
        if ((latitude == null || longitude == null) && (municipality == null)) {
            throw new IllegalArgumentException("Either latitude and longitude or municipality must be provided.");
        }
        if ((latitude != null && longitude != null) && (municipality != null)) {
            throw new IllegalArgumentException("Cannot provide both latitude/longitude and municipality at the same time.");
        }
    }

    /***
     * Converts the GeoReferenceDTO to a GeoReference object.
     * @param document Document reference
     * @return GeoReference object
     */
    public GeoReference toGeoReference(Document document) {
        return new GeoReference(
            document,
            municipality != null,
            municipality == null ? createPoint(latitude, longitude) : null
        );
    }

    public Point createPoint(Double latitude, Double longitude) {
        return new GeometryFactory().createPoint(new Coordinate(
            longitude, latitude
        ));
    }
}
