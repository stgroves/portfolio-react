import {OperatorTypes} from "../../../features/tree-builder";

export interface EqualMixin<TType> {
	[OperatorTypes.Equal]: (a: TType, b: TType) => boolean;
	[OperatorTypes.NotEqual]: (a: TType, b: TType) => boolean;
}