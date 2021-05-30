import React, { ReactNode } from 'react';
import style from './app-bar.module.scss';

interface Props {
  children?: ReactNode
};

const Menu: React.FC<Props> = ({children}) => {
  return (
    <div className={style['menu']} >{children}</div>
  );
};

export default Menu;
