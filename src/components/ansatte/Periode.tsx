import React from 'react';
import { useAppStore } from '../../data/store/AppStore';
import { AnsattID } from '../../data/types/sporenstreksTypes';
import './Periode.less';
import { PeriodeInput } from '../periode/PeriodeInput';

const Periode = (props: AnsattID) => {
  const { ansatte, setAnsatte } = useAppStore();
  const a = ansatte.find(a => a.id === props.id)
  const onChange = (fom, tom) => {
    if (a){
      a.fom = fom;
      a.tom = tom;
    }
    setAnsatte([...ansatte]);
  };
  return (
    <PeriodeInput fom={a?.fom} tom={a?.tom} feilmelding={a?.periodeError} handleChange={onChange}/>
  )
}

export default Periode;
