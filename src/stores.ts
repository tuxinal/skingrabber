import { writable, type Writable } from 'svelte/store';
import axios from 'axios';

export const current_skin: Writable<Skin> = writable(null);

export function get_profile(user: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		axios
			.get(`https://api.ashcon.app/mojang/v2/user/${user}`)
			.then((response) => {
				if (response.status === 200) {
					resolve(true);
					window.location.hash = `#${response.data['username']}`;
					let cape: string | null;
					try {
						cape = 'data:image/png;base64,' + response.data['textures']['cape']['data'];
					} catch {
						cape = null;
					}
					current_skin.set({
						skin: `data:image/png;base64,${response.data['textures']['skin']['data']}`,
						skin_url: response.data['textures']['skin']['url'],
						cape,
						model: response.data['textures']['slim'] ? 'slim' : 'default',
						name: response.data['username'],
						uuid: response.data['uuid'],
						username_history: response.data['username_history'],
						skin_settings: {
							cape: true,
							hat: true,
							jacket: true,
							leftPant: true,
							leftSleeve: true,
							rightPant: true,
							rightSleeve: true
						}
					});
				} else {
					reject();
				}
			})
			.catch(reject);
	});
}

export interface Skin {
	skin: string;
	skin_url: string;
	model: 'default' | 'slim';
	cape: string | null;
	name: string;
	uuid: string;
	username_history: NameHistoryItem[];
	skin_settings: SkinSettings;
}
interface NameHistoryItem {
	username: string;
	changed_at?: string;
}
export interface SkinSettings {
	cape: boolean;
	hat: boolean;
	jacket: boolean;
	rightSleeve: boolean;
	leftSleeve: boolean;
	rightPant: boolean;
	leftPant: boolean;
}
