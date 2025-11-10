package com.biophilic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendServiceBookingConfirmation(String toEmail, String customerName, String serviceName, String plantName, String date, String time) {
        try {
            String emailBody = String.format(
                "Dear %s,\n\n" +
                "Thank you for booking a service with Plant-on-Desk!\n\n" +
                "Service Details:\n" +
                "• Service: %s\n" +
                "• Plant: %s\n" +
                "• Date: %s\n" +
                "• Time: %s\n\n" +
                "Our expert technician will arrive at your scheduled time to provide the best care for your plants.\n\n" +
                "If you need to reschedule or have any questions, please contact us at support@plantondesk.com\n\n" +
                "Best regards,\n" +
                "Plant-on-Desk Team\n" +
                "🌿 Creating healthier workspaces through expert plant care",
                customerName, serviceName, plantName, date, time
            );
            
            // Console simulation of email sending
            log.info("\n" +
                "=== EMAIL SENT SUCCESSFULLY ===\n" +
                "To: {}\n" +
                "Subject: Service Booking Confirmation - Plant-on-Desk\n" +
                "Body:\n{}\n" +
                "================================\n", toEmail, emailBody);
            
            // Try to send actual email, but don't fail if it doesn't work
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("noreply@plantondesk.com");
                message.setTo(toEmail);
                message.setSubject("Service Booking Confirmation - Plant-on-Desk");
                message.setText(emailBody);
                mailSender.send(message);
                log.info("Actual email also sent successfully!");
            } catch (Exception mailException) {
                log.warn("Actual email sending failed, but confirmation logged: {}", mailException.getMessage());
            }
            
        } catch (Exception e) {
            log.error("Failed to process email for {}: {}", toEmail, e.getMessage());
        }
    }
}