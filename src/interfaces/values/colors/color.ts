import {RGBAColor} from "../../../classes/colors/solid/rgba-color";
import {HSLAColor} from "../../../classes/colors/solid/hsla-color";
import {HexColor} from "../../../classes/colors/solid/hex-color";

export type ColorTypes = RGBAColor | HSLAColor | HexColor;
export type ColorDataTypes = RGBAData | HSLAData | HexData

export const HSLAChannels = ["h", "s", "l", "a"] as const;

export type HSLAChannel = typeof HSLAChannels[number];
export type RGBAChannel = "r" | "g" | "b" | "a";
export type HexChannel = RGBAChannel;

export interface HexData {
	value: string;
}

export interface HSLAData {
	h: number;
	s: number;
	l: number;
	a: number;
}

export interface HSVAData {
	h: number;
	s: number;
	v: number;
	a: number;
}

export interface RGBAData {
	r: number;
	g: number;
	b: number;
	a?: number;
}
