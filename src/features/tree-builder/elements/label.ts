import {
	applyLockableSet,
	ElementRegistryItem
} from "../../../interfaces/registries";
import {JSONNode} from "../../../interfaces/json/node";
import {JSONLabelNode} from "../../../interfaces/json/elements/label";
import {createElement, JSX, ReactNode} from "react";
import {prepareChildren} from "../index";
import {ModifierType} from "../modifiers";
import {ElementTypes} from "./types";
import {ChildrenMixin} from "../../../interfaces/resolved";
import {RenderableResolvedNode} from "../../../interfaces/resolved";

const modifierSet: ModifierType[] = [];

function isLabelNode(node: JSONNode): node is JSONLabelNode {
	return node.type === ElementTypes.Label;
}

export const LabelRegistryItem: ElementRegistryItem<
	JSONLabelNode,
	RenderableResolvedNode<JSONLabelNode> & ChildrenMixin
> = {
	applicableModifiers: applyLockableSet(modifierSet),
	resolve(node: JSONLabelNode): RenderableResolvedNode<JSONLabelNode> & ChildrenMixin {
		const resolved: RenderableResolvedNode<JSONLabelNode> & ChildrenMixin = {
			template: {
				component: "label" as keyof JSX.IntrinsicElements,
				render: (): ReactNode => {
					resolved.state.properties = { style: node.style, className: node.className };
					return createElement(resolved.template.component, )
				}
			},
			state: {
				id: node.id,
				jsonNode: node,
				properties: {},
			},
			children: []
		}

		resolved.children = prepareChildren(resolved, node)

		return resolved;
	},
	save: () => {}
} as const;

LabelRegistryItem.applicableModifiers.lockDefaults();