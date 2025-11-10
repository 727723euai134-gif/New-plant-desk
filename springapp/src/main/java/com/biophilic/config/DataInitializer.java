package com.biophilic.config;

import com.biophilic.entity.*;
import com.biophilic.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final LocationRepository locationRepository;
    private final AssetRepository assetRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final ServiceRequestRepository serviceRequestRepository;
    private final ServiceBookingRepository serviceBookingRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Create admin user
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@plantondesk.com");
            admin.setPasswordHash(passwordEncoder.encode("plantondesk123"));
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);

            // Create sample customer
            Customer customer = new Customer();
            customer.setCompanyName("Green Corp");
            customer.setContactName("John Doe");
            customer.setContactEmail("john@greencorp.com");
            customer.setContactPhone("123-456-7890");
            customer.setBillingAddress("123 Green St, Eco City");
            Customer savedCustomer = customerRepository.save(customer);

            // Create customer user
            User customerUser = new User();
            customerUser.setUsername("customer1");
            customerUser.setEmail("customer1@greencorp.com");
            customerUser.setPasswordHash(passwordEncoder.encode("customer123"));
            customerUser.setRole(User.Role.CUSTOMER);
            customerUser.setCustomerId(savedCustomer.getCustomerId());
            userRepository.save(customerUser);

            // Create maintenance specialist
            User technician = new User();
            technician.setUsername("maintenance1");
            technician.setEmail("maintenance1@plantondesk.com");
            technician.setPasswordHash(passwordEncoder.encode("plantondesk123"));
            technician.setRole(User.Role.TECHNICIAN);
            userRepository.save(technician);

            // Create location
            Location location = new Location();
            location.setCustomer(savedCustomer);
            location.setName("Main Office");
            location.setBuilding("Building A");
            location.setFloor("Floor 1");
            Location savedLocation = locationRepository.save(location);

            // Create sample assets
            Asset asset1 = new Asset();
            asset1.setAssetTag("PLANT-001");
            asset1.setAssetType("Indoor Plant");
            asset1.setSpecies("Ficus Benjamina");
            asset1.setDescription("Office desk plant");
            asset1.setCost(new BigDecimal("25.00"));
            asset1.setAcquisitionDate(LocalDate.now().minusMonths(2));
            asset1.setLocation(savedLocation);
            asset1.setLastMaintDate(LocalDate.now().minusDays(20));
            assetRepository.save(asset1);

            // Create sample subscription
            Subscription subscription = new Subscription();
            subscription.setCustomer(savedCustomer);
            subscription.setPlanName("Plant Lover");
            subscription.setFrequency("MONTHLY");
            subscription.setStartDate(LocalDate.now().minusMonths(1));
            subscription.setStatus(Subscription.SubscriptionStatus.ACTIVE);
            subscriptionRepository.save(subscription);

            // Create sample service requests
            ServiceRequest request1 = new ServiceRequest();
            request1.setCustomer(savedCustomer);
            request1.setLocation(savedLocation);
            request1.setAsset(asset1);
            request1.setTitle("Deep Watering Service");
            request1.setDescription("Plant needs thorough watering and nutrition check");
            request1.setPriority(ServiceRequest.Priority.MEDIUM);
            request1.setStatus(ServiceRequest.RequestStatus.OPEN);
            request1.setCreatedByUser(customerUser.getUserId());
            serviceRequestRepository.save(request1);

            ServiceRequest request2 = new ServiceRequest();
            request2.setCustomer(savedCustomer);
            request2.setLocation(savedLocation);
            request2.setAsset(asset1);
            request2.setTitle("Pruning and Shaping");
            request2.setDescription("Plant requires professional pruning for optimal growth");
            request2.setPriority(ServiceRequest.Priority.HIGH);
            request2.setStatus(ServiceRequest.RequestStatus.IN_PROGRESS);
            request2.setCreatedByUser(customerUser.getUserId());
            serviceRequestRepository.save(request2);

            // Create sample service bookings
            ServiceBooking booking1 = new ServiceBooking();
            booking1.setUser(customerUser);
            booking1.setAsset(asset1);
            booking1.setServiceType("Deep Watering & Nutrition");
            booking1.setScheduledDate(LocalDate.now().plusDays(3));
            booking1.setScheduledTime("10:00 AM");
            booking1.setNotes("Customer requested morning appointment");
            booking1.setPriority(ServiceBooking.Priority.NORMAL);
            booking1.setStatus(ServiceBooking.BookingStatus.CONFIRMED);
            serviceBookingRepository.save(booking1);

            ServiceBooking booking2 = new ServiceBooking();
            booking2.setUser(customerUser);
            booking2.setAsset(asset1);
            booking2.setServiceType("Precision Pruning & Shaping");
            booking2.setScheduledDate(LocalDate.now().plusDays(7));
            booking2.setScheduledTime("2:00 PM");
            booking2.setNotes("Plant needs professional pruning");
            booking2.setPriority(ServiceBooking.Priority.HIGH);
            booking2.setStatus(ServiceBooking.BookingStatus.PENDING);
            serviceBookingRepository.save(booking2);

            System.out.println("Sample data initialized successfully!");
            System.out.println("Admin: admin/plantondesk123");
            System.out.println("Customer: customer1@greencorp.com/customer123");
            System.out.println("Maintenance Specialist: maintenance1/plantondesk123");
        }
    }
}