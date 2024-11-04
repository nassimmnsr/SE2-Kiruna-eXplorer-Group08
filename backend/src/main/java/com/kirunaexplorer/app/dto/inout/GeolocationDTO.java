package com.kirunaexplorer.app.dto.inout;

public record GeolocationDTO(String latitude, String longitude, String municipality) {
    public GeolocationDTO {
        if ((latitude == null || longitude == null) && (municipality == null)) {
            throw new IllegalArgumentException("Either latitude and longitude or municipality must be provided.");
        }
        if ((latitude != null && longitude != null) && (municipality != null)) {
            throw new IllegalArgumentException("Cannot provide both latitude/longitude and municipality at the same time.");
        }
    }
}
