import { ANALYTICS_SECRET, ANALYTICS_USER, ANALYTICS_ENDPOINT } from '$env/static/private';
import { PUBLIC_ANALYTICS_WEB_ID } from '$env/static/public';

import { getClient } from '@umami/api-client';

export const analytics = getClient({
	userId: ANALYTICS_USER,
	secret: ANALYTICS_SECRET,
	apiEndpoint: ANALYTICS_ENDPOINT
});

export const getActive = async () => {
	console.log(await analytics.getMe());
	console.log(await analytics.getWebsiteActive(PUBLIC_ANALYTICS_WEB_ID));
};
