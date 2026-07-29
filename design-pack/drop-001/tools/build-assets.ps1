param(
    [string]$PackRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

if (-not ('RCreation.Imaging' -as [type])) {
    Add-Type -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

namespace RCreation {
    public static class Imaging {
        public static void KeyAndCrop(string inputPath, string outputPath, int padding) {
            using (Bitmap source = new Bitmap(inputPath)) {
                using (Bitmap output = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb)) {
                    output.SetResolution(300f, 300f);
                    bool hasForeground = false;

                    for (int y = 0; y < source.Height; y++) {
                        for (int x = 0; x < source.Width; x++) {
                            Color color = source.GetPixel(x, y);
                            int maxRB = Math.Max(color.R, color.B);
                            int greenLead = color.G - maxRB;

                            if (color.G > 135 && greenLead > 38 && color.G > maxRB * 1.22) {
                                output.SetPixel(x, y, Color.Transparent);
                            } else if (color.G > 105 && greenLead > 18 && color.G > maxRB * 1.10) {
                                double removal = Math.Min(1.0, (greenLead - 18) / 42.0);
                                int alpha = (int)Math.Round(color.A * (1.0 - removal));
                                output.SetPixel(x, y, Color.FromArgb(alpha, color.R, Math.Min(color.G, maxRB + 8), color.B));
                                if (alpha > 12) hasForeground = true;
                            } else {
                                output.SetPixel(x, y, color);
                                if (color.A > 12) hasForeground = true;
                            }
                        }
                    }

                    if (!hasForeground) throw new InvalidOperationException("No foreground remained after chroma-key removal.");
                    output.Save(outputPath, ImageFormat.Png);
                }
            }
        }

        public static Bitmap CreateInk(Bitmap source, bool forDarkGarment) {
            Bitmap output = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb);
            output.SetResolution(300f, 300f);

            for (int y = 0; y < source.Height; y++) {
                for (int x = 0; x < source.Width; x++) {
                    Color color = source.GetPixel(x, y);
                    if (color.A == 0) {
                        output.SetPixel(x, y, Color.Transparent);
                        continue;
                    }

                    double luminance = 0.0722 * color.B + 0.7152 * color.G + 0.2126 * color.R;
                    if (forDarkGarment) {
                        int baseValue = (int)Math.Round(42 + luminance * 0.80);
                        output.SetPixel(x, y, Color.FromArgb(color.A, Clamp(baseValue + 8), Clamp(baseValue + 3), Clamp(baseValue - 6)));
                    } else {
                        int baseValue = (int)Math.Round(16 + luminance * 0.25);
                        output.SetPixel(x, y, Color.FromArgb(color.A, Clamp(baseValue + 10), Clamp(baseValue + 6), Clamp(baseValue)));
                    }
                }
            }
            return output;
        }

        public static long CountGreenPixels(string inputPath) {
            using (Bitmap image = new Bitmap(inputPath)) {
                long count = 0;
                for (int y = 0; y < image.Height; y += Math.Max(1, image.Height / 300)) {
                    for (int x = 0; x < image.Width; x += Math.Max(1, image.Width / 300)) {
                        Color c = image.GetPixel(x, y);
                        int maxRB = Math.Max(c.R, c.B);
                        if (c.A > 8 && c.G > 100 && c.G - maxRB > 25) count++;
                    }
                }
                return count;
            }
        }

        private static byte Clamp(int value) {
            return (byte)Math.Max(0, Math.Min(255, value));
        }
    }
}
'@ -ReferencedAssemblies System.Drawing
}

$paths = @{
    Source = Join-Path $PackRoot 'sources\generated'
    Print = Join-Path $PackRoot 'production\print'
    Embroidery = Join-Path $PackRoot 'production\embroidery'
    Pattern = Join-Path $PackRoot 'production\patterns'
    Sticker = Join-Path $PackRoot 'production\stickers'
    Marks = Join-Path $PackRoot 'production\brand-marks'
    Preview = Join-Path $PackRoot 'previews'
    Qa = Join-Path $PackRoot 'qa'
}

$paths.Values | ForEach-Object { New-Item -ItemType Directory -Force -Path $_ | Out-Null }

$greenReconstruction = Join-Path $paths.Source 'reconstruction-green.png'
$greenConfrontation = Join-Path $paths.Source 'confrontation-green.png'
$isolatedReconstruction = Join-Path $paths.Source 'reconstruction-isolated.png'
$isolatedConfrontation = Join-Path $paths.Source 'confrontation-isolated.png'

[RCreation.Imaging]::KeyAndCrop($greenReconstruction, $isolatedReconstruction, 42)
[RCreation.Imaging]::KeyAndCrop($greenConfrontation, $isolatedConfrontation, 42)

