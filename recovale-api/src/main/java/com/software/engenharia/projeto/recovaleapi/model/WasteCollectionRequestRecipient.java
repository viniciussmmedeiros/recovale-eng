package com.software.engenharia.projeto.recovaleapi.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Setter
@EqualsAndHashCode(of = "id") @ToString(of = "id")
public class WasteCollectionRequestRecipient {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column
    private Long requestId;

    @Column
    private Long recipientId;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}
