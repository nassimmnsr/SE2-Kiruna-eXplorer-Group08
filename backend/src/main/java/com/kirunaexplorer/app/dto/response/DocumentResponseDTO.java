package com.kirunaexplorer.app.dto.response;

import com.kirunaexplorer.app.dto.inout.GeolocationDTO;
import com.kirunaexplorer.app.dto.inout.StakeholderDTO;
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
    GeoReference geolocation,
    String description
) {
}
