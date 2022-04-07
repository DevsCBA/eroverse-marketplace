import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { profileStartLoading } from '../../actions/profile';
import { ProfileResumeScreen } from './ProfileResumeScreen';
import { ProfileRewards } from './ProfileRewards';

export const ProfileScreen = () => {
	const { rewards, history } = useSelector((state) => state.profile);
	const { wallet } = useSelector((state) => state.wallet);
	const { t } = useTranslation(['profile']);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(profileStartLoading(wallet));
	}, [wallet,dispatch]);

	return (
		<>
			<ProfileResumeScreen rewards={rewards} translate={t} />
			<ProfileRewards translate={t} history={ history } />
		</>
	);
};
