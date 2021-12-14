import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { Label, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { HjelpetekstPeriode } from '../periode/HjelpetekstPeriode';
import { Column, Row } from 'nav-frontend-grid';
import Datovelger from '../bulk/Datovelger';

export const formatDate = (value?: Date): string => {
  return value ? dayjs(value).format('DD.MM.YYYY') : '';
};

export const formatPeriod = (fom?: Date, tom?: Date): string => {
  return !(fom && tom) ? '' : formatDate(fom) + ' til ' + formatDate(tom);
};

export const validatePeriod = (dato?: Date): string => {
  return !dato ? 'Feltet må ha gyldig dato' : '';
};

interface EnkelPeriodeProps {
  index: number;
  min?: Date;
  max?: Date;
  onClose: (selectedDate: Date) => void;
}

const EnkelPeriode = (props: EnkelPeriodeProps) => {
  const {
    formState: { errors },
    setError,
    clearErrors
  } = useFormContext();
  const perId1 = 'periode_' + props.index + '_fom';
  const perId2 = 'periode_' + props.index + '_tom';

  const [fom, setFom] = useState<string>('');
  const [tom, setTom] = useState<string>('');

  const handleCloseFom = (selectedDate: Date) => {
    const errorMessage = validatePeriod(selectedDate);
    if (errorMessage) {
      setError(perId1, { type: errorMessage, message: errorMessage });
    } else {
      clearErrors([perId1, 'backend']);
    }
    setFom(dayjs(selectedDate).format('YYYY-MM-DD'));
    props.onClose(selectedDate);
  };

  const handleCloseTom = (selectedDate: Date) => {
    const errorMessage = validatePeriod(selectedDate);
    if (errorMessage) {
      setError(perId2, { type: errorMessage, message: errorMessage });
    } else {
      clearErrors([perId2, 'backend']);
    }
    setTom(dayjs(selectedDate).format('YYYY-MM-DD'));
  };

  const perId1ErrorClass = errors[perId1] ? 'dato-har-feil' : '';
  const perId2ErrorClass = errors[perId2] ? 'dato-har-feil' : '';

  return (
    <div className={'skjemaelement'}>
      <Row>
        <Label htmlFor={perId1}>
          <div style={{ display: 'flex' }}>
            Hvilken periode var den ansatte borte?
            <HjelpetekstPeriode />
          </div>
        </Label>
      </Row>
      <Row>
        <Column md='5' xs='12' className={perId1ErrorClass}>
          <Datovelger
            id={props.index}
            handleClose={handleCloseFom}
            fomtom='fom'
            defaultValue={fom}
          />
          {errors[perId1] && (
            <SkjemaelementFeilmelding>
              {errors[perId1] && errors[perId1].type}
            </SkjemaelementFeilmelding>
          )}
        </Column>
        <Column md='2' xs='12' className='enkeltperiode-til-tekst'>
          til
        </Column>
        <Column md='5' xs='12' className={perId2ErrorClass}>
          <Datovelger
            id={props.index}
            handleClose={handleCloseTom}
            fomtom='tom'
            defaultValue={tom}
          />

          {errors[perId1] && (
            <SkjemaelementFeilmelding>
              {errors[perId1] && errors[perId1].type}
            </SkjemaelementFeilmelding>
          )}
        </Column>
      </Row>
    </div>
  );
};

export default EnkelPeriode;
