import { ANALYTICS_SECRET, ANALYTICS_USER } from '$env/static/private';
import { PUBLIC_ANALYTICS_WEB_ID, PUBLIC_ANALYTICS_ENDPOINT } from '$env/static/public';

import { getClient } from '@umami/api-client';

export const analytics = getClient({
	userId: ANALYTICS_USER,
	secret: ANALYTICS_SECRET,
	apiEndpoint: PUBLIC_ANALYTICS_ENDPOINT + '/api/'
});

export const getActive = async () => {
	console.log(await analytics.getMe());
	console.log(await analytics.getWebsiteActive(PUBLIC_ANALYTICS_WEB_ID));
};
