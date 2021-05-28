import React from 'react';
import style from './app-bar.module.scss';

interface Props {
  children?: JSX.Element[] | JSX.Element
};

const Menu: React.FC<Props> = ({children}) => {
  return (
    <div className={style['menu']} >{children}</div>
  );
};

export default Menu;
