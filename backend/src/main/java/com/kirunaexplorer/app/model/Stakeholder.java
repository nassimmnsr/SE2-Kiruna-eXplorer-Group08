package com.kirunaexplorer.app.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kirunaexplorer.app.dto.request.DocumentRequestDTO;
import com.kirunaexplorer.app.dto.response.DocumentBriefResponseDTO;
import com.kirunaexplorer.app.dto.response.DocumentResponseDTO;
import com.kirunaexplorer.app.dto.response.StakeholderResponseDTO;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode()
@ToString()
@Table(name = "STAKEHOLDERS")
public class Stakeholder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;


    public StakeholderResponseDTO toResponseDTO() {
        return new StakeholderResponseDTO( this.id.intValue()
                                         , this.name
                                         );
    }
}
