import React, { ReactNode, useState } from 'react';
import useUIStore from '../../zustand/ui.store';
import style from './app-bar.module.scss';

interface Props {
  title: string;
  children?: ReactNode;
}

const MenuButton: React.FC<Props> = ({ title, children }) => {
  const isShowMenu = useUIStore((state) => state.isShowMenu);
  const setShowMenu = useUIStore((state) => state.setShowMenu);
  const menuSelection = useUIStore((state) => state.menuSelection);
  const setMenuSelection = useUIStore((state) => state.setMenuSelection);


  return (
    <div className={style['button-menu']} onMouseEnter={()=>{setMenuSelection(title)}}>
      <div className={style['button']} onClick={() => setShowMenu(!isShowMenu)} >
        {title}
      </div>
      {isShowMenu && menuSelection === title && children}
    </div>
  );
};

export default MenuButton;
