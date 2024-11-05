package com.kirunaexplorer.app.dto.response;

public record DocumentBriefResponseDTO(
    Long id,
    String title,
    String scale,
    String issuance_date,
    String type
) {
}
