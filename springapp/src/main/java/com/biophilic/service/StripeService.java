package com.biophilic.service;

import com.biophilic.entity.Customer;
import com.biophilic.entity.Subscription;
import com.biophilic.repository.CustomerRepository;
import com.biophilic.repository.SubscriptionRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StripeService {
    private final CustomerRepository customerRepository;
    private final SubscriptionRepository subscriptionRepository;

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    public Subscription createSubscription(Long customerId, String planName, String frequency, String paymentMethodId) throws StripeException {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Create Stripe customer if not exists
        com.stripe.model.Customer stripeCustomer;
        if (customer.getContactEmail() != null) {
            Map<String, Object> customerParams = new HashMap<>();
            customerParams.put("email", customer.getContactEmail());
            customerParams.put("name", customer.getCompanyName());
            stripeCustomer = com.stripe.model.Customer.create(customerParams);
        } else {
            throw new RuntimeException("Customer email required for subscription");
        }

        // Create subscription
        Subscription subscription = new Subscription();
        subscription.setCustomer(customer);
        subscription.setPlanName(planName);
        subscription.setFrequency(frequency);
        subscription.setStartDate(LocalDate.now());
        subscription.setStripeCustomerId(stripeCustomer.getId());
        subscription.setStatus(Subscription.SubscriptionStatus.ACTIVE);

        return subscriptionRepository.save(subscription);
    }

    public void handleWebhookEvent(String payload, String sigHeader) {
        // Webhook handling implementation
        // Update subscription status based on Stripe events
    }
}