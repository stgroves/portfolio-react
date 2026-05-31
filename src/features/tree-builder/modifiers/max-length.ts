import {ModifierRegistryItem} from "../../../interfaces/registries";
import {MaxLengthModifier} from "../../../interfaces/json/modifiers/text-types/text-modifiers";

export const MaxLengthRegistryItem: ModifierRegistryItem<MaxLengthModifier> = {
	process(modifier: MaxLengthModifier, properties: any): any {
		properties.maxLength = modifier.value;
		return properties;
	}
}