package com.kirunaexplorer.app.validation.validator;

import com.kirunaexplorer.app.dto.inout.GeoReferenceDTO;
import com.kirunaexplorer.app.validation.annotation.OneOfGeoReference;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class OneOfGeoReferenceValidator implements ConstraintValidator<OneOfGeoReference, GeoReferenceDTO> {

    @Override
    public boolean isValid(GeoReferenceDTO geoReferenceDTO, ConstraintValidatorContext context) {
        if (geoReferenceDTO == null) {
            return true; // Null checks are handled by other annotations if needed
        }

        boolean isCoordinateValid = geoReferenceDTO.latitude() != null && geoReferenceDTO.longitude() != null
            && geoReferenceDTO.municipality() == null;

        boolean isMunicipalityValid = geoReferenceDTO.latitude() == null && geoReferenceDTO.longitude() == null
            && geoReferenceDTO.municipality() != null && geoReferenceDTO.municipality().matches("Whole municipality");

        return isCoordinateValid || isMunicipalityValid;
    }
}
