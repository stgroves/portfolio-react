import {ModifierRegistryItem} from "../../../interfaces/registries";
import {MinLengthModifier} from "../../../interfaces/json/modifiers/text-types/text-modifiers";

export const MinLengthRegistryItem: ModifierRegistryItem<MinLengthModifier> = {
	process(modifier: MinLengthModifier, properties: any): any {
		properties.minLength = modifier.value;
		return properties;
	}
}