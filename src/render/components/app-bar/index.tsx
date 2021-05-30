import React, { useEffect, useState } from 'react';
import { remote, ipcRenderer } from 'electron';
import style from './app-bar.module.scss';

import Logo from './logo.svg';
import Close from './close.svg';
import Resize from './resize.svg';
import Minimize from './minimize.svg';
import MenuButton from './menu-button';
import Menu from './menu';
import MenuItem from './menu-item';
import Separator from './separator';
import useUIStore from '../../zustand/ui.store';
import FileMenu from './file-menu';

interface Props {
  className?: string;
}

const AppBar: React.FC<Props> = ({ className }) => {
  const [appName, setAppName] = useState(
    ipcRenderer.sendSync('APP_TITLE_REQUEST')
  );

  const color = '#222';

  useEffect(() => {
    ipcRenderer.on('APP_TITLE_REQUEST', (event, arg) => {
      setAppName(arg);
    });
  }, []);

  const handleMinimize = () => {
    remote.getCurrentWindow().minimize();
  };

  const handleRestorDown = () => {
    const win = remote.getCurrentWindow();
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  };

  const handleClose = () => {
    remote.app.quit();
  };

  return (
    <div {...{ className }}>
      <div className={style['app-bar']}>
        <div className={style['left-side']}>
          <Logo className={style['logo']} />
          <MenuButton title="File">
            <FileMenu />
          </MenuButton>
          <MenuButton title="Tester">
            <FileMenu />
          </MenuButton>
        </div>
        <div className={style['title']}>
          {appName.fileName ? `${appName.fileName} - ` : ''}
          {appName.name} - {appName.version}
        </div>
        <div className={style['controll']}>
          <div onClick={handleMinimize}>
            <Minimize className={style['minimize']} />
          </div>
          <div onClick={handleRestorDown}>
            <Resize className={style['resize']} />
          </div>
          <div onClick={handleClose}>
            <Close className={style['close']} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
