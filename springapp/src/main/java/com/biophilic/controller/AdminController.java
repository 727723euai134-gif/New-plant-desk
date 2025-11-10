package com.biophilic.controller;

import com.biophilic.entity.*;
import com.biophilic.repository.*;
import com.biophilic.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class AdminController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final ServiceRequestRepository serviceRequestRepository;
    private final ServiceBookingRepository serviceBookingRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final AssetRepository assetRepository;
    private final WorkOrderRepository workOrderRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers(@RequestParam(required = false) String role) {
        if (role != null) {
            return ResponseEntity.ok(userService.getUsersByRole(User.Role.valueOf(role)));
        }
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody Map<String, Object> request) {
        User user = userService.createUser(
            request.get("username").toString(),
            request.get("email").toString(),
            request.get("password").toString(),
            User.Role.valueOf(request.get("role").toString()),
            request.get("customerId") != null ? Long.valueOf(request.get("customerId").toString()) : null
        );
        return ResponseEntity.ok(user);
    }

    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getCustomers() {
        return ResponseEntity.ok(customerRepository.findAll());
    }

    @GetMapping("/subscriptions")
    public ResponseEntity<List<Map<String, Object>>> getSubscriptions() {
        List<Subscription> subscriptions = subscriptionRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        for (Subscription subscription : subscriptions) {
            // Find customer user
            List<User> customerUsers = userService.getUsersByCustomer(subscription.getCustomer().getCustomerId());
            User customerUser = customerUsers.isEmpty() ? null : customerUsers.get(0);
            
            Map<String, Object> subMap = new HashMap<>();
            subMap.put("id", subscription.getSubscriptionId());
            subMap.put("planName", subscription.getPlanName());
            subMap.put("frequency", subscription.getFrequency());
            subMap.put("status", subscription.getStatus().name());
            subMap.put("startDate", subscription.getStartDate().toString());
            subMap.put("endDate", subscription.getEndDate() != null ? subscription.getEndDate().toString() : "N/A");
            subMap.put("customerName", subscription.getCustomer().getContactName() != null ? subscription.getCustomer().getContactName() : (customerUser != null ? customerUser.getUsername() : "N/A"));
            subMap.put("customerEmail", customerUser != null ? customerUser.getEmail() : (subscription.getCustomer().getContactEmail() != null ? subscription.getCustomer().getContactEmail() : "N/A"));
            result.add(subMap);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/customers")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        return ResponseEntity.ok(customerRepository.save(customer));
    }

    @GetMapping("/customers-with-users")
    public ResponseEntity<List<Map<String, Object>>> getCustomersWithUsers() {
        // Get all customer users from users table
        List<User> customerUsers = userService.getUsersByRole(User.Role.CUSTOMER);
        List<Map<String, Object>> result = new ArrayList<>();
        for (User user : customerUsers) {
            // Find associated customer record if exists
            Customer customer = null;
            if (user.getCustomerId() != null) {
                customer = customerRepository.findById(user.getCustomerId()).orElse(null);
            }
            
            // Find subscription for this customer
            Subscription subscription = null;
            if (customer != null) {
                List<Subscription> subs = subscriptionRepository.findByCustomerCustomerId(customer.getCustomerId());
                subscription = subs.isEmpty() ? null : subs.get(0);
            }
            
            Map<String, Object> customerMap = new HashMap<>();
            customerMap.put("id", user.getUserId());
            customerMap.put("companyName", customer != null && customer.getCompanyName() != null ? customer.getCompanyName() : "N/A");
            customerMap.put("contactName", customer != null && customer.getContactName() != null ? customer.getContactName() : (user.getFirstName() != null ? user.getFirstName() : user.getUsername()));
            customerMap.put("contactEmail", customer != null && customer.getContactEmail() != null ? customer.getContactEmail() : user.getEmail());
            customerMap.put("contactPhone", customer != null && customer.getContactPhone() != null ? customer.getContactPhone() : "N/A");
            customerMap.put("userEmail", user.getEmail());
            customerMap.put("userRole", user.getRole().name());
            customerMap.put("enabled", user.getEnabled());
            customerMap.put("createdAt", user.getCreatedAt());
            customerMap.put("subscription", subscription != null ? subscription.getPlanName() : "No Subscription");
            customerMap.put("subscriptionStatus", subscription != null ? subscription.getStatus().name() : "N/A");
            customerMap.put("firstName", user.getFirstName() != null ? user.getFirstName() : "N/A");
            result.add(customerMap);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/service-requests")
    public ResponseEntity<List<Map<String, Object>>> getServiceRequests() {
        List<ServiceRequest> requests = serviceRequestRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        for (ServiceRequest request : requests) {
            // Find the user who created this request
            User createdByUser = userRepository.findById(request.getCreatedByUser()).orElse(null);
            
            Map<String, Object> requestMap = new HashMap<>();
            requestMap.put("id", request.getRequestId());
            requestMap.put("title", request.getTitle());
            requestMap.put("description", request.getDescription() != null ? request.getDescription() : "N/A");
            requestMap.put("priority", request.getPriority().name());
            requestMap.put("status", request.getStatus().name());
            requestMap.put("customerName", request.getCustomer().getContactName() != null ? request.getCustomer().getContactName() : (createdByUser != null ? createdByUser.getUsername() : "N/A"));
            requestMap.put("customerEmail", createdByUser != null ? createdByUser.getEmail() : (request.getCustomer().getContactEmail() != null ? request.getCustomer().getContactEmail() : "N/A"));
            requestMap.put("assetType", request.getAsset() != null ? request.getAsset().getAssetType() : "N/A");
            requestMap.put("species", request.getAsset() != null ? request.getAsset().getSpecies() : "N/A");
            requestMap.put("createdAt", request.getCreatedAt());
            result.add(requestMap);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/service-bookings")
    public ResponseEntity<List<Map<String, Object>>> getServiceBookings() {
        List<ServiceBooking> bookings = serviceBookingRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();
        for (ServiceBooking booking : bookings) {
            // Get user who made the booking
            User bookingUser = booking.getUser();
            
            // Find customer record if user has customer_id
            Customer customer = null;
            if (bookingUser.getCustomerId() != null) {
                customer = customerRepository.findById(bookingUser.getCustomerId()).orElse(null);
            }
            
            Map<String, Object> bookingMap = new HashMap<>();
            bookingMap.put("id", booking.getBookingId());
            bookingMap.put("serviceType", booking.getServiceType());
            bookingMap.put("scheduledDate", booking.getScheduledDate() != null ? booking.getScheduledDate().toString() : "N/A");
            bookingMap.put("scheduledTime", booking.getScheduledTime() != null ? booking.getScheduledTime() : "N/A");
            bookingMap.put("priority", booking.getPriority().name());
            bookingMap.put("status", booking.getStatus().name());
            bookingMap.put("customerName", customer != null && customer.getContactName() != null ? customer.getContactName() : (bookingUser.getFirstName() != null ? bookingUser.getFirstName() : bookingUser.getUsername()));
            bookingMap.put("customerEmail", bookingUser.getEmail());
            bookingMap.put("userId", bookingUser.getUserId());
            bookingMap.put("assetType", booking.getAsset() != null ? booking.getAsset().getAssetType() : "N/A");
            bookingMap.put("species", booking.getAsset() != null ? booking.getAsset().getSpecies() : "N/A");
            bookingMap.put("notes", booking.getNotes() != null ? booking.getNotes() : "N/A");
            bookingMap.put("createdAt", booking.getCreatedAt());
            result.add(bookingMap);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/customer/{userId}/details")
    public ResponseEntity<Map<String, Object>> getCustomerDetails(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        
        // Find customer record
        Customer customer = null;
        if (user.getCustomerId() != null) {
            customer = customerRepository.findById(user.getCustomerId()).orElse(null);
        }
        
        // Get service bookings for this user
        List<ServiceBooking> bookings = serviceBookingRepository.findByUserUserId(userId);
        List<Map<String, Object>> bookingDetails = new ArrayList<>();
        for (ServiceBooking booking : bookings) {
            Map<String, Object> bookingMap = new HashMap<>();
            bookingMap.put("id", booking.getBookingId());
            bookingMap.put("serviceType", booking.getServiceType());
            bookingMap.put("scheduledDate", booking.getScheduledDate() != null ? booking.getScheduledDate().toString() : "N/A");
            bookingMap.put("scheduledTime", booking.getScheduledTime() != null ? booking.getScheduledTime() : "N/A");
            bookingMap.put("plantName", booking.getAsset() != null ? booking.getAsset().getSpecies() : "N/A");
            bookingMap.put("assetType", booking.getAsset() != null ? booking.getAsset().getAssetType() : "N/A");
            bookingMap.put("status", booking.getStatus().name());
            bookingMap.put("priority", booking.getPriority().name());
            bookingMap.put("notes", booking.getNotes() != null ? booking.getNotes() : "N/A");
            bookingMap.put("createdAt", booking.getCreatedAt());
            bookingDetails.add(bookingMap);
        }
        
        Map<String, Object> customerDetails = new HashMap<>();
        customerDetails.put("userId", user.getUserId());
        customerDetails.put("firstName", user.getFirstName() != null ? user.getFirstName() : "N/A");
        customerDetails.put("email", user.getEmail());
        customerDetails.put("companyName", customer != null && customer.getCompanyName() != null ? customer.getCompanyName() : "N/A");
        customerDetails.put("contactPhone", customer != null && customer.getContactPhone() != null ? customer.getContactPhone() : "N/A");
        customerDetails.put("serviceBookings", bookingDetails);
        customerDetails.put("totalBookings", bookings.size());
        
        return ResponseEntity.ok(customerDetails);
    }

    @GetMapping("/reports/kpis")
    public ResponseEntity<Map<String, Object>> getKPIs() {
        long customerUsersCount = userService.getUsersByRole(User.Role.CUSTOMER).size();
        long technicianUsersCount = userService.getUsersByRole(User.Role.TECHNICIAN).size();
        
        Map<String, Object> kpis = Map.of(
            "totalCustomers", customerUsersCount,
            "totalTechnicians", technicianUsersCount,
            "totalUsers", userRepository.count(),
            "totalAssets", assetRepository.count(),
            "totalServiceRequests", serviceRequestRepository.count(),
            "totalServiceBookings", serviceBookingRepository.count(),
            "pendingRequests", serviceRequestRepository.findByStatus(ServiceRequest.RequestStatus.OPEN).size(),
            "pendingBookings", serviceBookingRepository.findByStatus(ServiceBooking.BookingStatus.PENDING).size(),
            "activeWorkOrders", workOrderRepository.findByStatus(com.biophilic.entity.WorkOrder.WorkOrderStatus.IN_PROGRESS).size()
        );
        return ResponseEntity.ok(kpis);
    }
}