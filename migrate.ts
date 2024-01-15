/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'cross-fetch';

const BASE_DIRECTUS_URL = '';
const BASE_ACCESS_TOKEN = '';

const TARGET_DIRECTUS_URL = '';
const TARGET_ACCESS_TOKEN = '';

async function getSnapshot() {
	const URL = `${BASE_DIRECTUS_URL}/schema/snapshot?access_token=${BASE_ACCESS_TOKEN}`;
	const { data } = await fetch(URL).then((r) => r.json());
	return data;
}
async function getDiff(snapshot: any) {
	const URL = `${TARGET_DIRECTUS_URL}/schema/diff?access_token=${TARGET_ACCESS_TOKEN}`;

	const { data } = await fetch(URL, {
		method: 'POST',
		body: JSON.stringify(snapshot),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());

	return data;
}

async function applyDiff(diff: any) {
	const URL = `${TARGET_DIRECTUS_URL}/schema/apply?access_token=${TARGET_ACCESS_TOKEN}`;

	await fetch(URL, {
		method: 'POST',
		body: JSON.stringify(diff),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

async function main() {
	const snapshot = await getSnapshot();
	const diff = await getDiff(snapshot);
	await applyDiff(diff);
}

main();
