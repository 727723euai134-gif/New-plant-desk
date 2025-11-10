# Test Credentials for Plant-on-Desk Application

## Admin Login
- **Email**: admin@plantondesk.com
- **Password**: plantondesk123
- **Expected Dashboard**: Admin Dashboard

## Customer Login
- **Email**: customer1@greencorp.com
- **Password**: customer123
- **Expected Dashboard**: Customer Dashboard

## Technician Login
- **Email**: maintenance1@plantondesk.com
- **Password**: plantondesk123
- **Expected Dashboard**: Worker Dashboard

## Testing Steps
1. Start the Spring Boot backend (port 8081)
2. Start the React frontend (port 3000)
3. Navigate to http://localhost:3000/login
4. Use the admin credentials above
5. Verify you are redirected to the admin dashboard

## Troubleshooting
- Check browser console for any errors
- Verify backend is running on port 8081
- Check database connection in application.properties
- Use the test endpoint: http://localhost:8081/api/v1/auth/test-users to verify users exist

## Fixed Issues
- ✅ Frontend now sends 'email' field instead of 'username' to backend
- ✅ Removed fallback mock response that always returned 'CUSTOMER' role
- ✅ Added proper error handling in login flow
- ✅ Added debugging logs to track role assignment