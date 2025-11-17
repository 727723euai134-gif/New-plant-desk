-- Complete MySQL Setup and Password Fix Script
-- Run this in MySQL Workbench or command line

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS biophilic_db;
USE biophilic_db;

-- Check if users table exists, if not create it
CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    role ENUM('ADMIN', 'CUSTOMER', 'TECHNICIAN') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    customer_id BIGINT,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Delete existing test users to avoid conflicts
DELETE FROM users WHERE email IN (
    'admin@plantondesk.com', 
    'customer1@greencorp.com', 
    'maintenance1@plantondesk.com'
);

-- Insert users with properly encoded BCrypt passwords
-- These passwords are BCrypt encoded versions of the plain text passwords
INSERT INTO users (email, password_hash, first_name, last_name, phone_number, role, customer_id) VALUES
-- Admin user: password = 'plantondesk123'
('admin@plantondesk.com', '$2a$10$8K1p/a0dQ2jH.uHPiAauaOkTrq1oxX9g5GH1.boa2kuVdDMjkqfHy', 'Admin', 'User', '1234567890', 'ADMIN', NULL),

-- Customer user: password = 'customer123'  
('customer1@greencorp.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye7Iy/YjLigaRXaRS1bIDTdQH47PBDTaq', 'John', 'Customer', '9876543210', 'CUSTOMER', 1),

-- Technician user: password = 'plantondesk123'
('maintenance1@plantondesk.com', '$2a$10$8K1p/a0dQ2jH.uHPiAauaOkTrq1oxX9g5GH1.boa2kuVdDMjkqfHy', 'Tech', 'Worker', '5555555555', 'TECHNICIAN', NULL);

-- Create customers table if it doesn't exist
CREATE TABLE IF NOT EXISTS customers (
    customer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample customer data
INSERT IGNORE INTO customers (customer_id, company_name, contact_person, email, phone, address) VALUES
(1, 'Green Corp', 'John Customer', 'customer1@greencorp.com', '9876543210', '123 Green Street, Eco City');

-- Verify the setup
SELECT 'Database Setup Complete' as Status;
SELECT email, role, first_name, last_name FROM users;