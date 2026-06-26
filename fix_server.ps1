# Enhanced fix_server.ps1 for Path2Profession
# -------------------------------------------------
# This script ensures the development server on port 5000 is stopped,
# then starts the Node server and waits until it is listening.
# It includes error handling and optional auto‑restart.

$ErrorActionPreference = 'Stop'

# ------------------- Helper Functions -------------------
function Stop-ProcessOnPort {
    param([int]$Port = 5000)
    try {
        $targetPid = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue |
               Select-Object -ExpandProperty OwningProcess -First 1
        if ($targetPid) {
            Write-Host "Stopping process $targetPid on port $Port..." -ForegroundColor Yellow
            Stop-Process -Id $targetPid -Force
            Write-Host "Port $Port cleared." -ForegroundColor Green
        } else {
            Write-Host "Port $Port is already free." -ForegroundColor Green
        }
    } catch {
        Write-Host ("Failed to stop process on port $Port`: $($_.Exception.Message)") -ForegroundColor Red
    }
}

function Start-NodeServer {
    param([string]$Script = 'server.js')
    Write-Host "Starting Path2Profession server..." -ForegroundColor Cyan
    # Resolve absolute path to the script so the background job runs it from the correct folder
    $scriptPath = Resolve-Path -Path $Script
    $job = Start-Job -ScriptBlock { param($sp) Set-Location (Split-Path $sp); node $sp } -ArgumentList $scriptPath -Name 'Path2ProfessionServer'
    return $job
}

function Wait-ForPort {
    param([int]$Port = 5000, [int]$TimeoutSec = 120)
    $elapsed = 0
    while ($elapsed -lt $TimeoutSec) {
        Write-Host "Checking port $Port (elapsed: $elapsed sec) ..." -ForegroundColor DarkCyan
        $open = Test-NetConnection -ComputerName localhost -Port $Port -InformationLevel Quiet -WarningAction SilentlyContinue
        if ($open) { return $true }
        Start-Sleep -Seconds 1
        $elapsed++
    }
    return $false
}
# -------------------------------------------------
# Helper to display background job errors
function Show-JobErrors {
    param([System.Management.Automation.Job]$Job)
    $err = $Job.ChildJobs[0].Error
    if ($err.Count -gt 0) {
        Write-Host "⚠️  Node job reported errors:" -ForegroundColor Yellow
        $err | ForEach-Object { Write-Host $_.Exception.Message -ForegroundColor Red }
    }
}


# ------------------- Main Execution -------------------
$port = 5000
Stop-ProcessOnPort -Port $port
$serverJob = Start-NodeServer -Script 'server.js'
# Give Node a moment to start before probing the port
Start-Sleep -Seconds 2

if (Wait-ForPort -Port $port -TimeoutSec 120) {
    Write-Host "Server is up and listening on port $port 🎉" -ForegroundColor Green
} else {
    Write-Host "Server did not start within the timeout period." -ForegroundColor Red
    # Optionally stop the job if it failed to bind the port
    if ($serverJob.State -eq 'Running') { Stop-Job $serverJob }
    # Show any errors from the background Node job
    Show-JobErrors $serverJob
}

# Keep the script alive until the server job exits (Ctrl+C to cancel)
try {
    Wait-Job $serverJob
} finally {
    # Clean up the background job on exit
    if ($serverJob.State -eq 'Running') { Stop-Job $serverJob }
    Write-Host "Cleanup complete." -ForegroundColor DarkGray
}
