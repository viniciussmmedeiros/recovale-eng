package com.software.engenharia.projeto.recovaleapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.sql.Date;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "id") @ToString(of = "id")
public class CollectionPoint {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    private String name;

    private int capacity;

    @Column(name = "current_capacity")
    private int currentCapacity;

    @Column(nullable = false)
    private BigDecimal longitude;

    @Column(nullable = false)
    private BigDecimal latitude;

    @Column
    private Long senderId;

    @Column
    private Date requestDate;

    @Column
    private boolean approved;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}
