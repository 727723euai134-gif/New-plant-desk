-- Fix old user passwords by re-encoding them
-- Run this SQL script in your MySQL Workbench

-- You'll need to get the properly encoded passwords from your Spring app
-- Option 1: Update with new encoded passwords (you'll need to generate these)

-- For admin user
UPDATE users SET password_hash = '$2a$10$...' WHERE email = 'admin@plantondesk.com';

-- For customer user  
UPDATE users SET password_hash = '$2a$10$...' WHERE email = 'customer1@greencorp.com';

-- For technician user
UPDATE users SET password_hash = '$2a$10$...' WHERE email = 'maintenance1@plantondesk.com';

-- Option 2: Delete old users and let DataInitializer recreate them
-- DELETE FROM users WHERE email IN ('admin@plantondesk.com', 'customer1@greencorp.com', 'maintenance1@plantondesk.com');