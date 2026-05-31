import {JSONContainerNode} from "../../container";
import {ElementTypes} from "../../../../features/tree-builder";
import {ModifiableMixin} from "../../mix-ins/modifiable";
import {EventMixin} from "../../mix-ins/event";
import {BaseUIMixin} from "../../mix-ins/base-ui";
import {SingleValue} from "../../../mix-ins/single-value";

export interface JSONNumberFieldRootNode
	extends JSONContainerNode<typeof ElementTypes.NumberFieldRoot>,
		ModifiableMixin,
		EventMixin,
		SingleValue<number>,
		BaseUIMixin {
}