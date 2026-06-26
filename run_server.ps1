# run_server.ps1 - Starts Path2Profession backend with proper environment loading
# -------------------------------------------------
# Ensure the script runs from the project root
Set-Location -Path $PSScriptRoot

# -------------------------------------------------
# Helper: Stop any process that is already listening on port 5000
function Stop-ProcessOnPort {
    param([int]$Port = 5000)
    try {
        Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue |
            ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
        Write-Host "Port ${Port} cleared (if any process was using it)." -ForegroundColor Green
    } catch {
        Write-Host "Failed to stop process on port ${Port}: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Stop-ProcessOnPort -Port 5000

# -------------------------------------------------
# Start the Node server in a background job – we set the working directory explicitly
$job = Start-Job -ScriptBlock {
    param($root)
    Set-Location $root
    node server.js
} -ArgumentList $PSScriptRoot -Name 'Path2ProfessionServer'

# -------------------------------------------------
# Wait for the server to be reachable on port 5000 (max 60 seconds)
$port = 5000
$maxSeconds = 60
$elapsed = 0
while ($elapsed -lt $maxSeconds) {
    if (Test-NetConnection -ComputerName localhost -Port $port -InformationLevel Quiet) {
        Write-Host "✅ Server is listening on port $port" -ForegroundColor Green
        break
    }
    Start-Sleep -Seconds 1
    $elapsed++
}
if ($elapsed -ge $maxSeconds) {
    Write-Host "❌ Server failed to start within $maxSeconds seconds." -ForegroundColor Red
    # Show any errors captured by the background job
    if ($job.State -eq 'Running') { Stop-Job $job }
    $err = $job.ChildJobs[0].Error
    if ($err.Count -gt 0) {
        $err | ForEach-Object { Write-Host $_.Exception.Message -ForegroundColor Red }
    }
}

# -------------------------------------------------
# Keep the script alive until the Node process exits (Ctrl+C to cancel)
try {
    Wait-Job $job
} finally {
    if ($job.State -eq 'Running') { Stop-Job $job }
    Write-Host "Cleanup complete." -ForegroundColor DarkGray
}
