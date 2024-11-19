package com.kirunaexplorer.app;

import com.kirunaexplorer.app.dto.inout.GeoReferenceDTO;
import com.kirunaexplorer.app.dto.request.DocumentRequestDTO;
import com.kirunaexplorer.app.validation.groups.PostDocument;
import com.kirunaexplorer.app.validation.groups.PutDocument;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import jakarta.validation.ConstraintViolation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class DocumentRequestDTOValidationTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    // Helper method to assert violations
    private void assertViolationContainsMessage(Set<ConstraintViolation<DocumentRequestDTO>> violations, String message) {
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains(message)), "Violation not found: " + message);
    }

    // --------- Test Valid Cases ---------

    @Test
    void testValidPostDocument() {
        DocumentRequestDTO dto = new DocumentRequestDTO(
                null, // id must be null for POST
                "Valid Title",
                List.of("Stakeholder1", "Stakeholder2"),
                "1:1000",
                "2024-01-01",
                "Design document",
                5,
                "English",
                100,
                new GeoReferenceDTO(67.85, 20.15, null),
                "Valid description"
        );

        Set<ConstraintViolation<DocumentRequestDTO>> violations = validator.validate(dto, PostDocument.class);
        assertTrue(violations.isEmpty(), "Expected no violations for a valid POST document");
    }

    @Test
    void testValidPutDocument() {
        DocumentRequestDTO dto = new DocumentRequestDTO(
                1L, // id must not be null for PUT
                "Valid Title",
                List.of("Stakeholder1", "Stakeholder2"),
                "1:1000",
                "2024-01-01",
                "Design document",
                5,
                "English",
                100,
                new GeoReferenceDTO(67.85, 20.15, null),
                "Valid description"
        );

        Set<ConstraintViolation<DocumentRequestDTO>> violations = validator.validate(dto, PutDocument.class);
        assertTrue(violations.isEmpty(), "Expected no violations for a valid PUT document");
    }

    // --------- Test for Individual Field Violations ---------

    @Test
    void testIdFieldPostGroup() {
        DocumentRequestDTO dto = new DocumentRequestDTO(
                1L, // id must be null for POST
                "Valid Title",
                List.of("Stakeholder1"),
                "1:1000",
                "2024-01-01",
                "Design document",
                5,
                "English",
                100,
                new GeoReferenceDTO(67.85, 20.15, null),
                "Valid description"
        );

        Set<ConstraintViolation<DocumentRequestDTO>> violations = validator.validate(dto, PostDocument.class);
        assertFalse(violations.isEmpty(), "Expected violations when id is not null for POST document");
        assertViolationContainsMessage(violations, "must be null");
    }

    @Test
    void testIdFieldPutGroup() {
        DocumentRequestDTO dto = new DocumentRequestDTO(
                null, // id must not be null for PUT
                "Valid Title",
                List.of("Stakeholder1"),
                "1:1000",
                "2024-01-01",
                "Design document",
                5,
                "English",
                100,
                new GeoReferenceDTO(67.85, 20.15, null),
                "Valid description"
        );

        Set<ConstraintViolation<DocumentRequestDTO>> violations = validator.validate(dto, PutDocument.class);
        assertFalse(violations.isEmpty(), "Expected violations when id is null for PUT document");
        assertViolationContainsMessage(violations, "must not be null");
    }

    @Test
    void testTitleFieldViolations() {
        // Title too short
        DocumentRequestDTO dto = new DocumentRequestDTO(
                null,
                "A", // Invalid: too short
                List.of("Stakeholder1"),
                "1:1000",
                "2024-01-01",
                "Design document",
                5,
                "English",
                100,
                new GeoReferenceDTO(67.85, 20.15, null),
                "Valid description"
        );

        Set<ConstraintViolation<DocumentRequestDTO>> violations = validator.validate(dto, PostDocument.class);
        assertFalse(violations.isEmpty(), "Expected violations for invalid title");
        assertViolationContainsMessage(violations, "size must be between 2 and 64");

        // Title too long
        dto = new DocumentRequestDTO(
                null,
                "A".repeat(65), // Invalid: too long
                List.of("Stakeholder1"),
                "1:1000",
                "2024-01-01",
                "Design document",
                5,
                "English",
                100,
                new GeoReferenceDTO(67.85, 20.15, null),
                "Valid description"
        );

        violations = validator.validate(dto, PostDocument.class);
        assertFalse(violations.isEmpty(), "Expected violations for invalid title");
        assertViolationContainsMessage(violations, "size must be between 2 and 64");
    }

    // Similarly, write tests for every field and combination of invalid values
    // Examples include:
    // - `scale` with invalid patterns
    // - `issuanceDate` with invalid formats
    // - `type` with invalid options
    // - Negative values for `nrConnections` and `nrPages`
    // - Long strings for `language` and `description`
    // - Invalid `GeoReferenceDTO` cases

    // --------- Test for GeoReferenceDTO Validation ---------

    @Test
    void testGeoReferenceDTOValidations() {
        // Invalid: All fields specified
        GeoReferenceDTO geoDTO = new GeoReferenceDTO(
                67.85, 20.15, "Municipality"
        );

        DocumentRequestDTO dto = new DocumentRequestDTO(
                null,
                "Valid Title",
                List.of("Stakeholder1"),
                "1:1000",
                "2024-01-01",
                "Design document",
                5,
                "English",
                100,
                geoDTO,
                "Valid description"
        );

        Set<ConstraintViolation<DocumentRequestDTO>> violations = validator.validate(dto, PostDocument.class);
        assertFalse(violations.isEmpty(), "Expected violations for invalid GeoReferenceDTO");
        assertViolationContainsMessage(violations, "OneOfGeoReference constraint violated");
    }

    @Test
    void testGeoReferenceDTOValidCoordinates() {
        GeoReferenceDTO geoDTO = new GeoReferenceDTO(
                67.85, 20.15, null // Valid: Only coordinates specified
        );

        DocumentRequestDTO dto = new DocumentRequestDTO(
                null,
                "Valid Title",
                List.of("Stakeholder1"),
                "1:1000",
                "2024-01-01",
                "Design document",
                5,
                "English",
                100,
                geoDTO,
                "Valid description"
        );

        Set<ConstraintViolation<DocumentRequestDTO>> violations = validator.validate(dto, PostDocument.class);
        assertTrue(violations.isEmpty(), "Expected no violations for valid GeoReferenceDTO");
    }
}
