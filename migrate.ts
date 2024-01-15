/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'cross-fetch';
import 'dotenv/config';

const BASE_URL = process.env.BASE_URL ?? '';
const BASE_ACCESS_TOKEN = process.env.BASE_ACCESS_TOKEN ?? '';

const TARGET_URL = process.env.TARGET_URL ?? '';
const TARGET_ACCESS_TOKEN = process.env.TARGET_ACCESS_TOKEN ?? '';

async function getSnapshot() {
	const URL = `${BASE_URL}/schema/snapshot?access_token=${BASE_ACCESS_TOKEN}`;
	const { data } = await fetch(URL).then((r) => r.json());
	return data;
}
async function getDiff(snapshot: any) {
	const URL = `${TARGET_URL}/schema/diff?access_token=${TARGET_ACCESS_TOKEN}`;

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
	const URL = `${TARGET_URL}/schema/apply?access_token=${TARGET_ACCESS_TOKEN}`;

	await fetch(URL, {
		method: 'POST',
		body: JSON.stringify(diff),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

// NOTE: This will only migrate schema defenitions, collections must be created and migrated manually
async function main() {
	const snapshot = await getSnapshot();
	const diff = await getDiff(snapshot);
	await applyDiff(diff);
}

main();
