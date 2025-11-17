# Fix Old User Password Issue

## Problem
Old users can't login because their password hashes in the database are incompatible with the current BCrypt encoder, while new users work fine.

## Solution
Use the existing reset endpoint to fix old user passwords:

### Method 1: Use the Reset Endpoint (Recommended)
Make a POST request to your backend:
```
POST http://your-backend-url/api/v1/auth/reset-test-passwords
```

This will reset the passwords for:
- admin@plantondesk.com → plantondesk123
- customer1@greencorp.com → customer123  
- maintenance1@plantondesk.com → plantondesk123

### Method 2: Delete and Recreate Users
If Method 1 doesn't work, delete the old users from your database and restart your Spring Boot app to let DataInitializer recreate them:

```sql
DELETE FROM users WHERE email IN (
    'admin@plantondesk.com', 
    'customer1@greencorp.com', 
    'maintenance1@plantondesk.com'
);
```

## Test After Fix
Try logging in with these credentials:
- Admin: admin@plantondesk.com / plantondesk123
- Customer: customer1@greencorp.com / customer123
- Technician: maintenance1@plantondesk.com / plantondesk123