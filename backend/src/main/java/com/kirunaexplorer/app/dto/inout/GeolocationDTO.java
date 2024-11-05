package com.kirunaexplorer.app.dto.inout;

import com.kirunaexplorer.app.model.Document;
import com.kirunaexplorer.app.model.GeoReference;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

public record GeolocationDTO(String latitude, String longitude, String municipality) {
    public GeolocationDTO {
        if ((latitude == null || longitude == null) && (municipality == null)) {
            throw new IllegalArgumentException("Either latitude and longitude or municipality must be provided.");
        }
        if ((latitude != null && longitude != null) && (municipality != null)) {
            throw new IllegalArgumentException("Cannot provide both latitude/longitude and municipality at the same time.");
        }
    }

    /***
     * Converts the GeolocationDTO to a GeoReference object.
     * @param documentReference Document reference
     * @return GeoReference object
     */
    public GeoReference toGeoReference(Document documentReference) {
        return new GeoReference(
            null,
            documentReference,
            municipality != null,
            setPoint(this.municipality())
        );
    }

    private Point setPoint(String municipality) {
        if (municipality != null) {
            return null;
        } else {
            return new GeometryFactory().createPoint(new Coordinate(Double.parseDouble(latitude), Double.parseDouble(longitude)));
        }
    }
}
