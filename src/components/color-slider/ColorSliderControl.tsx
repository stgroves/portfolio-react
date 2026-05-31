import {Slider, SliderControlProps} from "@base-ui/react";

export function ColorSliderControl(props: SliderControlProps) {
	const { children, ...rest } = props;

	return (
		<Slider.Control {...rest}>
			{children}
		</Slider.Control>
	)
}