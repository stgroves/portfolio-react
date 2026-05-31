export function compose(strings: TemplateStringsArray, ...exps: (RegExp|string)[]): (flags?: string) => RegExp {
	const pattern: string = strings.reduce(
		(acc: string, s: string, i: number): string =>
			`${acc}${s}${typeof exps[i] == "string" ? exps[i] : exps[i]?.source ?? ""}`,
		""
	);

	return (flags = ""): RegExp => new RegExp(pattern, flags);
}