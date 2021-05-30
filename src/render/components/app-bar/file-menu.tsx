import React from 'react';
import Menu from './menu';
import MenuItem from './menu-item';
import Separator from './separator';

interface Props {}

const FileMenu: React.FC<Props> = () => {
  return (
    <>
      <Menu>
        <MenuItem
          title="New File"
          onClick={() => console.log('testen')}
          shortcut="Crtl+N"
        />
        <Separator />
        <MenuItem
          title="Open File..."
          onClick={() => console.log('testen')}
          shortcut="Crtl+O"
        />
        <MenuItem title="Open Recent" onClick={() => console.log('testen')} />
        <Separator />
        <MenuItem
          title="Save"
          onClick={() => console.log('testen')}
          shortcut="Crtl+S"
        />
        <MenuItem
          title="Save As..."
          onClick={() => console.log('testen')}
          shortcut="Crtl+Shift+S"
        />
        <Separator />
        <MenuItem title="Preferences" onClick={() => console.log('testen')} />
        <Separator />
        <MenuItem title="Revert File" onClick={() => console.log('testen')} />
        <Separator />
        <MenuItem title="Exit" onClick={() => console.log('testen')} />
      </Menu>
    </>
  );
};

export default FileMenu;
