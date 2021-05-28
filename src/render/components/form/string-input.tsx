import React, { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from 'react';

interface Props {
  record: string;
  obj: any;
  reference: React.RefObject<HTMLInputElement>
};

const StringInput: React.FC<Props> = ({record, obj, reference}) => {
  const [value, setValue] = useState<string>("")

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(()=>{
    setValue(obj[record])
  },[obj])

  return (
    record in obj ? <div>
      <label>{record} : </label>
      <input type="text" value={value} onChange={onChange} ref={reference}/>
    </div> : <></>
  );
};

export default StringInput;


