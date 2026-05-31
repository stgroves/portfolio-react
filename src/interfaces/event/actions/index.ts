export * from "./basic";
export * from "./conditional";
export * from "./sequential";

export interface EventAction<TEventType extends string = string> {
	type: TEventType;
}