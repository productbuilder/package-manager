import { ipcRenderer } from 'electron';
import React, { useEffect, useRef, useState } from 'react';
import useUIStore from '../../zustand/ui.store';
import StringInput from '../form/string-input';

interface Props {
  className?: string;
}

const MainView: React.FC<Props> = ({ className }) => {
  const setShowMenu = useUIStore((state) => state.setShowMenu);
  const [data, setData] = useState<any>(null);
  const [fields, setFields] = useState<any[]>([]);

  const refId = useRef<HTMLInputElement>(null);
  const refVerion = useRef<HTMLInputElement>(null);
  const refDate = useRef<HTMLInputElement>(null);
  const refManufacturer = useRef<HTMLInputElement>(null);
  const refName = useRef<HTMLInputElement>(null);
  const refDesigner = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLInputElement>(null);
  const refYear = useRef<HTMLInputElement>(null);
  const refURL = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ipcRenderer.send('start');
    ipcRenderer.on('data', (event, arg) => {
      setData(arg);
    });
  }, []);

  useEffect(() => {
    // data?.version && console.log("Version", data?.version)
    // data && 'version' in data && console.log('Version');
    // console.log(data)
  }, [data]);

  const handleAdd = () => {
    console.log('Add!');
    setFields([...fields, 'New Field']);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const url = refURL?.current?.value ?? '';
    const id = refId?.current?.value ?? '';
    const version = refVerion?.current?.value ?? '';
    const date = refDate?.current?.value ?? '';
    const manufacturer = refManufacturer?.current?.value ?? '';
    const name = refName?.current?.value ?? '';
    const designer = refDesigner?.current?.value ?? '';
    const description = refDescription?.current?.value ?? '';
    const year = refYear?.current?.value ?? '';


    const newData = {
      id,
      version,
      date,
      manufacturer,
      name,
      designer,
      description,
      year,
      url,
    };
    setData(newData);
    ipcRenderer.send('save', newData)
  };

  const handleNewFile = () => {
    ipcRenderer.send('newFile')
  }

  const openFile = () => {
    ipcRenderer.send('openFile')
  }

  const hanleClick = () => {
    setShowMenu(false)
  }

  return (
    <div {...{ className }} onClick={hanleClick}>
      {/* Adding fields */}
      {/* {fields.map((field, key) => (
        <div>{field}</div>
      ))}
      <div onClick={handleAdd}>Add</div> */}
      <form>
        {data && (
          <>
            <StringInput record="id" obj={data} reference={refId} />
            <StringInput record="version" obj={data} reference={refVerion} />
            <StringInput record="date" obj={data} reference={refDate} />
            <StringInput
              record="manufacturer"
              obj={data}
              reference={refManufacturer}
            />
            <StringInput record="name" obj={data} reference={refName} />
            <StringInput record="designer" obj={data} reference={refDesigner} />
            <StringInput
              record="description"
              obj={data}
              reference={refDescription}
            />
            <StringInput record="year" obj={data} reference={refYear} />
            <StringInput record="url" obj={data} reference={refURL} />
          </>
        )}
      </form>
      <div onClick={handleSubmit}>Submit</div>
      <div onClick={handleNewFile} >Create New File</div>
      <div onClick={openFile} >Open File</div>
    </div>
  );
};

export default MainView;