function New-Canvas {
    param([int]$Width, [int]$Height, [float]$Dpi = 300)

    $bitmap = [System.Drawing.Bitmap]::new($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $bitmap.SetResolution($Dpi, $Dpi)
    return $bitmap
}

function Set-Quality {
    param([System.Drawing.Graphics]$Graphics)

    $Graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $Graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $Graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $Graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $Graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
}

function Save-Png {
    param([System.Drawing.Bitmap]$Bitmap, [string]$Path)

    $Bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
}

function New-Font {
    param(
        [string]$Family,
        [float]$Size,
        [System.Drawing.FontStyle]$Style = [System.Drawing.FontStyle]::Regular
    )

    return [System.Drawing.Font]::new($Family, $Size, $Style, [System.Drawing.GraphicsUnit]::Pixel)
}

function Measure-TrackedText {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$Text,
        [System.Drawing.Font]$Font,
        [float]$Tracking
    )

    $width = 0.0
    foreach ($character in $Text.ToCharArray()) {
        if ($character -eq ' ') {
            $width += $Font.Size * 0.34
        } else {
            $width += $Graphics.MeasureString([string]$character, $Font, [System.Drawing.PointF]::Empty, [System.Drawing.StringFormat]::GenericTypographic).Width
        }
    }
    if ($Text.Length -gt 1) { $width += $Tracking * ($Text.Length - 1) }
    return $width
}

function Draw-TrackedText {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$Text,
        [string]$Family,
        [float]$Size,
        [System.Drawing.FontStyle]$Style,
        [System.Drawing.Color]$Color,
        [float]$CenterX,
        [float]$Y,
        [float]$MaxWidth,
        [float]$Tracking
    )

    $font = New-Font -Family $Family -Size $Size -Style $Style
    $width = Measure-TrackedText -Graphics $Graphics -Text $Text -Font $font -Tracking $Tracking
    while ($width -gt $MaxWidth -and $font.Size -gt 24) {
        $font.Dispose()
        $Size *= 0.94
        $Tracking *= 0.96
        $font = New-Font -Family $Family -Size $Size -Style $Style
        $width = Measure-TrackedText -Graphics $Graphics -Text $Text -Font $font -Tracking $Tracking
    }

    $brush = [System.Drawing.SolidBrush]::new($Color)
    $x = $CenterX - $width / 2
    foreach ($character in $Text.ToCharArray()) {
        $glyph = [string]$character
        if ($character -eq ' ') {
            $x += $font.Size * 0.34 + $Tracking
        } else {
            $Graphics.DrawString($glyph, $font, $brush, [System.Drawing.PointF]::new($x, $Y), [System.Drawing.StringFormat]::GenericTypographic)
            $x += $Graphics.MeasureString($glyph, $font, [System.Drawing.PointF]::Empty, [System.Drawing.StringFormat]::GenericTypographic).Width + $Tracking
        }
    }
    $brush.Dispose()
    $font.Dispose()
}

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

function Draw-ArchitectureStar {
    param(
        [System.Drawing.Graphics]$Graphics,
        [float]$CenterX,
        [float]$CenterY,
        [float]$Radius,
        [System.Drawing.Color]$Color,
        [float]$Stroke
    )

    $pen = [System.Drawing.Pen]::new($Color, $Stroke)
    $pen.StartCap = $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    $Graphics.DrawLine($pen, $CenterX - $Radius, $CenterY, $CenterX + $Radius, $CenterY)
    $Graphics.DrawLine($pen, $CenterX, $CenterY - $Radius, $CenterX, $CenterY + $Radius)

    $outer = [System.Drawing.PointF[]]@(
        [System.Drawing.PointF]::new($CenterX, $CenterY - $Radius * 0.48),
        [System.Drawing.PointF]::new($CenterX + $Radius * 0.20, $CenterY - $Radius * 0.18),
        [System.Drawing.PointF]::new($CenterX + $Radius * 0.48, $CenterY),
        [System.Drawing.PointF]::new($CenterX + $Radius * 0.20, $CenterY + $Radius * 0.18),
        [System.Drawing.PointF]::new($CenterX, $CenterY + $Radius * 0.48),
        [System.Drawing.PointF]::new($CenterX - $Radius * 0.20, $CenterY + $Radius * 0.18),
        [System.Drawing.PointF]::new($CenterX - $Radius * 0.48, $CenterY),
        [System.Drawing.PointF]::new($CenterX - $Radius * 0.20, $CenterY - $Radius * 0.18)
    )
    $Graphics.DrawPolygon($pen, $outer)

    $inner = [System.Drawing.PointF[]]@(
        [System.Drawing.PointF]::new($CenterX, $CenterY - $Radius * 0.20),
        [System.Drawing.PointF]::new($CenterX + $Radius * 0.20, $CenterY),
        [System.Drawing.PointF]::new($CenterX, $CenterY + $Radius * 0.20),
        [System.Drawing.PointF]::new($CenterX - $Radius * 0.20, $CenterY)
    )
    $Graphics.DrawPolygon($pen, $inner)

    $pen.Dispose()
}

