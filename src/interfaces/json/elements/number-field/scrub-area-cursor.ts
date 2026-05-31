import {JSONStylableNode} from "../../stylable";
import {ElementTypes} from "../../../../features/tree-builder";
import {BaseUIMixin} from "../../mix-ins/base-ui";

export interface JSONNumberFieldScrubAreaCursorNode
	extends JSONStylableNode<typeof ElementTypes.NumberFieldScrubAreaCursor>, BaseUIMixin {
}