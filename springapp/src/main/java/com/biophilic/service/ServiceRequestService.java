package com.biophilic.service;

import com.biophilic.entity.*;
import com.biophilic.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceRequestService {
    private final ServiceRequestRepository serviceRequestRepository;
    private final WorkOrderRepository workOrderRepository;
    private final CustomerRepository customerRepository;
    private final LocationRepository locationRepository;
    private final AssetRepository assetRepository;

    @Transactional
    public ServiceRequest createServiceRequest(Long customerId, Long locationId, Long assetId, 
                                             String title, String description, ServiceRequest.Priority priority, Long createdByUser) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        ServiceRequest request = new ServiceRequest();
        request.setCustomer(customer);
        request.setTitle(title);
        request.setDescription(description);
        request.setPriority(priority);
        request.setCreatedByUser(createdByUser);
        
        if (locationId != null) {
            locationRepository.findById(locationId).ifPresent(request::setLocation);
        }
        if (assetId != null) {
            assetRepository.findById(assetId).ifPresent(request::setAsset);
        }
        
        ServiceRequest savedRequest = serviceRequestRepository.save(request);
        
        // Auto-create WorkOrder
        WorkOrder workOrder = new WorkOrder();
        workOrder.setServiceRequest(savedRequest);
        workOrder.setScheduledDate(LocalDateTime.now().plusDays(1));
        workOrderRepository.save(workOrder);
        
        return savedRequest;
    }

    public List<ServiceRequest> getCustomerRequests(Long customerId) {
        return serviceRequestRepository.findByCustomerCustomerId(customerId);
    }

    public ServiceRequest updateRequestStatus(Long requestId, ServiceRequest.RequestStatus status) {
        ServiceRequest request = serviceRequestRepository.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Service request not found"));
        request.setStatus(status);
        return serviceRequestRepository.save(request);
    }
}