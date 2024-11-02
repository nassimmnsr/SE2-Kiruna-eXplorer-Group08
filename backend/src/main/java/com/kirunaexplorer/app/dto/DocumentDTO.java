package com.kirunaexplorer.app.dto;

import java.util.List;

public record DocumentDTO(
        Integer id,
        String title,
        List<StakeholderDTO> stakeholders,
        String scale,
        String issuance_date,
        String type,
        Integer nr_connections,
        String language,
        Integer nr_pages,
        GeolocationDTO geolocation,
        String description
) {
}
