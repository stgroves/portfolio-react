import {JSONTree} from "../interfaces/json/tree";
import {JSONNode} from "../interfaces/json/node";
import {ElementRegistry, isElement, isLayout, LayoutRegistry, ResolvedRegistry} from "./tree-builder";
import {ReactNode} from "react";

const API =	import.meta.env.DEV ? "http://localhost:3001/api" : "/api";

export class SerializationManager {
	static async saveToJSONFile(key: string, data: any): Promise<void> {
		await fetch(`${API}/save`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ key, data }),
		});
	}

	static async loadFromJSONFile(key: string, path: string): Promise<any> {
		const res = await fetch(`${API}/load/${key}?${path}`);
		return res.json();
	}

	static resolveElements(tree: JSONTree) {
		if (!tree.hasOwnProperty("layoutTree") || !tree.hasOwnProperty("elementRegistry"))
			throw new Error("Invalid Tree file");

		const elementRegistry = tree.elementRegistry;

		for (const key in elementRegistry) {
			const value: JSONNode = elementRegistry[key];

			if (!isElement(value.type))
				throw new Error("Invalid Element type");

			ResolvedRegistry.current.add(key, ElementRegistry.current.get(value.type).resolve(value));
		}
	}

	static renderNode(node: JSONNode): ReactNode {
		if (!isLayout(node.type))
			throw new Error("Invalid Layout type");

		return LayoutRegistry.current.get(node.type).render(node);
	}
}