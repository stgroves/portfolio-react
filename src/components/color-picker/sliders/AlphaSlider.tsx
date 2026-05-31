import {ColorSliderRoot} from "../../color-slider";
import {useEffect, useState} from "react";
import {SliderRoot} from "@base-ui/react";
import {HSLAData} from "../../../interfaces/values/colors/color";
import {LinearGradient} from "../../../classes/colors/gradients/linear-gradient";

export interface AlphaSliderProps
	extends Omit<SliderRoot.Props, "defaultValue" | "onValueChange" | "min" | "max" | "step" | "value"> {
	onValueChange?: (value: HSLAData) => void;
	defaultValue?: HSLAData
	value?: HSLAData
}

export function AlphaSlider(props: AlphaSliderProps) {
	const {orientation = "horizontal", children, defaultValue, value, onValueChange,  ...rest} = props;
	let direction: number;

	switch (orientation) {
		case "vertical":
			direction = 0;
			break;
		case "horizontal":
			direction = 90;
			break;
	}

	const [rawValue, setRawValue] = useState<number | readonly number[]>(defaultValue?.a ?? 0);

	useEffect(() => {
		const a = Array.isArray(rawValue) ? rawValue[0] : rawValue;
		//onValueChange?.({h: defaultValue.h, s: defaultValue.s, l: defaultValue.l, a});
	}, [rawValue]);

	return (
		<ColorSliderRoot
			{...rest}
			value={rawValue}
			onValueChange={setRawValue}
			background={LinearGradient.getAlphaGradient(value!, direction)}
			orientation={orientation}
		>
			{children}
		</ColorSliderRoot>
	);
}