package com.biophilic.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "assets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assetId;

    @Column(unique = true, nullable = false)
    private String assetTag;

    @Column(nullable = false)
    private String assetType;

    private String species;

    @Column(columnDefinition = "TEXT")
    private String description;

    private BigDecimal cost;

    private LocalDate acquisitionDate;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetStatus status = AssetStatus.ACTIVE;

    private LocalDate lastMaintDate;

    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL)
    private List<MaintenanceHistory> maintenanceHistory;

    public enum AssetStatus {
        ACTIVE, MAINTENANCE, RETIRED
    }
}