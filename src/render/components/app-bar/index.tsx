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
            <Menu>
              <MenuItem title="New File" onClick={()=>console.log("testen")} shortcut="Crtl+N"/>
              <Separator />
              <MenuItem title="Open File..." onClick={()=>console.log("testen")} shortcut="Crtl+O"/>
              <MenuItem title="Open Recent" onClick={()=>console.log("testen")}/>
              <Separator />
              <MenuItem title="Save" onClick={()=>console.log("testen")} shortcut="Crtl+S"/>
              <MenuItem title="Save As..." onClick={()=>console.log("testen")} shortcut="Crtl+Shift+S"/>
              <Separator />
              <MenuItem title="Revert File" onClick={()=>console.log("testen")}/>
              <Separator />
              <MenuItem title="Exit" onClick={()=>console.log("testen")}/>
            </Menu>
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
