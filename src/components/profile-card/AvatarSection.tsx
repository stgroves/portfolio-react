import styles from './ProfileCard.module.css'
import {Avatar} from '@base-ui/react/avatar';
import defaultProfile from '../../assets/default-profile.png';

export interface AvatarData {
	avatarURL?: string;
	badge?: string;
	fallback: string;
	delay?: number;
}

export interface AvatarSectionProps {
	data:	AvatarData;
	size: string;
}

export function AvatarSection(
	{
		data,
		size
	}: AvatarSectionProps
) {
	const avatarURL = data.avatarURL ?? defaultProfile;
	const badge = data.badge ?? "";
	const delay = data.delay ?? 600;

	return (
		<figure className={styles.AvatarBorder}>
			<Avatar.Root>
				<Avatar.Image src={avatarURL} width={size} height={size} className={styles.Avatar}/>
				<Avatar.Fallback delay={delay}>{data.fallback}</Avatar.Fallback>
			</Avatar.Root>
			<figcaption className={styles.AvatarBadge}>{badge}</figcaption>
		</figure>
	);
}