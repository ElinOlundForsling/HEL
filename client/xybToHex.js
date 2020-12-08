export default function xyBriToHex(x, y, bri) {
	const newBri = bri === 1 ? 255 : bri;
	let z = 1.0 - x - y;

	let Y = newBri / 255.0; // Brightness of lamp
	let X = (Y / y) * x;
	let Z = (Y / y) * z;
	let r = X * 1.612 - Y * 0.203 - Z * 0.302;
	let g = -X * 0.509 + Y * 1.412 + Z * 0.066;
	let b = X * 0.026 - Y * 0.072 + Z * 0.962;
	r =
		r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, 1.0 / 2.4) - 0.055;
	g =
		g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, 1.0 / 2.4) - 0.055;
	b =
		b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, 1.0 / 2.4) - 0.055;
	let maxValue = Math.max(r, g, b);
	r /= maxValue;
	g /= maxValue;
	b /= maxValue;
	r = r * 255;
	if (r < 0) {
		r = 255;
	}
	g = g * 255;
	if (g < 0) {
		g = 255;
	}
	b = b * 255;
	if (b < 0) {
		b = 255;
	}

	r = Math.round(r).toString(16);
	g = Math.round(g).toString(16);
	b = Math.round(b).toString(16);

	if (r.length < 2) r = '0' + r;
	if (g.length < 2) g = '0' + g;
	if (b.length < 2) b = '0' + r;
	let rgb = '#' + r + g + b;

	return rgb;
}
