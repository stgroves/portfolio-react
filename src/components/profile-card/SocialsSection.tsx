import {Stack} from '../stack/Stack.js';
import styles from './ProfileCard.module.css';
import {useMemo} from 'react';

export interface SocialLinkData {
	name: string;
	faClasses: string;
	url: string;
}

export interface SocialsSectionProps {
	socialLinks?: SocialLinkData[];
}

export function SocialsSection({socialLinks}: SocialsSectionProps) {
	const defaultLinks: SocialLinkData[] = [
		{
			"name": "Email",
			"faClasses": "fa-solid fa-envelope",
			"url": ""
		},
		{
			"name": "Facebook",
			"faClasses": "fa-brands fa-facebook",
			"url": ""
		},
		{
			"name": "GitHub",
			"faClasses": "fa-brands fa-github",
			"url": ""
		},
		{
			"name": "LinkedIn",
			"faClasses": "fa-brands fa-linkedin",
			"url": ""
		},
		{
			"name": "X",
			"faClasses": "fa-brands fa-x-twitter",
			"url": ""
		}
	];

	const links = socialLinks ?? defaultLinks;

	const sortedSocials = useMemo(
		() =>
			[...links].sort((a, b) => a.name.localeCompare(b.name)),
		[links]
	);

	return (
		<Stack orientation={"horizontal"} className={styles.Socials}>
			{sortedSocials.map(
				link =>
					<a key={link.name} href={link.url} title={link.name}><i className={link.faClasses}></i></a>
			)}
		</Stack>
	);
}