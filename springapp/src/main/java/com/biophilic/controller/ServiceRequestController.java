package com.biophilic.controller;

import com.biophilic.entity.ServiceRequest;
import com.biophilic.service.ServiceRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/requests")
@RequiredArgsConstructor
public class ServiceRequestController {
    private final ServiceRequestService serviceRequestService;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('ADMIN')")
    public ResponseEntity<ServiceRequest> createRequest(@RequestBody Map<String, Object> request) {
        ServiceRequest serviceRequest = serviceRequestService.createServiceRequest(
            Long.valueOf(request.get("customerId").toString()),
            request.get("locationId") != null ? Long.valueOf(request.get("locationId").toString()) : null,
            request.get("assetId") != null ? Long.valueOf(request.get("assetId").toString()) : null,
            request.get("title").toString(),
            request.get("description").toString(),
            ServiceRequest.Priority.valueOf(request.get("priority").toString()),
            Long.valueOf(request.get("createdByUser").toString())
        );
        return ResponseEntity.ok(serviceRequest);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TECHNICIAN')")
    public ResponseEntity<ServiceRequest> getRequest(@PathVariable Long id) {
        // Implementation needed
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('TECHNICIAN')")
    public ResponseEntity<ServiceRequest> updateRequest(@PathVariable Long id, @RequestBody Map<String, String> request) {
        ServiceRequest.RequestStatus status = ServiceRequest.RequestStatus.valueOf(request.get("status"));
        ServiceRequest updated = serviceRequestService.updateRequestStatus(id, status);
        return ResponseEntity.ok(updated);
    }
}