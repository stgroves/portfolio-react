import {GradientTypes} from "../interfaces/values/colors/gradient";
import {GradientNode, parse, stringify} from 'gradient-parser';
import {LinearGradient} from "../classes/colors/gradients/linear-gradient";
import {compose} from "./regex";

export const parseGradient: (input: string) => void = (input: string): void => {
	const tree: GradientNode[] = parse(input);

	const root: GradientNode = tree[0];
}

const NEW_LINE: string = `\\n\\r\\f`;
const HEX_DIGIT: string = `0-9A-Fa-f`;

const tokens: Record<string, RegExp> = {
	comment: /\/\*(?:(?!\*\/).)*\*\//s,
	newLine: compose`[${NEW_LINE}]|\\r\\n`(),
	hexDigit: compose`[${HEX_DIGIT}]`(),
	numberToken: compose`[+-]?\\d*.?\\d+(?:[eE][+-]?\\d+)?`(),
	cdoToken: /<!--/,
	cdcToken: /-->/,
}

tokens.whitespace = compose`[ \\t]|${tokens.newLine}`();
tokens.escape =
	compose`\\\\(?:[^${NEW_LINE}${HEX_DIGIT}]|${tokens.hexDigit}{1,6}(?:${tokens.whitespace})?)`();
tokens.whitespaceToken = compose`(?:${tokens.whitespace})+`();
tokens["ws*Token"] = compose`(?:${tokens.whitespaceToken})*`();

const NOT_ASCII: string = `(?:(?:[a-zA-Z_\\-0-9]|[^\\x00-\\x7F])|${tokens.escape})`;

const identStart = `(?:--|-?(?:(?:[a-zA-Z_]|[^\\x00-\\x7F])|${tokens.escape}))`;
const identEnd = `${NOT_ASCII}*`;

tokens.identToken =	compose`${identStart}${identEnd}`();
tokens.functionsToken = compose`${tokens.identToken}\\(`();
tokens.atKeywordToken = compose`@${tokens.identToken}`();
tokens.hashToken = compose`#${NOT_ASCII}+`();

const generateStringInternals:  (char: string) => string = (char: string): string =>
	`(?:[^${NEW_LINE}${char}\\\\]|${tokens.escape}|\\\\${tokens.newLine})*`;

tokens.stringToken = compose`"${generateStringInternals('"')}"|'${generateStringInternals("'")}'`();
tokens.dimensionToken = compose`${tokens.numberToken}${tokens.identToken}`();
tokens.percentageToken = compose`${tokens.numberToken}%`();

const unicodeA = `[${HEX_DIGIT}]{1,6}(?:-[${HEX_DIGIT}]{1,6})?`;
const unicodeB = `[${HEX_DIGIT}]{0,5}\\?{1,6}`;

tokens.unicodeRangeToken = compose`[uU]\\+(?:${unicodeA}|${unicodeB})`();