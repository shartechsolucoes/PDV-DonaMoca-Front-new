import { create } from 'zustand';

type AccessLevel = {
	accessLevel: number;
	userName: string;
	userId: string;
	userAvatar: string;
	avatar: string;
	handleAccessLevel: (level: number) => void;
	handleUserName: (name: string) => void;
	handleUserId: (id: string) => void;
	handleUserAvatar: (avatar: string) => void;
	updateNavAvatar: () => void;
	getAvatar: (avatar: string) => void;
};

const useAccessLevelStore = create<AccessLevel>((set) => ({
	accessLevel: 0,
	userName: '',
	userId: '',
	userAvatar: localStorage.getItem('userAvatar')
		? `${import.meta.env.VITE_API_URL}${localStorage.getItem('userAvatar')}`
		: '',
	avatar: '',
	handleAccessLevel: (level) => set({ accessLevel: level }),
	handleUserName: (name) => set({ userName: name }),
	handleUserId: (id) => set({ userId: id }),
	handleUserAvatar: (avatar) => {
		if (avatar) {
			localStorage.setItem('userAvatar', avatar);
		}
	},
	updateNavAvatar: () => {
		set({
			userAvatar: `${import.meta.env.VITE_API_URL}${localStorage.getItem(
				'userAvatar'
			)}`,
		});
	},
	getAvatar: (avatar) => {
		set({ avatar });
	},
}));

export default useAccessLevelStore;
