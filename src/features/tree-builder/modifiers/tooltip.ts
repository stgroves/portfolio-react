import {ModifierRegistryItem} from "../../../interfaces/registries";
import {TooltipModifier} from "../../../interfaces/json/modifiers/general-modifiers";

export const TooltipRegistryItem: ModifierRegistryItem<TooltipModifier> = {
	process(modifier: TooltipModifier, properties: any): any {
		properties.title = modifier.value;
		return properties;
	}
}