package com.biophilic.controller;

import com.biophilic.entity.Asset;
import com.biophilic.entity.ServiceRequest;
import com.biophilic.entity.ServiceBooking;
import com.biophilic.entity.Subscription;
import com.biophilic.entity.Customer;
import com.biophilic.entity.User;
import com.biophilic.repository.AssetRepository;
import com.biophilic.repository.ServiceRequestRepository;
import com.biophilic.repository.ServiceBookingRepository;
import com.biophilic.repository.SubscriptionRepository;
import com.biophilic.repository.CustomerRepository;
import com.biophilic.repository.UserRepository;
import com.biophilic.service.ServiceRequestService;
import com.biophilic.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final AssetRepository assetRepository;
    private final ServiceRequestService serviceRequestService;
    private final ServiceRequestRepository serviceRequestRepository;
    private final ServiceBookingRepository serviceBookingRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @GetMapping("/assets")
    public ResponseEntity<List<Asset>> getCustomerAssets(Authentication auth) {
        // For now, return all assets - in real implementation, filter by customer
        return ResponseEntity.ok(assetRepository.findAll());
    }

    @PostMapping("/service-requests")
    public ResponseEntity<?> createServiceBooking(@RequestBody Map<String, Object> request, Authentication auth) {
        System.out.println("Received service booking request: " + request);
        try {
            // Get user email from JWT token
            String userEmail = auth.getName();
            System.out.println("Authenticated user email: " + userEmail);
            
            // Find user by email
            User user = userRepository.findByEmail(userEmail).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "User not found for email: " + userEmail));
            }
            
            Long assetId = request.get("plant") != null ? Long.valueOf(request.get("plant").toString()) : null;
            String serviceType = request.get("serviceType").toString();
            String scheduledDate = request.get("date") != null ? request.get("date").toString() : null;
            String scheduledTime = request.get("time") != null ? request.get("time").toString() : null;
            String priority = request.get("priority") != null ? request.get("priority").toString() : "NORMAL";
            String notes = request.get("notes") != null ? request.get("notes").toString() : "";
            
            Asset asset = assetId != null ? assetRepository.findById(assetId).orElse(null) : null;
            
            // Create service booking
            ServiceBooking booking = new ServiceBooking();
            booking.setUser(user);
            booking.setAsset(asset);
            booking.setServiceType(serviceType);
            booking.setScheduledDate(scheduledDate != null ? java.time.LocalDate.parse(scheduledDate) : null);
            booking.setScheduledTime(scheduledTime);
            booking.setNotes(notes);
            booking.setPriority(ServiceBooking.Priority.valueOf(priority.toUpperCase()));
            booking.setStatus(ServiceBooking.BookingStatus.PENDING);
            
            ServiceBooking savedBooking = serviceBookingRepository.save(booking);
            System.out.println("Service booking created for user ID: " + user.getUserId());
            
            // Send confirmation email
            String customerName = user.getFirstName() != null ? user.getFirstName() : user.getEmail().split("@")[0];
            String plantName = asset != null ? asset.getSpecies() : "Selected Plant";
            emailService.sendServiceBookingConfirmation(
                user.getEmail(), 
                customerName, 
                serviceType, 
                plantName, 
                scheduledDate, 
                scheduledTime
            );
            
            return ResponseEntity.ok(Map.of("success", true, "bookingId", savedBooking.getBookingId(), "message", "Service booked successfully! Confirmation email sent.", "userId", user.getUserId()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/service-requests")
    public ResponseEntity<List<ServiceRequest>> getMyServiceRequests(Authentication auth) {
        // For demo, return all requests - in real implementation, filter by customer
        return ResponseEntity.ok(serviceRequestRepository.findAll());
    }

    @GetMapping("/service-bookings")
    public ResponseEntity<List<ServiceBooking>> getMyServiceBookings(Authentication auth) {
        try {
            // Get user email from JWT token
            String userEmail = auth.getName();
            
            // Find user by email
            User user = userRepository.findByEmail(userEmail).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(null);
            }
            
            return ResponseEntity.ok(serviceBookingRepository.findByUserUserId(user.getUserId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> testEndpoint() {
        System.out.println("Test endpoint called!");
        return ResponseEntity.ok(Map.of("message", "Backend is working!", "timestamp", System.currentTimeMillis()));
    }

    @PostMapping("/send-test-email")
    public ResponseEntity<?> sendTestEmail(Authentication auth) {
        try {
            String userEmail = auth.getName();
            User user = userRepository.findByEmail(userEmail).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
            }
            
            String customerName = user.getFirstName() != null ? user.getFirstName() : user.getEmail().split("@")[0];
            emailService.sendServiceBookingConfirmation(
                user.getEmail(),
                customerName,
                "Test Service",
                "Test Plant",
                "2024-12-01",
                "Morning (9-12 PM)"
            );
            
            return ResponseEntity.ok(Map.of("success", true, "message", "Test email sent successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/subscriptions")
    public ResponseEntity<List<Subscription>> getMySubscriptions(Authentication auth) {
        // For demo, return all subscriptions - in real implementation, filter by customer
        return ResponseEntity.ok(subscriptionRepository.findAll());
    }

    @PutMapping("/subscription")
    public ResponseEntity<?> updateSubscription(@RequestBody Map<String, Object> request, Authentication auth) {
        System.out.println("Received subscription update request: " + request);
        try {
            String planName = request.get("planName").toString();
            
            // Get user email from JWT token
            String userEmail = auth.getName();
            System.out.println("Authenticated user email: " + userEmail);
            
            // Find user by email
            User user = userRepository.findByEmail(userEmail).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "User not found for email: " + userEmail));
            }
            
            Long customerId = user.getCustomerId();
            if (customerId == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "User is not associated with a customer"));
            }
            
            // Find customer
            Customer customer = customerRepository.findById(customerId).orElse(null);
            if (customer == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Customer not found"));
            }
            
            // Find existing subscription for customer
            List<Subscription> subscriptions = subscriptionRepository.findAll();
            Subscription subscription = subscriptions.stream()
                .filter(s -> s.getCustomer().getCustomerId().equals(customerId))
                .findFirst()
                .orElse(null);
            
            if (subscription != null) {
                subscription.setPlanName(planName);
                subscriptionRepository.save(subscription);
                return ResponseEntity.ok(Map.of("success", true, "message", "Subscription updated successfully", "planName", planName));
            } else {
                // Create new subscription if none exists
                Subscription newSubscription = new Subscription();
                newSubscription.setCustomer(customer);
                newSubscription.setPlanName(planName);
                newSubscription.setFrequency("MONTHLY");
                newSubscription.setStartDate(java.time.LocalDate.now());
                newSubscription.setStatus(Subscription.SubscriptionStatus.ACTIVE);
                subscriptionRepository.save(newSubscription);
                return ResponseEntity.ok(Map.of("success", true, "message", "Subscription created successfully", "planName", planName));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}