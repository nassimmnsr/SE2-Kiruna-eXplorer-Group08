package com.kirunaexplorer.app.dto.response;

public record DocumentBriefResponseDTO(
    Long id,
    String title,
    String scale,
    String issuanceDate,
    String type
) {
}