function Draw-Ouroboros {
    param(
        [System.Drawing.Graphics]$Graphics,
        [float]$CenterX,
        [float]$CenterY,
        [float]$Radius,
        [System.Drawing.Color]$Color,
        [float]$Stroke
    )

    $pen = [System.Drawing.Pen]::new($Color, $Stroke)
    $pen.StartCap = $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $Graphics.DrawArc($pen, $CenterX - $Radius, $CenterY - $Radius, $Radius * 2, $Radius * 2, 26, 315)

    $angle = 341 * [Math]::PI / 180
    $headX = $CenterX + [Math]::Cos($angle) * $Radius
    $headY = $CenterY + [Math]::Sin($angle) * $Radius
    $head = [System.Drawing.PointF[]]@(
        [System.Drawing.PointF]::new($headX + $Stroke * 1.05, $headY - $Stroke * 0.35),
        [System.Drawing.PointF]::new($headX - $Stroke * 0.55, $headY - $Stroke * 0.85),
        [System.Drawing.PointF]::new($headX - $Stroke * 0.55, $headY + $Stroke * 0.75)
    )
    $brush = [System.Drawing.SolidBrush]::new($Color)
    $Graphics.FillPolygon($brush, $head)

    for ($i = 0; $i -lt 16; $i++) {
        $a = (48 + $i * 17) * [Math]::PI / 180
        $x1 = $CenterX + [Math]::Cos($a) * ($Radius - $Stroke * 0.42)
        $y1 = $CenterY + [Math]::Sin($a) * ($Radius - $Stroke * 0.42)
        $x2 = $CenterX + [Math]::Cos($a) * ($Radius + $Stroke * 0.42)
        $y2 = $CenterY + [Math]::Sin($a) * ($Radius + $Stroke * 0.42)
        $Graphics.DrawLine($pen, [float]$x1, [float]$y1, [float]$x2, [float]$y2)
    }

    $brush.Dispose()
    $pen.Dispose()
}

function Draw-MirroredProfiles {
    param(
        [System.Drawing.Graphics]$Graphics,
        [float]$CenterX,
        [float]$CenterY,
        [float]$Scale,
        [System.Drawing.Color]$Color,
        [float]$Stroke
    )

    $pen = [System.Drawing.Pen]::new($Color, $Stroke)
    $pen.StartCap = $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $Graphics.DrawArc($pen, $CenterX - $Scale, $CenterY - $Scale * 0.88, $Scale * 0.92, $Scale * 1.65, 76, 218)
    $Graphics.DrawArc($pen, $CenterX + $Scale * 0.08, $CenterY - $Scale * 0.88, $Scale * 0.92, $Scale * 1.65, 246, 218)
    $Graphics.DrawLine($pen, $CenterX - $Scale * 0.10, $CenterY - $Scale * 0.33, $CenterX - $Scale * 0.30, $CenterY - $Scale * 0.02)
    $Graphics.DrawLine($pen, $CenterX + $Scale * 0.10, $CenterY - $Scale * 0.33, $CenterX + $Scale * 0.30, $CenterY - $Scale * 0.02)
    $Graphics.DrawLine($pen, $CenterX - $Scale * 0.30, $CenterY - $Scale * 0.02, $CenterX - $Scale * 0.08, $CenterY + $Scale * 0.04)
    $Graphics.DrawLine($pen, $CenterX + $Scale * 0.30, $CenterY - $Scale * 0.02, $CenterX + $Scale * 0.08, $CenterY + $Scale * 0.04)
    $Graphics.DrawLine($pen, $CenterX - $Scale * 0.02, $CenterY - $Scale * 0.92, $CenterX + $Scale * 0.02, $CenterY + $Scale * 0.76)
    $pen.Dispose()
}

function Draw-CageKey {
    param(
        [System.Drawing.Graphics]$Graphics,
        [float]$CenterX,
        [float]$CenterY,
        [float]$Scale,
        [System.Drawing.Color]$Color,
        [float]$Stroke
    )

    $pen = [System.Drawing.Pen]::new($Color, $Stroke)
    $pen.StartCap = $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $left = $CenterX - $Scale * 0.62
    $top = $CenterY - $Scale * 0.72
    $width = $Scale * 0.90
    $height = $Scale * 1.35
    $Graphics.DrawArc($pen, $left, $top, $width, $Scale * 0.62, 180, 180)
    $Graphics.DrawLine($pen, $left, $top + $Scale * 0.31, $left, $top + $height)
    $Graphics.DrawLine($pen, $left + $width, $top + $Scale * 0.31, $left + $width, $top + $height)
    $Graphics.DrawLine($pen, $left, $top + $height, $left + $width, $top + $height)
    for ($i = 1; $i -le 3; $i++) {
        $x = $left + $width * $i / 4
        $Graphics.DrawLine($pen, $x, $top + $Scale * 0.12, $x, $top + $height)
    }

    $keyX = $CenterX + $Scale * 0.45
    $keyY = $CenterY + $Scale * 0.18
    $Graphics.DrawEllipse($pen, $keyX, $keyY, $Scale * 0.34, $Scale * 0.34)
    $Graphics.DrawLine($pen, $keyX + $Scale * 0.30, $keyY + $Scale * 0.30, $keyX + $Scale * 0.74, $keyY + $Scale * 0.74)
    $Graphics.DrawLine($pen, $keyX + $Scale * 0.58, $keyY + $Scale * 0.58, $keyX + $Scale * 0.72, $keyY + $Scale * 0.46)
    $Graphics.DrawLine($pen, $keyX + $Scale * 0.68, $keyY + $Scale * 0.68, $keyX + $Scale * 0.82, $keyY + $Scale * 0.56)
    $pen.Dispose()
}

