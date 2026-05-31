import {JSONValue} from "../../interfaces/values/json-base";
import {LinearRange} from "./linear-range";

export class DateRange extends LinearRange<Date> {
	static ID = 'date-range';

	/*static fromJSON(json: JSONSerializableObject): DateRange {
		if (json.type !== DateRange.ID || json.min === undefined || json.max === undefined)
			throw new Error('Invalid date range');

		return new DateRange({min: json.min, max: json.max});
	}*/

	constructor({min = new Date(1900, 0, 1), max}: {min?: Date, max: Date}) {
		super(DateRange.ID, min, max, (a, b) => a.getTime() - b.getTime());
	}

	override getRange = (): number => this.max.getTime() - this.min.getTime();

	protected override applyToJSONObject = (obj: { [key: string]: JSONValue }) => {
		obj.min = this.min.toJSON();
		obj.max = this.max.toJSON();
	}
}