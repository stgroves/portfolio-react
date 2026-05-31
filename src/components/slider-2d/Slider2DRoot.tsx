import React, {ReactElement, RefObject, useState} from "react";
import {Slider2DContext, Slider2DContextValue} from "./Slider2DContext";
import {Tuple2D} from "../../interfaces/values/tuples";
import {clamp} from "../../utilities/math";
import {useControlledStateWithRef} from "../../utilities/controlledState";
import {NumberRange} from "../../classes/ranges/number-range";

export interface Slider2DRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "step" | "defaultValue"> {
	value?: Tuple2D;
	defaultValue?: Tuple2D;
	xRange?: NumberRange;
	yRange?: NumberRange;
	step?: Tuple2D;
	largeStep?: Tuple2D;
	interval?: number;
	onValueChange?: (value: Tuple2D) => void;
	getLiveText?: (value: Tuple2D) => string;
	thumbAlignment?: 'center' | 'edge' | 'edge-client-only';
}

interface UseSlider2DRootProps {
	value: Tuple2D;
	valueRef: RefObject<Tuple2D>;
	xRange: NumberRange;
	yRange: NumberRange;
	step: Tuple2D;
	largeStep: Tuple2D;
	onValueChange?: (value: Tuple2D) => void;
	interval: number;
	getLiveText?: (value: Tuple2D) => string;
	liveText: string;
	setLiveText: (text: string) => void;
	thumbAlignment: 'center' | 'edge' | 'edge-client-only';
}

export function useSlider2D({
	value,
	valueRef,
	onValueChange,
	xRange,
	yRange,
	step,
	largeStep,
	interval,
	liveText,
	setLiveText,
	getLiveText,
	thumbAlignment
}: UseSlider2DRootProps): Slider2DContextValue {
	const setXY: (x: number, y: number) => void = (x: number, y: number): void => {
		const clampedX: number = clamp(x, xRange.min, xRange.max);
		const clampedY: number = clamp(y, yRange.min, yRange.max);
		const next = { x: clampedX, y: clampedY };

		valueRef.current = next;

		onValueChange?.(next);

		if (getLiveText)
			setLiveText(getLiveText(next));
	}

	return {
		value,
		valueRef,
		xRange,
		yRange,
		step,
		largeStep,
		interval,
		liveText,
		setLiveText,
		setXY,
		thumbAlignment
	};
}

export function Slider2DRoot(props: Slider2DRootProps): ReactElement {
	const {
		value,
		defaultValue = {x: 0, y: 0},
		onValueChange,
		children,
		yRange = NumberRange.PERCENTAGE,
		xRange = NumberRange.PERCENTAGE,
		step = {x: 1, y: 1},
		largeStep = {x: 10, y: 10},
		interval = 100,
		getLiveText = (value: Tuple2D) => `X ${value.x}, Y ${value.y}`,
		thumbAlignment = 'center',
		...rest
	} = props;

	const [coords, setCoords, coordsRef] = useControlledStateWithRef(value, defaultValue, onValueChange);

	const [liveText, setLiveText] = useState("");

	const ctx = useSlider2D({
		value: coords,
		valueRef: coordsRef,
		onValueChange: setCoords,
		xRange,
		yRange,
		step,
		largeStep,
		interval,
		getLiveText,
		setLiveText,
		liveText,
		thumbAlignment
	});

	return (
		<Slider2DContext.Provider value={ctx}>
			<div {...rest}>{children}</div>
		</Slider2DContext.Provider>
	);
}