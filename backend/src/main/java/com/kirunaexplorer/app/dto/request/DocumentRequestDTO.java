package com.kirunaexplorer.app.dto.request;

import com.kirunaexplorer.app.dto.inout.GeolocationDTO;
import com.kirunaexplorer.app.dto.inout.LinksDTO;

import java.util.List;

public record DocumentRequestDTO(
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
