# Find the PID of the process on port 5000
$port = 5000
$processId = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1

if ($processId) {
    Write-Host "Stopping process $processId on port $port..." -ForegroundColor Yellow
    Stop-Process -Id $processId -Force
    Write-Host "Port $port cleared." -ForegroundColor Green
} else {
    Write-Host "Port $port is already clear." -ForegroundColor Green
}

Write-Host "Starting Path2Profession Server..." -ForegroundColor Cyan
node server.js
