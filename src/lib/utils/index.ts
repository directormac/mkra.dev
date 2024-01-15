export * from './ui';
export * from './matchMedia';

export const routeIdTransformer = (route: string): string => {
	const parts = route.split('/');
	if (!parts[1]) {
		return 'Portfolio';
	} else {
		return 'Portfolio';
	}
};
