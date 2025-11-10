package com.biophilic.repository;

import com.biophilic.entity.ServiceBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceBookingRepository extends JpaRepository<ServiceBooking, Long> {
    List<ServiceBooking> findByUserUserId(Long userId);
    List<ServiceBooking> findByStatus(ServiceBooking.BookingStatus status);
}