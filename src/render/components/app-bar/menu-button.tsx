import React from 'react';
import style from './app-bar.module.scss';

interface Props {
  title: string;
  children?: JSX.Element[] | JSX.Element
};

const MenuButton: React.FC<Props> = ({title, children}) => {
  return (
    <div className={style['button-menu']}>
      <div className={style['button']} >{title}</div>
      {children}
    </div>
  );
};

export default MenuButton;
