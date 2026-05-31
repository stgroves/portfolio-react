import styles from './ProfileCard.module.css';
import {useMemo} from 'react';

export interface SkillsSectionProps {
	header?: string;
	skills?: string[];
}

export function SkillsSection(
	{
		header = "Skills",
		skills
	}: SkillsSectionProps
) {
	skills ??= ["Front End Development", "UI/UX", "HTML", "CSS", "Javascript"];

	const sortedSkills = useMemo(() => [...skills].sort(), [skills]);

	return (
		<section className={styles.SkillsArea}>
			<span className={`${styles.H4} ${styles.SkillsHeader}`}>{header}</span>
			<ul className={styles.SkillsGroup}>
				{sortedSkills.map(skill => (<li key={skill} className={styles.SkillTag}>{skill}</li>))}
			</ul>
		</section>
	);
}