$bone = [System.Drawing.Color]::FromArgb(255, 232, 222, 201)
$boneSoft = [System.Drawing.Color]::FromArgb(255, 190, 179, 160)
$charcoal = [System.Drawing.Color]::FromArgb(255, 28, 27, 25)
$ash = [System.Drawing.Color]::FromArgb(255, 78, 73, 67)
$black = [System.Drawing.Color]::FromArgb(255, 7, 7, 7)
$mutedGold = [System.Drawing.Color]::FromArgb(255, 196, 162, 97)

function New-FrontMark {
    param(
        [string]$Path,
        [ValidateSet('star', 'loop')] [string]$Mark,
        [string]$Headline,
        [ValidateSet('dark', 'light')] [string]$Garment
    )

    $canvas = New-Canvas -Width 3600 -Height 3000
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    Set-Quality $graphics
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $ink = if ($Garment -eq 'dark') { $bone } else { $charcoal }
    $secondary = if ($Garment -eq 'dark') { $boneSoft } else { $ash }

    Draw-TrackedText $graphics $Headline 'Bodoni MT' 230 ([System.Drawing.FontStyle]::Regular) $ink 1800 560 3100 24
    if ($Mark -eq 'star') {
        Draw-ArchitectureStar $graphics 1800 1600 610 $ink 24
    } else {
        Draw-Ouroboros $graphics 1800 1640 520 $ink 56
    }
    Draw-TrackedText $graphics 'R/CREATION / DROP 001' 'Arial' 78 ([System.Drawing.FontStyle]::Regular) $secondary 1800 2540 2600 17

    Save-Png $canvas $Path
    $graphics.Dispose()
    $canvas.Dispose()
}

function New-BackPrint {
    param(
        [string]$Path,
        [string]$ArtPath,
        [string[]]$TopLines,
        [string]$BottomLine,
        [string]$Footer,
        [ValidateSet('dark', 'light')] [string]$Garment
    )

    $loaded = [System.Drawing.Bitmap]::new($ArtPath)
    $art = [RCreation.Imaging]::CreateInk($loaded, $Garment -eq 'dark')
    $loaded.Dispose()

    $canvas = New-Canvas -Width 4500 -Height 5400
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    Set-Quality $graphics
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $ink = if ($Garment -eq 'dark') { $bone } else { $charcoal }
    $secondary = if ($Garment -eq 'dark') { $boneSoft } else { $ash }

    if ($TopLines.Count -eq 1) {
        Draw-TrackedText $graphics $TopLines[0] 'Bodoni MT' 205 ([System.Drawing.FontStyle]::Regular) $ink 2250 260 4000 24
        $artTop = 650
    } else {
        Draw-TrackedText $graphics $TopLines[0] 'Bodoni MT' 175 ([System.Drawing.FontStyle]::Regular) $ink 2250 165 3900 28
        Draw-TrackedText $graphics $TopLines[1] 'Bodoni MT' 205 ([System.Drawing.FontStyle]::Regular) $ink 2250 390 4000 24
        $artTop = 760
    }

    Draw-ImageFit $graphics $art ([System.Drawing.RectangleF]::new(430, $artTop, 3640, 3770))
    Draw-TrackedText $graphics $BottomLine 'Bodoni MT' 185 ([System.Drawing.FontStyle]::Regular) $ink 2250 4650 3960 22
    Draw-TrackedText $graphics $Footer 'Arial' 72 ([System.Drawing.FontStyle]::Regular) $secondary 2250 5010 3200 18

    Save-Png $canvas $Path
    $graphics.Dispose()
    $canvas.Dispose()
    $art.Dispose()
}

New-FrontMark (Join-Path $paths.Print '01-embrace-the-chaos-front-dark-garment.png') 'star' 'EMBRACE THE CHAOS' 'dark'
New-FrontMark (Join-Path $paths.Print '01-embrace-the-chaos-front-light-garment.png') 'star' 'EMBRACE THE CHAOS' 'light'
New-FrontMark (Join-Path $paths.Print '02-break-the-loop-front-dark-garment.png') 'loop' 'BREAK THE LOOP' 'dark'
New-FrontMark (Join-Path $paths.Print '02-break-the-loop-front-light-garment.png') 'loop' 'BREAK THE LOOP' 'light'

