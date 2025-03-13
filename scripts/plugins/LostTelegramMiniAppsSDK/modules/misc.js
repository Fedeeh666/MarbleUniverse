export function rgbToHex(rgb) {
    const clampedRgb = rgb.map(x => Math.max(0, Math.min(1, x)));
    const hexColor = '#' + clampedRgb
        .map(x => Math.round(x * 255)
        .toString(16).padStart(2, '0'))
        .join('');
    return hexColor.toUpperCase();
}
