package com.biophilic.repository;

import com.biophilic.entity.WorkOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {
    List<WorkOrder> findByAssignedToUser(Long userId);
    List<WorkOrder> findByStatus(WorkOrder.WorkOrderStatus status);
    
    @Query("SELECT w FROM WorkOrder w WHERE w.status = 'SCHEDULED' AND w.scheduledDate < :date")
    List<WorkOrder> findOverdueWorkOrders(LocalDateTime date);
}