New-BackPrint (Join-Path $paths.Print '03-rebuild-yourself-back-dark-garment.png') $isolatedReconstruction @('EMOTIONS ARE', 'ARCHITECTURE') 'REBUILD YOURSELF' 'R/CREATION / RECONSTRUCTION 001' 'dark'
New-BackPrint (Join-Path $paths.Print '03-rebuild-yourself-back-light-garment.png') $isolatedReconstruction @('EMOTIONS ARE', 'ARCHITECTURE') 'REBUILD YOURSELF' 'R/CREATION / RECONSTRUCTION 001' 'light'
New-BackPrint (Join-Path $paths.Print '04-face-what-you-hide-back-dark-garment.png') $isolatedConfrontation @('FACE WHAT YOU HIDE') 'BREAK THE LOOP' 'R/CREATION / CONFRONTATION 002' 'dark'
New-BackPrint (Join-Path $paths.Print '04-face-what-you-hide-back-light-garment.png') $isolatedConfrontation @('FACE WHAT YOU HIDE') 'BREAK THE LOOP' 'R/CREATION / CONFRONTATION 002' 'light'
New-BackPrint (Join-Path $paths.Print '05-nothing-is-permanent-back-dark-garment.png') $isolatedConfrontation @('BREAK THE LOOP') 'NOTHING IS PERMANENT' 'R/CREATION / HEAVY TEE 003' 'dark'
New-BackPrint (Join-Path $paths.Print '05-nothing-is-permanent-back-light-garment.png') $isolatedConfrontation @('BREAK THE LOOP') 'NOTHING IS PERMANENT' 'R/CREATION / HEAVY TEE 003' 'light'

function New-MarkPng {
    param([string]$Path, [ValidateSet('star', 'loop')]$Mark, [System.Drawing.Color]$Color)

    $canvas = New-Canvas 1800 1800
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    Set-Quality $graphics
    $graphics.Clear([System.Drawing.Color]::Transparent)
    if ($Mark -eq 'star') { Draw-ArchitectureStar $graphics 900 900 650 $Color 30 }
    else { Draw-Ouroboros $graphics 900 900 560 $Color 62 }
    Save-Png $canvas $Path
    $graphics.Dispose()
    $canvas.Dispose()
}

New-MarkPng (Join-Path $paths.Marks 'architecture-star-bone.png') 'star' $bone
New-MarkPng (Join-Path $paths.Marks 'architecture-star-charcoal.png') 'star' $charcoal
New-MarkPng (Join-Path $paths.Marks 'ouroboros-bone.png') 'loop' $bone
New-MarkPng (Join-Path $paths.Marks 'ouroboros-charcoal.png') 'loop' $charcoal

$starSvg = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200">
  <g fill="none" stroke="#e8dec9" stroke-width="20" stroke-linecap="round" stroke-linejoin="round">
    <path d="M80 600h1040M600 80v1040"/>
    <path d="M600 350l105 155 245 95-245 95-105 155-105-155-245-95 245-95z"/>
    <path d="M600 490l110 110-110 110-110-110z"/>
  </g>
</svg>
'@
$loopSvg = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200">
  <g fill="none" stroke="#e8dec9" stroke-width="54" stroke-linecap="round" stroke-linejoin="round">
    <path d="M874 300A390 390 0 1 0 936 390"/>
    <path d="M882 286l108 14-58 94z" fill="#e8dec9"/>
    <path d="M318 826l62 34m-110-103l71 24m-89-111l76 12m-73-117l77 1m-51-122l76-11m-28-121l72-23m2-118l64-34m31 101l53-44m56 82l42-53m76 63l31-61m89 47l17-65"/>
  </g>
</svg>
'@
Set-Content -LiteralPath (Join-Path $paths.Marks 'architecture-star-bone.svg') -Value $starSvg -Encoding utf8
Set-Content -LiteralPath (Join-Path $paths.Marks 'ouroboros-bone.svg') -Value $loopSvg -Encoding utf8

function New-EmbroideryText {
    param(
        [string]$Path,
        [string]$Text,
        [ValidateSet('star', 'loop')] [string]$Accent
    )

    $canvas = New-Canvas 2400 1200
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    Set-Quality $graphics
    $graphics.Clear([System.Drawing.Color]::Transparent)
    Draw-TrackedText $graphics $Text 'Georgia' 250 ([System.Drawing.FontStyle]::Bold -bor [System.Drawing.FontStyle]::Italic) $bone 1200 350 2050 4
    if ($Accent -eq 'star') {
        Draw-ArchitectureStar $graphics 1200 895 290 $mutedGold 28
    } else {
        Draw-Ouroboros $graphics 1200 880 235 $mutedGold 48
    }
    Save-Png $canvas $Path
    $graphics.Dispose()
    $canvas.Dispose()
}

function New-EmbroideryRear {
    param([string]$Path, [ValidateSet('mirror', 'cage')]$Mark, [string]$Text)

    $canvas = New-Canvas 2400 1200
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    Set-Quality $graphics
    $graphics.Clear([System.Drawing.Color]::Transparent)
    if ($Mark -eq 'mirror') {
        Draw-MirroredProfiles $graphics 1200 480 400 $bone 32
    } else {
        Draw-CageKey $graphics 1120 455 390 $bone 32
    }
    Draw-TrackedText $graphics $Text 'Arial' 125 ([System.Drawing.FontStyle]::Bold) $bone 1200 940 2100 15
    Save-Png $canvas $Path
    $graphics.Dispose()
    $canvas.Dispose()
}

