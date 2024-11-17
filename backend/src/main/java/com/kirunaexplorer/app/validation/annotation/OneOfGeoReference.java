package com.kirunaexplorer.app.validation.annotation;

import com.kirunaexplorer.app.validation.validator.OneOfGeoReferenceValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = OneOfGeoReferenceValidator.class)
public @interface OneOfGeoReference {
    String message() default "Geolocation must match one of the specified formats";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
