import {JSONContainerNode} from "../../container";
import {ElementTypes} from "../../../../features/tree-builder";
import {BaseUIMixin} from "../../mix-ins/base-ui";

export interface JSONNumberFieldGroupNode
	extends JSONContainerNode<typeof ElementTypes.NumberFieldGroup>, BaseUIMixin {
}