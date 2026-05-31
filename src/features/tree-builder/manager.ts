import {JSONTree} from "../../interfaces/json/tree";
import {ResolvedTree} from "../../interfaces/resolved";
import {LayoutRegistry} from "./layout";

export function resolveTree(tree: JSONTree): ResolvedTree {
	const root = LayoutRegistry.current.get(tree.layoutTree.type).resolve(null, tree.layoutTree);

	return {
		root
	}
}