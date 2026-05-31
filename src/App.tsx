import './App.css';
import {Routes, Route} from "react-router-dom";
import {Slider2D} from "./components/slider-2d";
import React, {useRef, useState} from "react";
import {ColorSlider, ColorSliderThumb, ColorSliderTrack} from "./components/color-slider";
import {HueSlider} from "./components/color-picker/sliders/HueSlider";
import {AlphaSlider} from "./components/color-picker/sliders/AlphaSlider";
import {Stack} from "./components/stack/Stack";
import {ColorPickerEyeDropper} from "./components/color-picker/EyeDropper";
import {ColorPreview} from "./components/color-picker/ColorPreview";
import {HSLAData} from "./interfaces/values/colors/color";
import {BrightnessSquare} from "./components/color-picker/sliders/BrightnessSquare";
import {TransparencyBackground} from "./components/color-picker/TransparencyBackground";
import {SerializationManager} from "./features/serialization-manager";
import {JSONTree} from "./interfaces/json/tree";
import {ResolvedRegistry, ResolvedRegistryClass} from "./features/tree-builder";

export const UIState = {
	rerender: () => {}
};

function App() {
	const treeRef = useRef<JSONTree | null>(null);
	const [resolvedElements, setResolvedElements] = useState<ResolvedRegistryClass>(ResolvedRegistry.current);
	const [, forceUpdate] = React.useReducer(x => x + 1, 0);
	UIState.rerender = forceUpdate;

	const [color, setColor] = React.useState<HSLAData>({ h: 100, s: 50, l: 50, a: 1 });

	React.useEffect(() => {
		let isCurrentMount = true; //Counteract STRICT

		SerializationManager.loadFromJSONFile("global", "/file").then(data => {
			if (!data || !isCurrentMount)
				return;

			treeRef.current = data;
			SerializationManager.resolveElements(data);
			setResolvedElements(ResolvedRegistry.current);
			forceUpdate();
		});

		return (): void => {
			isCurrentMount = false;
			ResolvedRegistry.current.reset();
		};
	}, []);

	const [found, element] = resolvedElements?.tryGet("065ac03a-a1ab-4b63-8bc0-42fe9d65e5b3");

	if (found)
		console.log(element.value);

	return treeRef.current && SerializationManager.renderNode(treeRef.current.layoutTree);

	return (
		<>
			<Stack style={{ gap: '10px' }}>
				<Stack orientation={"horizontal"} style={{ gap: '5px' }}>
					<BrightnessSquare
						value={color}
						onValueChange={setColor}
						style={{ width: '200px', height: '200px', border: "1px solid black" }}
					>
						<Slider2D.Control style={{ width: '100%', height: '100%' }}>
							<Slider2D.Surface style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
								<Slider2D.Thumb style={
									{
										width: '10px',
										height: '10px',
										border: "2px solid gray",
										borderRadius: '50%',
										backgroundColor: "white"
									}
								}/>
							</Slider2D.Surface>
						</Slider2D.Control>
					</BrightnessSquare>
					<HueSlider
						style={{ width: '20px', height: '200px', border: "1px solid black" }}
						defaultValue={color.h}
						onValueChange={(value: number) => setColor({ h: value, s: color.s, l: color.l, a: color.a })}
						orientation={"vertical"}
					>
						<ColorSlider.Control style={{ width: '100%', height: '100%' }}>
							<ColorSliderTrack style={{ width: '100%', height: '100%' }}>
								<ColorSliderThumb style={{ width: '10px', height: '10px', border: "2px solid gray" }}/>
							</ColorSliderTrack>
						</ColorSlider.Control>
					</HueSlider>
					<AlphaSlider
						style={{ width: '20px', height: '200px', border: "1px solid black" }}
						value={color}
						onValueChange={setColor}
						orientation={"vertical"}
					>
						<ColorSlider.Control style={{ width: '100%', height: '100%' }}>
							<TransparencyBackground style={{ width: '100%', height: '100%' }}>
								<ColorSliderTrack style={{ width: '100%', height: '100%' }}>
									<ColorSliderThumb style={{ width: '10px', height: '10px', border: "2px solid gray" }}/>
								</ColorSliderTrack>
							</TransparencyBackground>
						</ColorSlider.Control>
					</AlphaSlider>
				</Stack>
				<ColorPreview
					cellSize={{ width: '10px', height: '10px' }}
					style={{ width: '254px', height: '50px', border: "1px solid black" }}
					color={`hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a})`}
				/>
			</Stack>
			<ColorPickerEyeDropper defaultValue={color} onValueChange={setColor}
			                       style={{ borderRadius: "50%", color: "black" }}/>
			<Routes>
				<Route path={"/"}/>
			</Routes>
		</>
	);
}

export default App;
