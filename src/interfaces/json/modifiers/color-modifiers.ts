import {Modifier} from "./general-modifiers";
import {Enableable, Format} from "../../generic";

export type ColorFormatType = "hex" | "rgb" | "hsl";

export const ColorModifiers = {
	AlphaEnabled: "alpha-enabled",
	DisallowAlpha: "disallow-alpha",
	ColorFormat: "color-format",
	Palette: "palette"
} as const;

export type ColorModifierTypes = typeof ColorModifiers[keyof typeof ColorModifiers];

export interface AlphaEnabledModifier extends Enableable, Modifier<typeof ColorModifiers.AlphaEnabled> {}
export interface DisallowAlphaModifier extends Enableable, Modifier<typeof ColorModifiers.DisallowAlpha> {}
export interface ColorFormatModifier extends Modifier<typeof ColorModifiers.ColorFormat>, Format<ColorFormatType> {}
export interface PaletteModifier extends Modifier<typeof ColorModifiers.Palette> {
	colors: string[]; // or structured colors
}