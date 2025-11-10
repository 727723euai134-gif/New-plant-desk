package com.biophilic.service;

import com.biophilic.entity.Asset;
import com.biophilic.entity.ServiceRequest;
import com.biophilic.entity.WorkOrder;
import com.biophilic.repository.AssetRepository;
import com.biophilic.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScheduledTaskService {
    private final AssetRepository assetRepository;
    private final WorkOrderRepository workOrderRepository;
    private final ServiceRequestService serviceRequestService;

    @Scheduled(cron = "0 0 9 * * *") // Daily at 9 AM
    public void checkAssetsNeedingMaintenance() {
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
        List<Asset> assetsNeedingMaintenance = assetRepository.findAssetsNeedingMaintenance(thirtyDaysAgo);
        
        log.info("Found {} assets needing maintenance", assetsNeedingMaintenance.size());
        
        for (Asset asset : assetsNeedingMaintenance) {
            // Auto-create maintenance request
            serviceRequestService.createServiceRequest(
                asset.getLocation().getCustomer().getCustomerId(),
                asset.getLocation().getLocationId(),
                asset.getAssetId(),
                "Scheduled Maintenance - " + asset.getAssetTag(),
                "Automated maintenance request for asset: " + asset.getDescription(),
                ServiceRequest.Priority.MEDIUM,
                1L // System user
            );
        }
    }

    @Scheduled(cron = "0 0 * * * *") // Hourly
    public void checkOverdueWorkOrders() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        List<WorkOrder> overdueOrders = workOrderRepository.findOverdueWorkOrders(sevenDaysAgo);
        
        log.info("Found {} overdue work orders", overdueOrders.size());
        
        // Send notifications (WebSocket implementation needed)
        for (WorkOrder order : overdueOrders) {
            log.warn("Work order {} is overdue", order.getWorkOrderId());
        }
    }
}