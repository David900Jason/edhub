# PowerShell script to test the Doroosy API
# Run this after starting the API server

Write-Host "🚀 Testing Doroosy Multi-Tenant Educational Platform API" -ForegroundColor Green
Write-Host ""

$baseUrl = "http://teacher1.localhost:8080"
$headers = @{"Content-Type" = "application/json"}

# Test 1: Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/health" -Method GET
    Write-Host "✅ Health Check: $($response.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health Check Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Register Teacher
Write-Host "`n2. Registering Teacher..." -ForegroundColor Yellow
$teacherData = @{
    email = "teacher@example.com"
    password = "password123"
    display_name = "John Teacher"
    role = "teacher"
} | ConvertTo-Json

try {
    $teacherResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method POST -Body $teacherData -Headers $headers
    $teacherToken = $teacherResponse.token
    Write-Host "✅ Teacher registered successfully" -ForegroundColor Green
    Write-Host "   Token: $($teacherToken.Substring(0,20))..." -ForegroundColor Gray
} catch {
    if ($_.Exception.Response.StatusCode -eq 409) {
        Write-Host "⚠️  Teacher already exists, trying login..." -ForegroundColor Yellow
        
        $loginData = @{
            email = "teacher@example.com"
            password = "password123"
        } | ConvertTo-Json
        
        try {
            $teacherResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method POST -Body $loginData -Headers $headers
            $teacherToken = $teacherResponse.token
            Write-Host "✅ Teacher logged in successfully" -ForegroundColor Green
        } catch {
            Write-Host "❌ Teacher login failed: $($_.Exception.Message)" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "❌ Teacher registration failed: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Test 3: Create Course
Write-Host "`n3. Creating Course..." -ForegroundColor Yellow
$courseData = @{
    title = "Introduction to Programming"
    short_slug = "intro-programming"
    description = "Learn the basics of programming with hands-on examples"
    price_cents = 5000
    access_days = 90
    published = $true
} | ConvertTo-Json

$authHeaders = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $teacherToken"
}

try {
    $courseResponse = Invoke-RestMethod -Uri "$baseUrl/api/courses" -Method POST -Body $courseData -Headers $authHeaders
    $courseId = $courseResponse.course.id
    Write-Host "✅ Course created successfully" -ForegroundColor Green
    Write-Host "   Course ID: $courseId" -ForegroundColor Gray
    Write-Host "   Title: $($courseResponse.course.title)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Course creation failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Register Student
Write-Host "`n4. Registering Student..." -ForegroundColor Yellow
$studentData = @{
    email = "student@example.com"
    password = "password123"
    display_name = "Jane Student"
    role = "student"
} | ConvertTo-Json

try {
    $studentResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method POST -Body $studentData -Headers $headers
    $studentToken = $studentResponse.token
    Write-Host "✅ Student registered successfully" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 409) {
        Write-Host "⚠️  Student already exists, trying login..." -ForegroundColor Yellow
        
        $loginData = @{
            email = "student@example.com"
            password = "password123"
        } | ConvertTo-Json
        
        try {
            $studentResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method POST -Body $loginData -Headers $headers
            $studentToken = $studentResponse.token
            Write-Host "✅ Student logged in successfully" -ForegroundColor Green
        } catch {
            Write-Host "❌ Student login failed: $($_.Exception.Message)" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "❌ Student registration failed: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Test 5: Check Student Wallet
Write-Host "`n5. Checking Student Wallet..." -ForegroundColor Yellow
$studentAuthHeaders = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer $studentToken"
}

try {
    $walletResponse = Invoke-RestMethod -Uri "$baseUrl/api/wallet" -Method GET -Headers $studentAuthHeaders
    $currentBalance = $walletResponse.wallet.balance_cents
    Write-Host "✅ Wallet balance: $currentBalance cents" -ForegroundColor Green
} catch {
    Write-Host "❌ Wallet check failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 6: Top Up Wallet
Write-Host "`n6. Topping Up Wallet..." -ForegroundColor Yellow
$topupData = @{
    amount_cents = 10000
    reference = "test-topup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
} | ConvertTo-Json

try {
    $topupResponse = Invoke-RestMethod -Uri "$baseUrl/api/wallet/topup" -Method POST -Body $topupData -Headers $studentAuthHeaders
    Write-Host "✅ Wallet topped up successfully" -ForegroundColor Green
    Write-Host "   New balance: $($topupResponse.new_balance) cents" -ForegroundColor Gray
} catch {
    Write-Host "❌ Wallet topup failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 7: Purchase Course
if ($courseId) {
    Write-Host "`n7. Purchasing Course..." -ForegroundColor Yellow
    $purchaseData = @{
        course_id = $courseId
    } | ConvertTo-Json

    try {
        $purchaseResponse = Invoke-RestMethod -Uri "$baseUrl/api/wallet/purchase" -Method POST -Body $purchaseData -Headers $studentAuthHeaders
        Write-Host "✅ Course purchased successfully" -ForegroundColor Green
        Write-Host "   Enrollment ID: $($purchaseResponse.enrollment.id)" -ForegroundColor Gray
        Write-Host "   Expires: $($purchaseResponse.enrollment.expires_at)" -ForegroundColor Gray
    } catch {
        Write-Host "❌ Course purchase failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test 8: List Courses
Write-Host "`n8. Listing Courses..." -ForegroundColor Yellow
try {
    $coursesResponse = Invoke-RestMethod -Uri "$baseUrl/api/courses" -Method GET -Headers $studentAuthHeaders
    Write-Host "✅ Found $($coursesResponse.total) courses" -ForegroundColor Green
    foreach ($course in $coursesResponse.courses) {
        Write-Host "   - $($course.course.title) (ID: $($course.course.id))" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Course listing failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 API Testing Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "- Access the API at: $baseUrl" -ForegroundColor White
Write-Host "- Teacher Token: $($teacherToken.Substring(0,20))..." -ForegroundColor White
Write-Host "- Student Token: $($studentToken.Substring(0,20))..." -ForegroundColor White
Write-Host "- Check the database for created records" -ForegroundColor White
Write-Host "- Try the exam and tracking endpoints" -ForegroundColor White
