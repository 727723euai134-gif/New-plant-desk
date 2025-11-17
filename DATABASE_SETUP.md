# Database Setup for Production Deployment

## PostgreSQL Database Configuration

This application now uses PostgreSQL as the primary database. Here's how to set it up:

## Option 1: Railway PostgreSQL Database (Recommended)

1. **Add PostgreSQL Service to Railway:**
   - Go to your Railway project dashboard
   - Click "New Service" → "Database" → "PostgreSQL"
   - Railway will create a PostgreSQL database instance

2. **Get Database Connection Details:**
   - Click on the PostgreSQL service
   - Go to "Variables" tab
   - Copy the connection details:
     - `DATABASE_URL` (PostgreSQL connection string)
     - `PGUSER` (this is your DATABASE_USERNAME)  
     - `PGPASSWORD` (this is your DATABASE_PASSWORD)
     - `PGDATABASE` (database name)

3. **Set Environment Variables in Railway:**
   - Go to your Spring Boot service
   - Click "Variables" tab
   - Add these variables:
     ```
     DATABASE_URL=postgresql://username:password@host:port/database_name
     DATABASE_USERNAME=your_postgres_user
     DATABASE_PASSWORD=your_postgres_password
     JWT_SECRET=biophilic_secret_key_2024_secure_256bit_compliant_jwt_hmac_sha
     CORS_ORIGINS=https://your-frontend-url.com
     ```

## Option 2: Supabase (Free Tier Available)

1. **Create Supabase Account:**
   - Go to supabase.com
   - Create a free account
   - Create a new project

2. **Get Connection String:**
   - In Supabase dashboard, go to Settings → Database
   - Copy the connection string
   - Format: `postgresql://username:password@host:port/database?sslmode=require`

3. **Set Environment Variables:**
   ```
   DATABASE_URL=your_supabase_connection_string
   DATABASE_USERNAME=your_supabase_username
   DATABASE_PASSWORD=your_supabase_password
   ```

## Option 3: Render PostgreSQL

1. **Create PostgreSQL Database on Render:**
   - Go to render.com
   - Create a new PostgreSQL database
   - Get the connection details

2. **Configure Environment Variables:**
   ```
   DATABASE_URL=your_render_postgresql_url
   DATABASE_USERNAME=your_render_username
   DATABASE_PASSWORD=your_render_password
   ```

## Existing User Credentials (Preserved)

After database setup, these credentials will work:

### Admin Users:
- **Username:** admin
- **Password:** plantondesk123
- **Email:** admin@plantondesk.com

### Maintenance Staff:
- **Username:** maintenance1  
- **Password:** plantondesk123
- **Email:** maintenance1@plantondesk.com

### Customer Users:
- **Username:** customer1
- **Password:** customer123
- **Email:** customer1@greencorp.com

## New User Registration

All new user registrations will be automatically stored in the cloud database. The registration system supports:

- **Customer Registration:** No special password required
- **Admin Registration:** Requires role password: `ADMIN1234`
- **Technician Registration:** Requires role password: `WORKER1234`

## Database Initialization

The application will automatically:
1. Create all necessary tables
2. Insert default users with preserved credentials
3. Create sample data for testing

## Troubleshooting

If you still get connection errors:

1. **Check Environment Variables:**
   - Ensure all DATABASE_* variables are set correctly
   - Verify the connection string format

2. **Test Database Connection:**
   - Use a MySQL client to test the connection
   - Ensure the database exists and is accessible

3. **Check Logs:**
   - Look for specific connection error messages
   - Verify SSL/TLS requirements

4. **Firewall/Network:**
   - Ensure your deployment platform can access the database
   - Check if IP whitelisting is required

## Next Steps

1. Set up cloud database (Railway MySQL recommended)
2. Configure environment variables
3. Redeploy your application
4. Test with existing credentials
5. Verify new user registration works