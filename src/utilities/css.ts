import Color from "colorjs.io";

export function isParsableColor(input: string): boolean {
	try {
		new Color(input);
		return true;
	} catch {
		return false;
	}
}

export function isValidGradient(input: string): boolean {
	const isGradientFormat = /^(?:repeating-)?(?:linear|radial|conic)-gradient\(/i.test(input.trim());

	if (!isGradientFormat)
		return false;

	const s = new Option().style;
	s.backgroundImage = input;

	return s.backgroundImage !== '';
}

export function isValidLength(input: string) {
	const test = new Option("test").style;
	test.width = input;

	return test.width != '';
}

export function isValidCssBackground(value: string): boolean {
	const el = document.createElement("div");
	el.style.background = value;
	return el.style.background !== "";
}