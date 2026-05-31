import {JSONNode} from "../../json/node";
import {ModifierType} from "../../../features/tree-builder";
import {LockableSet} from "../../../classes/lockable-set";
import {LockableEntry} from "../../../classes/lockable";
import {ResolvedNode} from "../../resolved";
import {ResolvedRegistryItem} from "./index";

export interface ElementRegistryItem<TNodeType extends JSONNode, TReturn extends ResolvedNode<TNodeType>>
	extends ResolvedRegistryItem<TNodeType, TReturn> {
	applicableModifiers: LockableSet<ModifierType>;
	save: Function;
}

export const applyLockableSet: (modifierSet: ModifierType[]) => LockableSet<ModifierType> =
	(modifierSet: ModifierType[]): LockableSet<ModifierType> => new LockableSet(
		modifierSet.map((value: ModifierType): LockableEntry<ModifierType> => ({ value }))
	)