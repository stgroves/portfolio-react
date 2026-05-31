import {HSLAData, HSVAData} from "../../../interfaces/values/colors/color";
import {Slider2D, Slider2DRootProps} from "../../slider-2d";
import {ReactElement, useMemo, useState} from "react";
import {Tuple2D} from "../../../interfaces/values/tuples";
import {hslToHsv, hsvToHsl} from "../../../utilities/color";
import {HSLAColor} from "../../../classes/colors/solid/hsla-color";
import {useControlledState} from "../../../utilities/controlledState";

export interface BrightnessSquareProps
	extends Omit<Slider2DRootProps, "defaultValue" | "value" | "onValueChange" | "yRange" | "xRange" | "step"> {
	value?: HSLAData;
	defaultValue?: HSLAData;
	onValueChange?: (value: HSLAData) => void;
}

export function BrightnessSquare(props: BrightnessSquareProps): ReactElement {
	const { value, defaultValue = HSLAColor.WHITE, onValueChange, children, style, ...rest } = props;

	const defaultHSV: HSVAData = useMemo(
		(): HSVAData => hslToHsv(defaultValue.h, defaultValue.s, defaultValue.l, defaultValue.a),
		[defaultValue.h, defaultValue.s, defaultValue.l, defaultValue.a]
	);

	const controlledHSV: HSVAData | undefined = useMemo(
		(): HSVAData | undefined => value ? hslToHsv(value.h, value.s, value.l, value.a) : undefined,
		[value?.h, value?.s, value?.l, value?.a]
	);

	const [hsv, setHSV] = useControlledState(
		controlledHSV,
		defaultHSV,
		(value: HSVAData): void => onValueChange?.(hsvToHsl(value.h, value.s, value.v, value.a))
	);

	const [x, setX] = useState((): number => (defaultHSV.s));

	function handleChange(next: Tuple2D) {
		const s = next.x;
		const v = 100 - next.y;

		setX(next.x);

		setHSV((prev: HSVAData) => {
			if (Math.round(prev.s) === Math.round(s) && Math.round(prev.v) === Math.round(v))
				return prev;

			return { ...prev, s, v };
		});
	}

	return (
		<Slider2D.Root
			{...rest}
			value = {{ x: hsv.s == 0 ? x : Math.round(hsv.s), y: Math.round(100 - hsv.v) }}
			onValueChange = {handleChange}
			style = {{
				...style,
				background:
					`linear-gradient(to top, black, transparent),
					linear-gradient(to right, white, transparent),
					hsl(${hsv.h}, 100%, 50%)`
			}}
			yRange = {HSLAColor.CHANNEL_RANGES.l}
			xRange = {HSLAColor.CHANNEL_RANGES.s}
			step = {{ x: 1, y: 1 }}
		>
			{children}
		</Slider2D.Root>
	);
}