package com.kirunaexplorer.app.dto.inout;

import com.kirunaexplorer.app.model.Document;
import com.kirunaexplorer.app.model.GeoReference;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

public record GeoReferenceDTO(String latitude, String longitude, String municipality) {
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

    public Point createPoint(String latitude, String longitude) {
        return new GeometryFactory().createPoint(new Coordinate(
                Double.parseDouble(longitude), Double.parseDouble(latitude)
        ));
    }
}
