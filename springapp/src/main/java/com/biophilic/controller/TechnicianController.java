package com.biophilic.controller;

import com.biophilic.entity.MaintenanceHistory;
import com.biophilic.entity.WorkOrder;
import com.biophilic.repository.MaintenanceHistoryRepository;
import com.biophilic.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/technician")
@PreAuthorize("hasRole('TECHNICIAN')")
@RequiredArgsConstructor
public class TechnicianController {
    private final WorkOrderRepository workOrderRepository;
    private final MaintenanceHistoryRepository maintenanceHistoryRepository;

    @GetMapping("/work-orders")
    public ResponseEntity<List<WorkOrder>> getMyWorkOrders(Authentication auth) {
        // For demo, return all work orders - in real implementation, filter by assigned technician
        return ResponseEntity.ok(workOrderRepository.findAll());
    }

    @PutMapping("/work-orders/{id}/status")
    public ResponseEntity<WorkOrder> updateWorkOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        WorkOrder workOrder = workOrderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Work order not found"));
        
        WorkOrder.WorkOrderStatus status = WorkOrder.WorkOrderStatus.valueOf(request.get("status"));
        workOrder.setStatus(status);
        
        if (status == WorkOrder.WorkOrderStatus.IN_PROGRESS) {
            workOrder.setStartedAt(LocalDateTime.now());
        } else if (status == WorkOrder.WorkOrderStatus.COMPLETED) {
            workOrder.setCompletedAt(LocalDateTime.now());
            workOrder.setCompletionNotes(request.get("notes"));
            
            // Create maintenance history entry
            if (workOrder.getServiceRequest().getAsset() != null) {
                MaintenanceHistory history = new MaintenanceHistory();
                history.setAsset(workOrder.getServiceRequest().getAsset());
                history.setWorkOrder(workOrder);
                history.setServicePerformed(workOrder.getServiceRequest().getTitle());
                history.setConditionReport(request.get("notes"));
                maintenanceHistoryRepository.save(history);
            }
        }
        
        return ResponseEntity.ok(workOrderRepository.save(workOrder));
    }

    @GetMapping("/maintenance-history")
    public ResponseEntity<List<MaintenanceHistory>> getMaintenanceHistory(Authentication auth) {
        return ResponseEntity.ok(maintenanceHistoryRepository.findAll());
    }
}