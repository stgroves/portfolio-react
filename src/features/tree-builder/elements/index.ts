import {ComponentProps} from "react";
import {AnyComponent, ModifierRegistry} from "../index";
import {ModifiableMixin} from "../../../interfaces/json/mix-ins/modifiable";
import {Modifier} from "../../../interfaces/json/modifiers/general-modifiers";
import {isModifier, ModifierType} from "../modifiers";
import {LockableSet} from "../../../classes/lockable-set";

export * from "./registry";
export * from "./label";
export * from "./text-input";
export * from "./types";

export function applyModifiers<TNodeType extends ModifiableMixin>(
	node: TNodeType,
	properties: ComponentProps<AnyComponent>,
	applicableModifiers: LockableSet<ModifierType>
): ComponentProps<AnyComponent> {
	node.modifiers?.forEach((modifier: Modifier): void => {
		if (!isModifier(modifier.type) || !applicableModifiers.has(modifier.type))
			throw new Error("Invalid Modifier type");

		properties = ModifierRegistry.current.get(modifier.type).process(modifier, properties)
	});

	return properties;
}