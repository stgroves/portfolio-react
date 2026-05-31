import {Button, ButtonProps} from "@base-ui/react";
import React from "react";
import {parseToRGBA, rgbaToHSLA} from "../../utilities/color";
import {HSLAData} from "../../interfaces/values/colors/color";

export interface ColorPickerEyeDropperProps extends Omit<ButtonProps, "children" | "onClick"> {
	defaultValue: HSLAData,
	onValueChange?: (value: HSLAData) => void;
}

export function ColorPickerEyeDropper(props: ColorPickerEyeDropperProps) {
	const {defaultValue, onValueChange, ...rest} = props;

	if (!("EyeDropper" in window))
		return null;

	function handleClick() {
		const pickFromScreen = async (): Promise<HSLAData | null> => {
			try {
				const eyeDropper = new (window as any).EyeDropper();
				const result = await eyeDropper.open();
				return rgbaToHSLA(parseToRGBA(result.sRGBHex));
			} catch {
				return null;
			}
		};

		pickFromScreen().then(result => {
			if (result == null)
				return;

			onValueChange?.(result);
		})
	}

	return (
		<Button {...rest} onClick={handleClick}>
			<i className="fa-solid fa-eye-dropper" style={{color: "inherit"}}></i>
		</Button>
	);
}