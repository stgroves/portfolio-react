import {
	applyLockableSet,
	ElementRegistryItem
} from "../../../interfaces/registries";
import {JSONTextInputNode} from "../../../interfaces/json/elements/text-input";
import {TextModifiers} from "../../../interfaces/json/modifiers/text-types/text-modifiers";
import {GeneralModifiers} from "../../../interfaces/json/modifiers/general-modifiers";
import {Input} from "@base-ui/react";
import {UIState} from "../../../App";
import {applyModifiers, ModifierType} from "../index";
import {createElement, ReactNode} from "react";
import {RenderableResolvedNode} from "../../../interfaces/resolved/renderable";
import {SingleValue} from "../../../interfaces/mix-ins/single-value";
import {ParentMixin, ResolvedState} from "../../../interfaces/resolved";

const { Required, Placeholder, ReadOnly, Disabled, Tooltip } = GeneralModifiers;

const modifierSet: ModifierType[] = [
	...Object.values(TextModifiers),
	Required,
	Placeholder,
	ReadOnly,
	Disabled,
	Tooltip
];

type TextInputResolvedNode = RenderableResolvedNode<
	JSONTextInputNode,
	ResolvedState<JSONTextInputNode> & SingleValue<string>
> & ParentMixin;

export const TextInputRegistryItem: ElementRegistryItem<JSONTextInputNode, TextInputResolvedNode> = {
	applicableModifiers: applyLockableSet(modifierSet),
	resolve: (parent: any, node: JSONTextInputNode): TextInputResolvedNode => {
		const applyProperties = (): Input.Props => {
			let properties: Input.Props = {
				value: resolved.state.value,
				style: node.style,
				className: node.className,
				onValueChange(newValue: string): void {
					resolved.state.value = newValue;
					UIState.rerender();
				}
			};

			properties = applyModifiers(node, properties, TextInputRegistryItem.applicableModifiers);

			return properties;
		}

		const resolved: TextInputResolvedNode = {
			template: {
				component: Input,
				captureProperties(): void {	resolved.state.properties = applyProperties(); }
			},
			state: {
				id: node.id,
				jsonNode: node,
				properties: {},
				value: ""
			},
			parent
		};

		return resolved;
	},
	render(node: TextInputResolvedNode): ReactNode {
		node.template.captureProperties?.();
		return createElement(node.template.component, node.state.properties);
	},
	save: () => {}
} as const;

TextInputRegistryItem.applicableModifiers.lockDefaults();