package com.kirunaexplorer.app.dto.response;

import com.kirunaexplorer.app.dto.inout.GeolocationDTO;
import com.kirunaexplorer.app.dto.inout.LinksDTO;
import com.kirunaexplorer.app.model.GeoReference;

import java.util.List;

public record DocumentResponseDTO(
    Integer id,
    String title,
    List<String> stakeholders,
    String scale,
    String issuance_date,
    String type,
    Integer nr_connections,
    String language,
    Integer nr_pages,
    GeolocationDTO geolocation,
    String description,
    List<LinksDTO> links
) {
}
