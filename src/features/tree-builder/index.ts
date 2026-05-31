import {JSONNode} from "../../interfaces/json/node";
import {JSONTextNode} from "../../interfaces/json/text-node";
import {ComponentType, ForwardRefExoticComponent, JSX, ReactNode} from "react";
import {JSONContainerNode} from "../../interfaces/json/container";
import {isLayout, LayoutRegistry} from "./layout";
import {ResolvedNode} from "../../interfaces/resolved";

export * from "./layout";
export * from "./elements";
export * from "./modifiers";
export * from "./events";
export * from "./resolved-registry";

type ReactComponent<Props> = ComponentType<Props> | ForwardRefExoticComponent<Props>;

type Intrinsic = keyof JSX.IntrinsicElements;

export type AnyComponent<Props = any> = ReactComponent<Props> | Intrinsic;

type NodeValidator<T extends JSONNode> = (node: JSONNode) => node is T;

export function validateNode<T extends JSONNode>(node: JSONNode, validator: NodeValidator<T>): asserts node is T {
	if (!validator(node))
		throw new Error("Invalid Node type");
}

export function prepareChildren<T extends JSONContainerNode>(parent: any, node: T): any[] {
	return node.children.map((child: JSONNode): ReactNode => {
		if (TextNode.isTextNode(child))
			return child.value;

		if (!isLayout(child.type))
			throw new Error("Invalid Layout type");

		return LayoutRegistry.current.get(child.type).resolve(parent, child);
	})
}

export const TEXT_NODE = "text-node";

export const TextNode = {
	isTextNode: (node: JSONNode): node is JSONTextNode => node.type == TEXT_NODE,
};