New-EmbroideryText (Join-Path $paths.Embroidery 'cap-unavailable-front-embroidery-source.png') 'Emotionally unavailable' 'star'
New-EmbroideryRear (Join-Path $paths.Embroidery 'cap-unavailable-rear-embroidery-source.png') 'mirror' 'MIRRORED TRUTH'
New-EmbroideryText (Join-Path $paths.Embroidery 'cap-prison-front-embroidery-source.png') 'Prison' 'star'
New-EmbroideryRear (Join-Path $paths.Embroidery 'cap-prison-rear-embroidery-source.png') 'cage' 'TRYING TO BE NORMAL'

$embroiderySvg = @{
    'cap-unavailable-front-embroidery-source.svg' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 1200">
  <text x="1200" y="610" text-anchor="middle" fill="#e8dec9" font-family="Georgia, serif" font-size="250" font-style="italic" font-weight="700">Emotionally unavailable</text>
  <g fill="none" stroke="#c4a261" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"><path d="M910 900h580M1200 610v580"/><path d="M1200 755l60 85 140 60-140 60-60 85-60-85-140-60 140-60z"/></g>
</svg>
'@
    'cap-prison-front-embroidery-source.svg' = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 1200">
  <text x="1200" y="610" text-anchor="middle" fill="#e8dec9" font-family="Georgia, serif" font-size="330" font-style="italic" font-weight="700">Prison</text>
  <g fill="none" stroke="#c4a261" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"><path d="M910 900h580M1200 610v580"/><path d="M1200 755l60 85 140 60-140 60-60 85-60-85-140-60 140-60z"/></g>
</svg>
'@
}
foreach ($entry in $embroiderySvg.GetEnumerator()) {
    Set-Content -LiteralPath (Join-Path $paths.Embroidery $entry.Key) -Value $entry.Value -Encoding utf8
}

function New-SockTile {
    param([string]$Path, [ValidateSet('black', 'bone')]$Base)

    $canvas = New-Canvas 2400 2400
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    Set-Quality $graphics
    $background = if ($Base -eq 'black') { $black } else { $bone }
    $ink = if ($Base -eq 'black') { $boneSoft } else { $charcoal }
    $accent = if ($Base -eq 'black') { $mutedGold } else { $ash }
    $graphics.Clear($background)

    $positions = @(
        @(300, 300, 110), @(900, 280, 90), @(1500, 320, 115), @(2100, 270, 80),
        @(580, 850, 125), @(1250, 760, 90), @(1960, 890, 120),
        @(280, 1420, 85), @(920, 1350, 125), @(1570, 1460, 90), @(2140, 1370, 110),
        @(560, 2050, 110), @(1240, 1980, 80), @(1900, 2080, 120)
    )
    foreach ($position in $positions) {
        Draw-ArchitectureStar $graphics $position[0] $position[1] $position[2] $ink ([Math]::Max(10, $position[2] * 0.11))
    }
    Draw-Ouroboros $graphics 1200 1200 330 $accent 42
    Draw-TrackedText $graphics 'BREAK THE LOOP' 'Arial' 98 ([System.Drawing.FontStyle]::Bold) $ink 1200 1810 1700 15
    Draw-TrackedText $graphics 'R/CREATION' 'Arial' 60 ([System.Drawing.FontStyle]::Regular) $accent 1200 2170 1100 15
    Save-Png $canvas $Path
    $graphics.Dispose()
    $canvas.Dispose()
}

New-SockTile (Join-Path $paths.Pattern 'architecture-socks-black-seamless-tile.png') 'black'
New-SockTile (Join-Path $paths.Pattern 'architecture-socks-bone-seamless-tile.png') 'bone'

function New-StickerBase {
    param([int]$Width = 2400, [int]$Height = 2400)

    $canvas = New-Canvas $Width $Height
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    Set-Quality $graphics
    $graphics.Clear([System.Drawing.Color]::Transparent)
    $fill = [System.Drawing.SolidBrush]::new($black)
    $outline = [System.Drawing.Pen]::new($bone, 62)
    $outline.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    $graphics.FillRoundedRectangle($fill, 150, 150, $Width - 300, $Height - 300, 180)
    $graphics.DrawRoundedRectangle($outline, 180, 180, $Width - 360, $Height - 360, 150)
    $fill.Dispose()
    $outline.Dispose()
    return @($canvas, $graphics)
}

