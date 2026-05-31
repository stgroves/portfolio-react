import {Stack} from '../stack/Stack.js';
import useResizeObserver from '../../utilities/useResizeObserver.js';
import {CSSProperties, useRef} from 'react';
import {InfoSection} from './InfoSection';
import {SkillsSection, SkillsSectionProps} from './SkillsSection.js';
import {SocialLinkData, SocialsSection} from './SocialsSection.js';
import styles from './ProfileCard.module.css';
import {AvatarData, AvatarSection} from './AvatarSection';

export interface ProfileCardConfig {
	avatarSize?: number;
	avatarBorderPadding?: number;
	skillsAreaWidth?: number;
	columnGap?: number;
	cardPadding?: number;
}

export interface ProfileCardProps {
	name?: string;
	pronouns?: string;
	address?: string;
	profession?: string;
	skills?: SkillsSectionProps;
	avatar?: AvatarData;
	socialLinks?: SocialLinkData[];
	config?: ProfileCardConfig;
}

export function ProfileCard(
	{
		name = "John Doe",
		pronouns,
		address,
		profession,
		skills,
		avatar,
		socialLinks,
		config
	}: ProfileCardProps
) {
	const avatarSize = config?.avatarSize ?? 200;
	const avatarBorderPadding = config?.avatarBorderPadding ?? 5;
	const skillsAreaWidth = config?.skillsAreaWidth ?? 250;
	const columnGap = config?.columnGap ?? 20;
	const cardPadding = config?.cardPadding ?? 10;
	const cardWidth = skillsAreaWidth + columnGap + avatarSize + (avatarBorderPadding * 2);

	const card = useRef<HTMLDivElement>(null);

	useResizeObserver(card, rect => {
		card?.current?.setAttribute(
			"data-narrow",
			String(rect.width < cardWidth + (cardPadding * 2) ? 1 : 0)
		);
	}, true);

	const finalAvatar: AvatarData = avatar ?? {fallback: ""};

	if (avatar?.fallback == "")
		finalAvatar.fallback =
			name.split("").filter(character => character.toLowerCase() != character).join("")

	return (
		<div ref={card} className={styles.Card} style={
			{
				'--card-padding': `${cardPadding}px`,
				'--card-width': `${cardWidth}px`,
				'--column-gap': `${columnGap}px`,
				'--skills-area-width': `${skillsAreaWidth}px`,
				'--avatar-border-padding': `${avatarBorderPadding}px`
			} as CSSProperties
		}>
			<Stack orientation={"horizontal"} className={styles.CardInner}>
				<Stack className={styles.Column} data-column="0">
					<InfoSection name={name} pronouns={pronouns} address={address} profession={profession}/>
					<SkillsSection {...skills}/>
				</Stack>
				<Stack className={styles.Column} data-column="1">
					<AvatarSection data={finalAvatar} size={`${avatarSize - avatarBorderPadding}px`} />
					<SocialsSection socialLinks={socialLinks}/>
				</Stack>
			</Stack>
		</div>
	);
}