import {createContext, RefObject, useContext} from "react";
import {Tuple2D} from "../../interfaces/values/tuples";
import {NumberRange} from "../../classes/ranges/number-range";

export interface Slider2DContextValue {
	value: Tuple2D;
	valueRef: RefObject<Tuple2D>;
	step: Tuple2D;
	largeStep: Tuple2D;
	xRange: NumberRange;
	yRange: NumberRange;
	interval: number;
	setXY: (x: number, y: number) => void;
	liveText: string;
	setLiveText: (text: string) => void;
	thumbAlignment: 'center' | 'edge' | 'edge-client-only';
}

export const Slider2DContext = createContext<Slider2DContextValue | null>(null);

export function useSlider2DContext() {
	const ctx = useContext(Slider2DContext);
	if (!ctx) {
		throw new Error("Slider2DRoot components must be used inside Slider2DRoot.Root");
	}
	return ctx;
}