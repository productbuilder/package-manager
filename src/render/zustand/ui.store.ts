import create from 'zustand';

interface UIStore {
  isShowMenu: boolean;
  setShowMenu: (isShowMenu: boolean) => void;
}

const useUIStore = create<UIStore>((set) => ({
  isShowMenu: false,
  setShowMenu(isShowMenu: boolean) {
    set((state) => ({
      isShowMenu,
    }));
  },
}));

export default useUIStore;
