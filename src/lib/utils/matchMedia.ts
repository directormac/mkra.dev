import { readable, writable } from 'svelte/store';
import { browser } from './env';

export function matchMedia(queryString: string) {
	if (browser) {
		const query = window.matchMedia(queryString);
		return readable(query.matches, (set) => {
			const listener = (e: MediaQueryListEvent) => set(e.matches);

			query.addEventListener('change', listener);

			return () => query.removeEventListener('change', listener);
		});
	} else {
		// ssr
		return writable(true);
	}
}

export const matchMediaWidth = (width: number) => matchMedia(`(min-width: ${width}px)`);

export const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1536
};

export const smScreen = matchMediaWidth(breakpoints.sm);
export const mdScreen = matchMediaWidth(breakpoints.md);
export const lgScreen = matchMediaWidth(breakpoints.lg);
export const xlScreen = matchMediaWidth(breakpoints.xl);
export const xxlScreen = matchMediaWidth(breakpoints.xxl);

export const screen = matchMedia(`screen`);
export const print = matchMedia(`print`);

export const landscape = matchMedia(`(orientation: landscape)`);
export const portrait = matchMedia(`(orientation: portrait)`);
