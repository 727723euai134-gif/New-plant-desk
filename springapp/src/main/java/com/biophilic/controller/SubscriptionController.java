package com.biophilic.controller;

import com.biophilic.entity.Subscription;
import com.biophilic.service.StripeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/customers/{customerId}/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {
    private final StripeService stripeService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('CUSTOMER')")
    public ResponseEntity<?> createSubscription(@PathVariable Long customerId, @RequestBody Map<String, String> request) {
        try {
            Subscription subscription = stripeService.createSubscription(
                customerId,
                request.get("planName"),
                request.get("frequency"),
                request.get("paymentMethodId")
            );
            return ResponseEntity.ok(subscription);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}