import {ElementTypes} from "../../../../features/tree-builder";
import {BaseUIMixin} from "../../mix-ins/base-ui";
import {JSONStylableNode} from "../../stylable";

export interface JSONNumberFieldInputNode
	extends JSONStylableNode<typeof ElementTypes.NumberFieldInput>, BaseUIMixin {}