export class Stack<T> {
	private items: T[];

	constructor() {	this.items = []; }

	push: (element: T) => void = (element: T): void => { this.items.push(element) };

	pop: () => T | undefined = (): T | undefined => this.items.pop();

	peek: () => T | undefined = (): T | undefined => this.items[this.items.length - 1];

	isEmpty: () => boolean = (): boolean => this.items.length === 0;

	size: () => number = (): number => this.items.length;

	clear: () => void = (): void => { this.items = [] };

	print: () => void = (): void => console.log(this.items);
}