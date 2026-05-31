import Color, {Coords} from "colorjs.io";
import {HexData, HSLAData, HSLAChannel, RGBAData, HSLAChannels} from "../interfaces/values/colors/color";
import {LinearGradientData} from "../interfaces/values/colors/gradient";
import "./array/index";
import {NumberRange} from "../classes/ranges/number-range";
import {GradientStop} from "../classes/colors/gradients/base-gradient";
import {percentage} from "./math";

export const toColor =
	(colorFormat: string, values: [number | null, number | null, number | null, (number | null)?]): Color => {
	const coords: Coords = [values[0], values[1], values[2]];

	return new Color(colorFormat, coords, values[3] ?? 1);
}

export function hsvToHsl(h: number, s: number, v: number, a: number) {
	const s1 = s / 100;
	const v1 = v / 100;

	const l = v1 - (v1 * s1) / 2;

	const denominator = 1 - Math.abs(2 * l - 1);

	const sL = denominator === 0 ? 0 : (v1 * s1) / denominator;

	return {
		h,
		s: sL * 100,
		l: l * 100,
		a
	};
}

export function hslToHsv(h: number, s: number, l: number, a: number) {
	const saturationNormalized: number = s / 100;
	const lightnessNormalized: number = l / 100;

	const value: number =
		lightnessNormalized + saturationNormalized * Math.min(lightnessNormalized, 1 - lightnessNormalized);
	const saturationFraction = value === 0 ? 0 : 2 * (1 - lightnessNormalized / value);

	return {
		h,
		s: saturationFraction * 100,
		v: value * 100,
		a
	};
}

export function parseToRGBA(input: Color | string): RGBAData {
	const c = input instanceof Color ? input : new Color(input).to("srgb");

	const {g, r, b, alpha} = c;

	if (r === null || g === null || b === null)
		throw new Error("Invalid color format.");

	return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a: alpha ?? 1};
}

export function rgbaToHex({r, g, b, a = 1}: RGBAData): HexData {
	const c = new Color("srgb", [r / 255, g / 255, b / 255], a);
	return {value: c.toString({format: "hex"})};
}

export function rgbaToHSLA({r, g, b, a = 1}: RGBAData): HSLAData {
	const c = new Color("srgb", [r / 255, g / 255, b / 255], a).to("hsl");

	const {h, s, l, alpha} = c;

	if (h === null || s === null || l === null || alpha === null)
		throw new Error("Invalid color format.");

	return {h, s, l, a: alpha};
}

export function findProgressInGradient (color: HSLAData, gradient: LinearGradientData, channel?: HSLAChannel[])
	: number[] | null {
	const uniqueChannel: HSLAChannel[] | undefined = channel?.unique()
	const actualChannels: readonly HSLAChannel[] =
		uniqueChannel && uniqueChannel.length > 0 ? uniqueChannel : HSLAChannels;

	if (gradient.stops.length < 2)
		throw new Error("Invalid color format.");

	const DEFAULT: number = -1;

	for (let stopID: number = 0; stopID < gradient.stops.length - 1; stopID++) {
		const current: GradientStop = gradient.stops[stopID];
		const next: GradientStop = gradient.stops[stopID + 1];

		const validChannels: number[] = new Array(actualChannels.length).fill(DEFAULT);

		for (let channelID: number = 0; channelID < actualChannels.length; channelID++) {
			const min: number = current.color[actualChannels[channelID]];
			const max: number = next.color[actualChannels[channelID]];
			const range = new NumberRange({ min, max });

			const value: number = color[actualChannels[channelID]];

			if (!range.contains(value))
				break;

			validChannels[channelID] = percentage(value, range);
		}

		if (validChannels.some((channel: number): boolean => channel === DEFAULT))
			continue;

		const progressSection = new NumberRange({min: current.position, max: next.position})
		const progressSectionRange: number = progressSection.getRange();

		return validChannels.map((v: number): number =>	progressSection.min + progressSectionRange * v);
	}

	return null;
}