import {Slider, SliderRoot} from "@base-ui/react";
import {ColorSliderContext, ColorSliderContextValue} from "./ColorSliderContext";
import {HSLAData} from "../../interfaces/values/colors/color";
import {LinearGradientData} from "../../interfaces/values/colors/gradient";
import {HSLAColor} from "../../classes/colors/solid/hsla-color";
import {GradientStop} from "../../classes/colors/gradients/base-gradient";
import {angleToRadians, lerp} from "../../utilities/math";
import React, {RefObject, useEffect, useRef} from "react";
import {Dimension2D, Tuple2D} from "../../interfaces/values/tuples";
import {findProgressInGradient} from "../../utilities/color";

interface ColorSliderProps extends Omit<SliderRoot.Props, "onValueChange"|"value"|"defaultValue"> {
	onValueChange?: (value: number | readonly number[], color: HSLAData | readonly HSLAData[]) => void;
	value?: number | readonly number[] | HSLAData | readonly HSLAData[];
	defaultValue?: number | readonly number[] | HSLAData | readonly HSLAData[];
	background?: LinearGradientData;
	sliderTarget?: "h" | "s" | "l" | "a"[];
	displayColor?: boolean;
}

function useColorSlider(
	{ value, canvasRef }: {
		value: HSLAData | HSLAData[], canvasRef: RefObject<HTMLCanvasElement | null>
	}
): ColorSliderContextValue {
	return { value, canvasRef };
}

const DEFAULT_BACKGROUND: LinearGradientData = {
	angle: 0,
	isRepeating: false,
	stops: [
		new GradientStop({ position: 0, color: HSLAColor.WHITE }),
		new GradientStop({ position: 1, color: HSLAColor.WHITE }),
	],
	interpolation: "shortest"
};

function validateBackground(background: LinearGradientData): LinearGradientData {
	if (background.stops.length < 2) {
		console.warn("Background has less than 2 stops; using fallback");
		return DEFAULT_BACKGROUND;
	}

	return background;
}

export function ColorSliderRoot(props: ColorSliderProps): React.ReactElement | null {
	const {
		background = DEFAULT_BACKGROUND,
		value,
		children,
		defaultValue = 0,
		onValueChange,
		sliderTarget = "h",
		displayColor = true,
		orientation = "horizontal",
		...rest
	} = props;

	const actualBackground: LinearGradientData = validateBackground(background);

	const canvasRef: RefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement>(null);
	let canvasCtx: CanvasRenderingContext2D | null = null;
	let center: Tuple2D = {x: 0, y: 0};
	let dimensions: Dimension2D<number> = {width: 0, height: 0};

	findProgressInGradient({ h: 100, s: 100, l: 50, a: 1 }, actualBackground, ["h"]);

	useEffect(() => {
		const canvas: HTMLCanvasElement | null = canvasRef.current;

		if (!canvas)
			return;

		canvasCtx = canvas.getContext("2d")!;

		const { width: w, height: h } = dimensions = {width: canvas.width, height: canvas.height};
		center = { x: w / 2, y: h / 2 };
		const rad = angleToRadians(background.angle - 90);

		const length = Math.abs(w * Math.cos(rad)) + Math.abs(h * Math.sin(rad));

		const half = { x: (Math.cos(rad) * length) / 2, y: (Math.sin(rad) * length) / 2 };

		const gradient: CanvasGradient =
			canvasCtx.createLinearGradient(center.x - half.x, center.y - half.y, center.x + half.x, center.y + half.y);

		actualBackground.stops.forEach((stop: GradientStop): void =>
			gradient.addColorStop(stop.position, stop.color.toCssString()));

		canvasCtx.fillStyle = gradient;
		canvasCtx.fillRect(0, 0, w, h);
	});

	if (!canvasCtx)
		return null;

	const ctx = useColorSlider({value, canvasRef});

	function getColor(progress: number) {
		let imageData: ImageData | undefined;

		switch (orientation) {
			case "horizontal":
				imageData = canvasCtx?.getImageData(lerp(0, dimensions.width, progress), center.y, 1, 1);
				break;
			case "vertical":
				imageData = canvasCtx?.getImageData(center.x, lerp(0, dimensions.height, progress), 1, 1);
				break;
		}

		if (!imageData)
			throw new Error("Invalid Context");

		return HSLAColor.fromRGBA(
			{
				r: imageData?.data[0],
				g: imageData?.data[1],
				b: imageData?.data[2],
				a: imageData?.data[3] / 255
			}
		);
	}

	function handleValueChange(value: (number | readonly number[])): void {
		onValueChange?.(
			value,
			typeof value === "number" ? getColor(value) : value.map((thumb: number): HSLAColor => getColor(thumb))
		);
	}

	return (
		<ColorSliderContext.Provider value={ctx}>
			<Slider.Root {...rest} onValueChange={handleValueChange}>
				{children}
			</Slider.Root>
		</ColorSliderContext.Provider>
	);
}