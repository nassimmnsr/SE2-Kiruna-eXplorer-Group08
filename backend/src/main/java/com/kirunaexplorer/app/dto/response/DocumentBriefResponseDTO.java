package com.kirunaexplorer.app.dto.response;
import com.kirunaexplorer.app.dto.inout.GeoReferenceDTO;

public record DocumentBriefResponseDTO(
    Long id,
    String title,
    String scale,
    String issuanceDate,
    String type,
    GeoReferenceDTO geolocation
) {
}
