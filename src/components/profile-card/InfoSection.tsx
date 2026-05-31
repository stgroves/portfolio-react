import styles from './ProfileCard.module.css';
import {Stack} from "../stack/Stack";

export interface InfoSectionProps {
	name: string,
	pronouns?: string,
	address?: string,
	profession?: string
}

export function InfoSection(
	{
		name,
		pronouns = "He/Him",
		address = "Example City",
		profession = "Professional"
	}: InfoSectionProps
) {
	return (
		<Stack className={styles.Info}>
			<div> {/*Info section*/}
				<Stack orientation={"horizontal"} className={[styles.Identity, styles.H0].join(' ')}>
					<span className={styles.Name}>{name}</span>
					<span className={styles.Pronoun}>{`(${pronouns})`}</span>
				</Stack>
				<span className={`${styles.Address} ${styles.H1}`}>{address}</span>
			</div>
			<div>
				<span className={styles.H0}>{profession}</span>
			</div>
		</Stack>
	);
}