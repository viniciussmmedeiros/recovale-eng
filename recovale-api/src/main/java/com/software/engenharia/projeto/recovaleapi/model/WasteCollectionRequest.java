package com.software.engenharia.projeto.recovaleapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "id") @ToString(of = "id")
public class WasteCollectionRequest {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column
    private Long collectionPointId;

    @Column
    private Long senderId;

    @Column
    private Long adminId;

    @Column
    private String status;

    @Column
    private Date requestDate;

    @Column
    private Date scheduledDate;
}
