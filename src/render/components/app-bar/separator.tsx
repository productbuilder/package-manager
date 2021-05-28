import React from 'react';
import style from './app-bar.module.scss';

interface Props {

};

const Separator: React.FC<Props> = () => {
  return (
    <div className={style['seperator']}></div>
  );
};

export default Separator;
