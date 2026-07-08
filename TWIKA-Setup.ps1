#Requires -Version 5.1
<#
.SYNOPSIS
    TWIKA SuperApp — GitHub Pages Activator & Status Dashboard
.DESCRIPTION
    Enables GitHub Pages on the TWIKA landing page repo, polls until the
    site is live, then prints a full status dashboard for all TWIKA endpoints.
    Run this once after cloning the repo or any time you need a health check.
.NOTES
    Author  : TWIKA Engineering
    Requires: A GitHub Personal Access Token with repo + pages scope
              Set env var: $env:GITHUB_TOKEN = "ghp_xxxx"
              Or pass via -Token parameter
.EXAMPLE
    .\TWIKA-Setup.ps1
    .\TWIKA-Setup.ps1 -Token "ghp_yourtoken" -SkipPagesSetup
#>

[CmdletBinding()]
param(
    [string]$Token       = $env:GITHUB_TOKEN,
    [switch]$SkipPagesSetup,
    [switch]$StatusOnly
)

# ─────────────────────────────────────────────
#  CONFIG
# ─────────────────────────────────────────────
$REPO_OWNER   = "onlyecho822-source"
$REPO_NAME    = "twika-superapp-public"
$BRANCH       = "main"
$PAGES_URL    = "https://$REPO_OWNER.github.io/$REPO_NAME"
$APP_URL      = "https://twikasuper-sfinbkx7.manus.space"
$ECHO_URL     = "http://34.139.8.122:8822"
$CONTACT_TEL  = "(844) 553-8807 ext. 4040"
$CONTACT_EMAIL= "Alwaysthebesttransportation1@gmail.com"

# ─────────────────────────────────────────────
#  HELPERS
# ─────────────────────────────────────────────
function Write-Banner {
    $lines = @(
        "",
        "  ████████╗██╗    ██╗██╗██╗  ██╗ █████╗ ",
        "     ██╔══╝██║    ██║██║██║ ██╔╝██╔══██╗",
        "     ██║   ██║ █╗ ██║██║█████╔╝ ███████║",
        "     ██║   ██║███╗██║██║██╔═██╗ ██╔══██║",
        "     ██║   ╚███╔███╔╝██║██║  ██╗██║  ██║",
        "     ╚═╝    ╚══╝╚══╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝",
        "  SuperApp — Chicago's Reverse-Auction Platform",
        "  Two Strategy. One Platform.",
        ""
    )
    foreach ($l in $lines) { Write-Host $l -ForegroundColor Cyan }
}

function Write-Step([string]$msg) {
    Write-Host "`n  ⚡ $msg" -ForegroundColor Yellow
}

function Write-OK([string]$msg) {
    Write-Host "  ✅ $msg" -ForegroundColor Green
}

function Write-Fail([string]$msg) {
    Write-Host "  ❌ $msg" -ForegroundColor Red
}

function Write-Info([string]$msg) {
    Write-Host "  ℹ  $msg" -ForegroundColor DarkCyan
}

function Invoke-GH {
    param([string]$Method, [string]$Path, [hashtable]$Body = @{})
    $uri     = "https://api.github.com$Path"
    $headers = @{
        Authorization  = "Bearer $Token"
        Accept         = "application/vnd.github+json"
        "X-GitHub-Api-Version" = "2022-11-28"
    }
    $params = @{ Uri = $uri; Method = $Method; Headers = $headers; ErrorAction = "Stop" }
    if ($Body.Count -gt 0) {
        $params.Body        = ($Body | ConvertTo-Json -Depth 5)
        $params.ContentType = "application/json"
    }
    try {
        return Invoke-RestMethod @params
    } catch {
        return $null
    }
}

function Test-Url([string]$url) {
    try {
        $r = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 8 -UseBasicParsing -ErrorAction Stop
        return $r.StatusCode -lt 400
    } catch { return $false }
}

function Wait-ForUrl([string]$url, [int]$MaxSeconds = 180) {
    $elapsed = 0
    Write-Host "  ⏳ Waiting for $url to go live " -NoNewline -ForegroundColor DarkYellow
    while ($elapsed -lt $MaxSeconds) {
        if (Test-Url $url) { Write-Host " done!" -ForegroundColor Green; return $true }
        Write-Host "." -NoNewline -ForegroundColor DarkYellow
        Start-Sleep 8
        $elapsed += 8
    }
    Write-Host " timed out." -ForegroundColor Red
    return $false
}

# ─────────────────────────────────────────────
#  MAIN
# ─────────────────────────────────────────────
Clear-Host
Write-Banner

# ── 1. Token check ──────────────────────────
Write-Step "Checking GitHub token..."
if (-not $Token) {
    Write-Fail "No GitHub token found."
    Write-Info  "Set it with:  `$env:GITHUB_TOKEN = 'ghp_yourtoken'"
    Write-Info  "Or re-run:    .\TWIKA-Setup.ps1 -Token 'ghp_yourtoken'"
    exit 1
}
$me = Invoke-GH -Method GET -Path "/user"
if (-not $me) {
    Write-Fail "Token is invalid or has no repo scope."
    exit 1
}
Write-OK "Authenticated as: $($me.login)"

