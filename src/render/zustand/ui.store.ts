import create from 'zustand';

interface UIStore {
  isShowMenu: boolean;
  setShowMenu: (isShowMenu: boolean) => void;
  menuSelection: string | null;
  setMenuSelection: (menuSelection: string | null) => void;
}

const useUIStore = create<UIStore>((set) => ({
  isShowMenu: false,
  setShowMenu(isShowMenu) {
    set((state) => ({
      isShowMenu,
    }));
  },
  menuSelection: null,
  setMenuSelection(menuSelection) {
    set((state) => ({
      menuSelection,
    }));
  },
}));

export default useUIStore;
