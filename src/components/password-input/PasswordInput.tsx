import {Input, Meter} from "@base-ui/react";
import styles from "./PasswordInput.module.css"
import {Stack} from "../stack/Stack";

export function PasswordInput() {
	const value = 10;
	const color = ["red", "gold", "darkgreen"];
	const sections = Math.floor(100 / color.length);
	const index = Math.min(
		color.length - 1,
		Math.floor(value / sections)
	);

	return (
		<Stack orientation={"vertical"} style={{gap: "10px"}}>
			<Input type="password"/>
			<Meter.Root className={styles.Meter} value={(index + 1) * sections}>
				<Meter.Track className={styles.Track}>
					<Meter.Indicator className={styles.Indicator} style={{backgroundColor: color[index]}} />
				</Meter.Track>
			</Meter.Root>
		</Stack>
	)
}