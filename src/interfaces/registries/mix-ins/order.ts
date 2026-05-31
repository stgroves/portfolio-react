import {OperatorTypes} from "../../../features/tree-builder";

export interface OrderMixin<TType> {
	[OperatorTypes.GreaterThan]: (a: TType, b: TType) => boolean;
	[OperatorTypes.GreaterThanOrEqual]: (a: TType, b: TType) => boolean;
	[OperatorTypes.LessThan]: (a: TType, b: TType) => boolean;
	[OperatorTypes.LessThanOrEqual]: (a: TType, b: TType) => boolean;
}