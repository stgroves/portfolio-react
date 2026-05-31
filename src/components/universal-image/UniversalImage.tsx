export function detectType(src: string, alt: string = ""): UniversalImageSource {
	// Emoji
	if (/^\p{Extended_Pictographic}+$/u.test(src)) {
		return { type: "emoji", char: src };
	}

	// FontAwesome
	if (src.startsWith("fa-")) {
		return { type: "icon", className: src };
	}

	// SVG
	if (src.endsWith(".svg")) {
		return { type: "svg", src, alt };
	}

	// Bitmap
	if (/\.(png|jpg|jpeg|bmp|webp)$/i.test(src)) {
		return { type: "bitmap", src, alt };
	}

	throw new Error("Unknown image type");
}

type UniversalImageSource =
	| { type: "bitmap"; src: string; alt: string }
	| { type: "svg"; src: string; alt: string }
	| { type: "icon"; className: string }
	| { type: "emoji"; char: string };

export function UniversalImage(props: UniversalImageSource) {
	switch (props.type) {
		case "bitmap":
			return <img src={props.src} alt={props.alt}/>;

		case "svg":
			return <img src={props.src} alt={props.alt}/>;

		case "icon":
			return <i className={props.className} />;

		case "emoji":
			return <span>{props.char}</span>;

		default: {
			throw new Error("Unrecognized image");
		}
	}
}