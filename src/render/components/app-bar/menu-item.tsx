import React from 'react';
import style from './app-bar.module.scss';

interface Props {
  title: string;
  shortcut?: string;
  onClick: () => void; 
}

const MenuItem: React.FC<Props> = ({title, shortcut, onClick}) => {
  return (
    <div className={style['item']} {...{onClick}}>
      <span>{title}</span>
      <span>{shortcut ?? ""}</span>
    </div>
  );
};

export default MenuItem;
