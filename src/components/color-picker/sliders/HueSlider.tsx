import {ColorSlider} from "../../color-slider";
import {SliderRoot} from "@base-ui/react";
import {LinearGradient} from "../../../classes/colors/gradients/linear-gradient";

export interface HueSliderProps extends Omit<SliderRoot.Props, "defaultValue" | "onValueChange"> {
	onValueChange: (value: number) => void;
	defaultValue: number
}

export function HueSlider(props: HueSliderProps) {
	const {orientation = "horizontal", children, defaultValue, onValueChange,  ...rest} = props;
	let direction: number;

	switch (orientation) {
		case "vertical":
			direction = 0;
			break;
		case "horizontal":
			direction = 90;
			break;
	}

	return (
		<ColorSlider.Root
			{...rest}
			value={defaultValue}
			onValueChange={(value: number | readonly number[]) => {
				onValueChange?.(Array.isArray(value) ? value[0] : value);
			}}
			background={LinearGradient.getHueGradient(direction)}
			min={0}
			max={359}
			step={1}
			orientation={orientation}
		>
			{children}
		</ColorSlider.Root>
	);
}