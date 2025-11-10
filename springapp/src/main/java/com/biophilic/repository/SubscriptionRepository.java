package com.biophilic.repository;

import com.biophilic.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByCustomerCustomerId(Long customerId);
    List<Subscription> findByStatus(Subscription.SubscriptionStatus status);
}