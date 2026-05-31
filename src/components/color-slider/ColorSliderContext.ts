import {Context, createContext, RefObject, useContext} from "react";
import {HSLAData} from "../../interfaces/values/colors/color";

export interface ColorSliderContextValue {
	value: HSLAData | readonly HSLAData[];
	canvasRef: RefObject<HTMLCanvasElement | null>;
}

export const ColorSliderContext: Context<ColorSliderContextValue | null> =
	createContext<ColorSliderContextValue | null>(null);

export function useColorSliderContext(): ColorSliderContextValue {
	const ctx: ColorSliderContextValue | null = useContext(ColorSliderContext);

	if (!ctx)
		throw new Error("ColorSliderRoot components must be used inside ColorSliderRoot.Root");

	return ctx;
}