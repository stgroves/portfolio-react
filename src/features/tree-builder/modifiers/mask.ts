import {ModifierRegistryItem} from "../../../interfaces/registries";
import {MaskModifier} from "../../../interfaces/json/modifiers/text-types/text-modifiers";

export const MaskRegistryItem: ModifierRegistryItem<MaskModifier> = {
	process(modifier: MaskModifier, properties: any): any {

		return properties;
	}
}