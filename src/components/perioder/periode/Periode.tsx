import React from 'react';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { useAppStore } from '../../../data/store/AppStore';
import { PeriodeInput } from '../../periode/PeriodeInput';

interface PeriodeProps {
  id: number,
  index: number;
  min?: Date;
  max?: Date;
}

export const Periode = (props: PeriodeProps) => {
  const { errors, setError, clearError } = useFormContext();
  const perId = 'periode_' + props.index;

  let min = props.min ?? dayjs('1970-01-01').toDate();
  let max = props.max ?? dayjs(new Date()).add(1, 'year').toDate();

  const validatePeriode = (selectedDates): boolean => {
    const errbox = document.querySelector('.' + perId)!;
    const msg = selectedDates.length < 2 ? 'Perioden må ha to gyldige datoer' : '';
    if (msg !== '') {
      errbox.classList.remove('tom');
      setError(perId, msg);
      return false;
    } else {
      errbox.classList.add('tom');
      clearError([perId, 'backend']);
      return true;
    }
  };

  const { ansatte, setAnsatte } = useAppStore();
  const a = ansatte.find(a => a.id === props.id)
  const handleChange = (fom, tom) => {
    if (a) {
      a.fom = fom;
      a.tom = tom;
      validatePeriode([fom, tom]);
    }
    setAnsatte([...ansatte]);
  }
  return (<PeriodeInput fom={a?.fom} tom={a?.tom} feilmelding={a?.beloepError} handleChange={handleChange}/>)
}


export default Periode;