# PowerShell's System.Drawing wrapper lacks rounded-rectangle helpers, so add them once.
if (-not ('RCreation.GraphicsExtensions' -as [type])) {
    Add-Type -TypeDefinition @'
using System.Drawing;
using System.Drawing.Drawing2D;
namespace RCreation {
    public static class GraphicsExtensions {
        private static GraphicsPath Rounded(float x, float y, float width, float height, float radius) {
            GraphicsPath path = new GraphicsPath();
            float d = radius * 2;
            path.AddArc(x, y, d, d, 180, 90);
            path.AddArc(x + width - d, y, d, d, 270, 90);
            path.AddArc(x + width - d, y + height - d, d, d, 0, 90);
            path.AddArc(x, y + height - d, d, d, 90, 90);
            path.CloseFigure();
            return path;
        }
        public static void FillRoundedRectangle(this Graphics graphics, Brush brush, float x, float y, float width, float height, float radius) {
            using (GraphicsPath path = Rounded(x, y, width, height, radius)) graphics.FillPath(brush, path);
        }
        public static void DrawRoundedRectangle(this Graphics graphics, Pen pen, float x, float y, float width, float height, float radius) {
            using (GraphicsPath path = Rounded(x, y, width, height, radius)) graphics.DrawPath(pen, path);
        }
    }
}
'@ -ReferencedAssemblies System.Drawing
}

function Draw-RoundedBadge {
    param([System.Drawing.Graphics]$Graphics, [int]$Width, [int]$Height)
    $fill = [System.Drawing.SolidBrush]::new($black)
    $outline = [System.Drawing.Pen]::new($bone, 62)
    $outline.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    [RCreation.GraphicsExtensions]::FillRoundedRectangle($Graphics, $fill, 150, 150, $Width - 300, $Height - 300, 180)
    [RCreation.GraphicsExtensions]::DrawRoundedRectangle($Graphics, $outline, 180, 180, $Width - 360, $Height - 360, 150)
    $fill.Dispose()
    $outline.Dispose()
}

function New-SymbolSticker {
    param([string]$Path, [ValidateSet('architecture', 'loop', 'permanent')]$Type)

    $canvas = New-Canvas 2400 2400
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    Set-Quality $graphics
    $graphics.Clear([System.Drawing.Color]::Transparent)
    Draw-RoundedBadge $graphics 2400 2400

    if ($Type -eq 'architecture') {
        Draw-TrackedText $graphics 'EMOTIONS ARE' 'Bodoni MT' 190 ([System.Drawing.FontStyle]::Regular) $bone 1200 370 1850 18
        Draw-TrackedText $graphics 'ARCHITECTURE' 'Bodoni MT' 210 ([System.Drawing.FontStyle]::Regular) $bone 1200 610 1900 15
        Draw-ArchitectureStar $graphics 1200 1380 610 $mutedGold 28
        Draw-TrackedText $graphics 'R/CREATION' 'Arial' 75 ([System.Drawing.FontStyle]::Regular) $boneSoft 1200 2020 1300 16
    } elseif ($Type -eq 'loop') {
        Draw-Ouroboros $graphics 1200 970 590 $bone 60
        Draw-TrackedText $graphics 'BREAK THE LOOP' 'Bodoni MT' 225 ([System.Drawing.FontStyle]::Regular) $bone 1200 1770 1900 15
        Draw-TrackedText $graphics 'DROP 001' 'Arial' 72 ([System.Drawing.FontStyle]::Regular) $mutedGold 1200 2070 900 14
    } else {
        Draw-TrackedText $graphics 'NOTHING IS' 'Bodoni MT' 250 ([System.Drawing.FontStyle]::Regular) $bone 1200 680 1800 20
        Draw-TrackedText $graphics 'PERMANENT' 'Bodoni MT' 285 ([System.Drawing.FontStyle]::Regular) $bone 1200 1030 1900 16
        Draw-ArchitectureStar $graphics 1200 1700 390 $mutedGold 25
        Draw-TrackedText $graphics 'R/CREATION' 'Arial' 72 ([System.Drawing.FontStyle]::Regular) $boneSoft 1200 2050 1200 16
    }

    Save-Png $canvas $Path
    $graphics.Dispose()
    $canvas.Dispose()
}

function New-FaceSticker {
    param([string]$Path)

    $loaded = [System.Drawing.Bitmap]::new($isolatedConfrontation)
    $art = [RCreation.Imaging]::CreateInk($loaded, $true)
    $loaded.Dispose()
    $canvas = New-Canvas 2400 2400
    $graphics = [System.Drawing.Graphics]::FromImage($canvas)
    Set-Quality $graphics
    $graphics.Clear([System.Drawing.Color]::Transparent)
    Draw-RoundedBadge $graphics 2400 2400
    Draw-ImageFit $graphics $art ([System.Drawing.RectangleF]::new(420, 250, 1560, 1520))
    $bar = [System.Drawing.SolidBrush]::new($black)
    $graphics.FillRectangle($bar, 250, 1680, 1900, 410)
    $bar.Dispose()
    Draw-TrackedText $graphics 'FACE WHAT YOU HIDE' 'Bodoni MT' 205 ([System.Drawing.FontStyle]::Regular) $bone 1200 1760 1780 12
    Save-Png $canvas $Path
    $graphics.Dispose()
    $canvas.Dispose()
    $art.Dispose()
}

New-SymbolSticker (Join-Path $paths.Sticker 'sticker-01-emotions-are-architecture.png') 'architecture'
New-FaceSticker (Join-Path $paths.Sticker 'sticker-02-face-what-you-hide.png')
New-SymbolSticker (Join-Path $paths.Sticker 'sticker-03-break-the-loop.png') 'loop'
New-SymbolSticker (Join-Path $paths.Sticker 'sticker-04-nothing-is-permanent.png') 'permanent'

