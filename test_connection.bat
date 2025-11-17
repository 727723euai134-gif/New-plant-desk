@echo off
echo Testing MySQL connection...
echo.

echo Checking if MySQL service is running...
sc query MySQL91 | findstr "RUNNING"
if %ERRORLEVEL% NEQ 0 (
    echo MySQL service is not running. Please start it first.
    pause
    exit /b 1
)

echo.
echo Testing database connection (you may need to enter password):
mysql -u root -e "SELECT 'Connection successful!' as Status; SHOW DATABASES LIKE 'biophilic_db';"

pause