import {Modifier} from "../json/modifiers/general-modifiers";

export interface ModifierRegistryItem<TModifier extends Modifier> {
	process: (modifier: TModifier, properties: any) => any;
}