function Add-PreviewTile {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$ImagePath,
        [string]$Label,
        [System.Drawing.RectangleF]$Bounds,
        [System.Drawing.Color]$Background
    )

    $brush = [System.Drawing.SolidBrush]::new($Background)
    $Graphics.FillRectangle($brush, $Bounds)
    $brush.Dispose()
    $image = [System.Drawing.Bitmap]::new($ImagePath)
    Draw-ImageFit $Graphics $image ([System.Drawing.RectangleF]::new($Bounds.X + 40, $Bounds.Y + 40, $Bounds.Width - 80, $Bounds.Height - 150))
    $image.Dispose()
    Draw-TrackedText $Graphics $Label 'Arial' 38 ([System.Drawing.FontStyle]::Bold) $bone ($Bounds.X + $Bounds.Width / 2) ($Bounds.Bottom - 88) ($Bounds.Width - 90) 3
}

$contact = New-Canvas 3600 2600 150
$contactGraphics = [System.Drawing.Graphics]::FromImage($contact)
Set-Quality $contactGraphics
$contactGraphics.Clear([System.Drawing.Color]::FromArgb(255, 15, 14, 13))
Draw-TrackedText $contactGraphics 'R/CREATION / DROP 001' 'Arial' 58 ([System.Drawing.FontStyle]::Bold) $bone 1800 75 3200 16
Draw-TrackedText $contactGraphics 'PRODUCTION ART SYSTEM' 'Bodoni MT' 115 ([System.Drawing.FontStyle]::Regular) $bone 1800 175 3200 18

$tiles = @(
    @('01-embrace-the-chaos-front-dark-garment.png', 'EMBRACE / FRONT', 0),
    @('03-rebuild-yourself-back-dark-garment.png', 'RECONSTRUCTION / BACK', 0),
    @('02-break-the-loop-front-dark-garment.png', 'BREAK THE LOOP / FRONT', 0),
    @('04-face-what-you-hide-back-dark-garment.png', 'CONFRONTATION / BACK', 0),
    @('05-nothing-is-permanent-back-dark-garment.png', 'HEAVY TEE / BACK', 0),
    @('architecture-socks-black-seamless-tile.png', 'SOCK TILE / BLACK', 1),
    @('cap-unavailable-front-embroidery-source.png', 'CAP / UNAVAILABLE', 2),
    @('cap-prison-rear-embroidery-source.png', 'CAP / PRISON REAR', 2),
    @('sticker-02-face-what-you-hide.png', 'STICKER / FACE', 3),
    @('sticker-04-nothing-is-permanent.png', 'STICKER / PERMANENT', 3)
)

for ($i = 0; $i -lt $tiles.Count; $i++) {
    $column = $i % 5
    $row = [Math]::Floor($i / 5)
    $x = 80 + $column * 700
    $y = 380 + $row * 1080
    $folder = switch ($tiles[$i][2]) { 1 { $paths.Pattern } 2 { $paths.Embroidery } 3 { $paths.Sticker } default { $paths.Print } }
    Add-PreviewTile $contactGraphics (Join-Path $folder $tiles[$i][0]) $tiles[$i][1] ([System.Drawing.RectangleF]::new($x, $y, 650, 1010)) ([System.Drawing.Color]::FromArgb(255, 8, 8, 8))
}

Save-Png $contact (Join-Path $paths.Preview 'drop-001-production-art-overview.png')
$contactGraphics.Dispose()
$contact.Dispose()

$rows = foreach ($file in Get-ChildItem -Path (Join-Path $PackRoot 'production') -Recurse -Filter '*.png' | Sort-Object FullName) {
    $image = [System.Drawing.Bitmap]::new($file.FullName)
    $hasAlpha = $image.PixelFormat.ToString().Contains('Alpha') -or $image.PixelFormat.ToString().Contains('Argb')
    $greenPixels = [RCreation.Imaging]::CountGreenPixels($file.FullName)
    [pscustomobject]@{
        File = $file.FullName.Substring($PackRoot.Length + 1).Replace('\', '/')
        WidthPx = $image.Width
        HeightPx = $image.Height
        DpiX = [Math]::Round($image.HorizontalResolution, 1)
        DpiY = [Math]::Round($image.VerticalResolution, 1)
        AlphaChannel = $hasAlpha
        GreenLeakSamplePixels = $greenPixels
        SizeMB = [Math]::Round($file.Length / 1MB, 2)
        Sha256 = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    }
    $image.Dispose()
}

$rows | Export-Csv -LiteralPath (Join-Path $paths.Qa 'asset-manifest.csv') -NoTypeInformation -Encoding utf8

$greenLeakFiles = $rows | Where-Object { $_.GreenLeakSamplePixels -gt 0 }
if ($greenLeakFiles) {
    throw "Green chroma spill remains in production files: $($greenLeakFiles.File -join ', ')"
}

Write-Host "Built $($rows.Count) production PNG files with zero sampled chroma-key leaks."
