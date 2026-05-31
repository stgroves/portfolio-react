import {JSONContainerNode} from "../../container";
import {BaseUIMixin} from "../../mix-ins/base-ui";
import {OrientationMixin} from "../../mix-ins/orientation";
import {ScrubAreaMixin} from "../../mix-ins/scrub-area";
import {ElementTypes} from "../../../../features/tree-builder";

export interface JSONNumberFieldScrubAreaNode
	extends JSONContainerNode<typeof ElementTypes.NumberFieldScrubArea>,
		BaseUIMixin,
		OrientationMixin,
		ScrubAreaMixin {
}