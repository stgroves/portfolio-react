import {JSONBase} from "../../json-base";
import {ColorDataTypes} from "../../../interfaces/values/colors/color";

export abstract class BaseColor<T extends ColorDataTypes> extends JSONBase {
	protected constructor(type: string, color: T, validator: (color: T) => void) {
		super(type);

		validator(color);
	}

	public abstract toString(): string;

	public abstract toCssString(): string;
}