package com.biophilic.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "maintenance_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @ManyToOne
    @JoinColumn(name = "asset_id", nullable = false)
    private Asset asset;

    @ManyToOne
    @JoinColumn(name = "work_order_id")
    private WorkOrder workOrder;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String servicePerformed;

    @Column(columnDefinition = "TEXT")
    private String conditionReport;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();
}