if ($StatusOnly) { goto StatusDashboard }

# ── 2. Enable GitHub Pages ───────────────────
if (-not $SkipPagesSetup) {
    Write-Step "Checking GitHub Pages status..."
    $pages = Invoke-GH -Method GET -Path "/repos/$REPO_OWNER/$REPO_NAME/pages"

    if ($pages -and $pages.status -ne $null) {
        Write-OK "GitHub Pages already enabled — status: $($pages.status)"
        $PAGES_URL = $pages.html_url.TrimEnd('/')
    } else {
        Write-Step "Enabling GitHub Pages (branch: $BRANCH, path: /)..."
        $body = @{ source = @{ branch = $BRANCH; path = "/" } }
        $result = Invoke-GH -Method POST -Path "/repos/$REPO_OWNER/$REPO_NAME/pages" -Body $body

        if ($result) {
            Write-OK "GitHub Pages creation request sent."
            Write-Info "Build triggered — polling for live URL..."
            $live = Wait-ForUrl -url $PAGES_URL -MaxSeconds 240
            if ($live) {
                Write-OK "Landing page is LIVE at: $PAGES_URL"
            } else {
                Write-Fail "Page didn't come up in 4 minutes. Check: https://github.com/$REPO_OWNER/$REPO_NAME/settings/pages"
            }
        } else {
            Write-Fail "API returned 403 — token needs 'pages' write scope."
            Write-Info  "Enable Pages manually (30 sec):"
            Write-Info  "  1. Go to: https://github.com/$REPO_OWNER/$REPO_NAME/settings/pages"
            Write-Info  "  2. Source → Deploy from a branch → main / / (root)"
            Write-Info  "  3. Click Save"
            Write-Info  ""
            Write-Info  "OR create a fine-grained token with Pages read/write at:"
            Write-Info  "  https://github.com/settings/tokens?type=beta"
        }
    }
}

# ── 3. Status Dashboard ──────────────────────
:StatusDashboard
Write-Step "Running TWIKA Status Dashboard..."
Write-Host ""
Write-Host "  ┌─────────────────────────────────────────────────────────────┐" -ForegroundColor DarkCyan
Write-Host "  │              TWIKA PLATFORM STATUS                         │" -ForegroundColor DarkCyan
Write-Host "  └─────────────────────────────────────────────────────────────┘" -ForegroundColor DarkCyan

$endpoints = @(
    @{ Name = "Main App";           URL = $APP_URL },
    @{ Name = "Post a Job";         URL = "$APP_URL/rider/post" },
    @{ Name = "Join as Worker";     URL = "$APP_URL/join" },
    @{ Name = "Provider Dashboard"; URL = "$APP_URL/provider" },
    @{ Name = "Trade Board";        URL = "$APP_URL/board" },
    @{ Name = "Providers Directory";URL = "$APP_URL/providers" },
    @{ Name = "Admin Dashboard";    URL = "$APP_URL/admin" },
    @{ Name = "Landing Page (GH)";  URL = $PAGES_URL },
    @{ Name = "Echo Sovereign API"; URL = $ECHO_URL }
)

$maxName = ($endpoints | Measure-Object -Property { $_.Name.Length } -Maximum).Maximum
foreach ($ep in $endpoints) {
    $pad    = " " * ($maxName - $ep.Name.Length + 2)
    $status = if (Test-Url $ep.URL) { "✅ LIVE  " } else { "⚠️  DOWN  " }
    $color  = if ($status -like "*LIVE*") { "Green" } else { "Red" }
    Write-Host ("  {0}{1}{2}  {3}" -f $ep.Name, $pad, $status, $ep.URL) -ForegroundColor $color
}

Write-Host ""
Write-Host "  ┌─────────────────────────────────────────────────────────────┐" -ForegroundColor DarkCyan
Write-Host "  │              CONTACT                                        │" -ForegroundColor DarkCyan
Write-Host "  └─────────────────────────────────────────────────────────────┘" -ForegroundColor DarkCyan
Write-Host "  📞  $CONTACT_TEL" -ForegroundColor White
Write-Host "  📧  $CONTACT_EMAIL" -ForegroundColor White
Write-Host "  🌐  $APP_URL" -ForegroundColor White
Write-Host ""
Write-Host "  ┌─────────────────────────────────────────────────────────────┐" -ForegroundColor DarkCyan
Write-Host "  │              GITHUB REPO                                    │" -ForegroundColor DarkCyan
Write-Host "  └─────────────────────────────────────────────────────────────┘" -ForegroundColor DarkCyan
Write-Host "  Public Landing : https://github.com/$REPO_OWNER/$REPO_NAME" -ForegroundColor White
Write-Host "  Pages Settings : https://github.com/$REPO_OWNER/$REPO_NAME/settings/pages" -ForegroundColor White
Write-Host ""
Write-Host "  Done. TWIKA is ready to run. 🚀" -ForegroundColor Cyan
Write-Host ""
