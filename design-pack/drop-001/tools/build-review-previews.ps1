param(
    [string]$PackRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$printRoot = Join-Path $PackRoot 'production/print'
$previewRoot = Join-Path $PackRoot 'previews'
[System.IO.Directory]::CreateDirectory($previewRoot) | Out-Null

$items = @(
    @('01-embrace-the-chaos-front-light-garment.png', 'EMBRACE / FRONT'),
    @('02-break-the-loop-front-light-garment.png', 'BREAK THE LOOP / FRONT'),
    @('03-rebuild-yourself-back-light-garment.png', 'RECONSTRUCTION / BACK'),
    @('04-face-what-you-hide-back-light-garment.png', 'CONFRONTATION / BACK'),
    @('05-nothing-is-permanent-back-light-garment.png', 'HEAVY TEE / BACK')
)

function Draw-ImageFit {
    param(
        [System.Drawing.Graphics]$Graphics,
        [System.Drawing.Image]$Image,
        [System.Drawing.RectangleF]$Bounds
    )

    $scale = [Math]::Min($Bounds.Width / $Image.Width, $Bounds.Height / $Image.Height)
    $width = $Image.Width * $scale
    $height = $Image.Height * $scale
    $x = $Bounds.X + ($Bounds.Width - $width) / 2
    $y = $Bounds.Y + ($Bounds.Height - $height) / 2
    $Graphics.DrawImage($Image, [System.Drawing.RectangleF]::new($x, $y, $width, $height))
}

$canvas = [System.Drawing.Bitmap]::new(2400, 1600, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$canvas.SetResolution(150, 150)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.Clear([System.Drawing.Color]::FromArgb(255, 239, 232, 216))

$ink = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(255, 32, 30, 28))
$line = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(255, 196, 184, 160), 2)
$font = [System.Drawing.Font]::new('Arial', 24, [System.Drawing.FontStyle]::Bold)

for ($i = 0; $i -lt $items.Count; $i++) {
    $column = if ($i -lt 3) { $i } else { $i - 3 }
    $row = if ($i -lt 3) { 0 } else { 1 }
    $x = 40 + $column * 790
    $y = 40 + $row * 780
    $panel = [System.Drawing.RectangleF]::new($x, $y, 740, 690)
    $graphics.DrawRectangle($line, $panel.X, $panel.Y, $panel.Width, $panel.Height)

    $path = Join-Path $printRoot $items[$i][0]
    $image = [System.Drawing.Image]::FromFile($path)
    Draw-ImageFit $graphics $image ([System.Drawing.RectangleF]::new($x + 25, $y + 25, 690, 590))
    $image.Dispose()
    $graphics.DrawString($items[$i][1], $font, $ink, $x + 25, $y + 635)
}

$output = Join-Path $previewRoot 'light-garment-output-review.png'
$canvas.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)

$font.Dispose()
$line.Dispose()
$ink.Dispose()
$graphics.Dispose()
$canvas.Dispose()

Write-Host "Built $output"
