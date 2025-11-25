import { create } from 'zustand';

type Modal = {
	modal: { open: boolean; type?: 'orders' };
	openModal: () => void;
	closeModal: () => void;
};

const useModalStore = create<Modal>((set) => ({
	modal: { open: false, type: 'orders' },
	openModal: () => set({ modal: { open: true } }),
	closeModal: () => set({ modal: { open: false } }),
}));

export default useModalStore;
