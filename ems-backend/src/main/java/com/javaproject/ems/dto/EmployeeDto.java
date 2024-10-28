package com.javaproject.ems.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {


    @Schema(requiredMode = Schema.RequiredMode.NOT_REQUIRED, accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "John"
    )
    private String firstName;

    @Schema(
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "Doe"
    )
    private String lastName;

    @Schema(
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "john.doe@gmail.com"
    )
    private String email;

    @Schema(
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "IT"
    )
    private String department;

    @Schema(
            requiredMode = Schema.RequiredMode.REQUIRED,
            example = "Manager"
    )
    private String role;

    @Schema(
            requiredMode = Schema.RequiredMode.NOT_REQUIRED,
            accessMode = Schema.AccessMode.READ_ONLY,
            hidden = true)
    private boolean isActive;
}
