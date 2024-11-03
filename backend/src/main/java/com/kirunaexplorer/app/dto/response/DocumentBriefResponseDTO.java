package com.kirunaexplorer.app.dto.response;

public record DocumentBriefResponseDTO(
    Integer id,
    String title,
    String scale,
    String issuance_date,
    String type
) {
}
