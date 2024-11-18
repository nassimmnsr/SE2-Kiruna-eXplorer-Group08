package com.kirunaexplorer.app.dto.response;
import com.kirunaexplorer.app.dto.inout.GeoReferenceDTO;
import java.util.List;

public record DocumentBriefResponseDTO(
    Long id,
    String title,
    String scale,
    String issuanceDate,
    String type,
    GeoReferenceDTO geolocation,
    List<String> stakeholders
) {
}
