-- Update service_bookings table to use user_id instead of customer_id

-- Step 1: Add the new user_id column
ALTER TABLE service_bookings ADD COLUMN user_id BIGINT;

-- Step 2: Add foreign key constraint to users table
ALTER TABLE service_bookings ADD CONSTRAINT fk_service_bookings_user 
FOREIGN KEY (user_id) REFERENCES users(user_id);

-- Step 3: Update existing records (if any) - this maps customer records to their users
UPDATE service_bookings sb 
SET user_id = (
    SELECT u.user_id 
    FROM users u 
    WHERE u.customer_id = sb.customer_id 
    LIMIT 1
) 
WHERE sb.customer_id IS NOT NULL;

-- Step 4: Drop the old foreign key constraint
ALTER TABLE service_bookings DROP FOREIGN KEY fk_service_bookings_customer;

-- Step 5: Drop the old customer_id column
ALTER TABLE service_bookings DROP COLUMN customer_id;

-- Step 6: Make user_id NOT NULL
ALTER TABLE service_bookings MODIFY COLUMN user_id BIGINT NOT NULL;