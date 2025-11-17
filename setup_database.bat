@echo off
echo Setting up MySQL database for Plant-on-Desk project...
echo.

echo Please enter your MySQL root password when prompted.
echo.

mysql -u root -p < fix_mysql_setup.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Database setup completed successfully!
    echo.
    echo You can now use these credentials to login:
    echo.
    echo 🔑 Admin Login:
    echo    Email: admin@plantondesk.com
    echo    Password: plantondesk123
    echo.
    echo 🔑 Customer Login:
    echo    Email: customer1@greencorp.com  
    echo    Password: customer123
    echo.
    echo 🔑 Technician Login:
    echo    Email: maintenance1@plantondesk.com
    echo    Password: plantondesk123
    echo.
) else (
    echo.
    echo ❌ Database setup failed. Please check your MySQL root password and try again.
    echo.
)

pause