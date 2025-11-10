package com.biophilic.repository;

import com.biophilic.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByContactEmail(String contactEmail);
    boolean existsByContactEmail(String contactEmail);
}