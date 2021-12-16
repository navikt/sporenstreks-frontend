import React from 'react';
import dayjs from 'dayjs';
import './BulkPeriode.less';
import { Label, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { HjelpetekstPeriode } from '../periode/HjelpetekstPeriode';
import { Ansatt, AnsattID } from './Ansatt';
import { useBulk } from '../../context/BulkContext';
import { Column, Row } from 'nav-frontend-grid';
import validateDato from './validateDato';
import Datovelger from './Datovelger';
import validateDatoRekkefolge from './validateDatoRekkefolge';

const BulkPeriode = (props: AnsattID) => {
  const perId1 = 'periode_' + props.id + '_fom';
  const { ansatte, setAnsatte } = useBulk();
  const ansatt: Ansatt = ansatte.find(
    (aktuellAnsatt) => aktuellAnsatt.id === props.id
  );

  const handleCloseFom = (selectedDate: Date) => {
    if (ansatt) {
      if (dayjs(selectedDate).isValid()) {
        ansatt.fom = dayjs(selectedDate).format('YYYY-MM-DD');
      }
      ansatt.fomError = validateDato(selectedDate);

      if (!ansatt.fomError && ansatt.tom) {
        ansatt.fomError = validateDatoRekkefolge(
          dayjs(ansatt.tom).toDate(),
          dayjs(selectedDate).toDate()
        );
      }
    }
    setAnsatte([...ansatte]);
  };

  const handleCloseTom = (selectedDate: Date) => {
    if (ansatt) {
      if (dayjs(selectedDate).isValid()) {
        ansatt.tom = dayjs(selectedDate).format('YYYY-MM-DD');
      }
      ansatt.tomError = validateDato(selectedDate);

      if (!ansatt.tomError && ansatt.fom) {
        ansatt.tomError = validateDatoRekkefolge(
          dayjs(ansatt.fom).toDate(),
          dayjs(selectedDate).toDate()
        );
      }
    }
    setAnsatte([...ansatte]);
  };

  const fomErrorClass = ansatt?.fomError ? 'dato-har-feil' : '';
  const tomErrorClass = ansatt?.tomError ? 'dato-har-feil' : '';

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
        <Column md='5' xs='12' className={fomErrorClass}>
          <Datovelger
            id={props.id}
            handleClose={handleCloseFom}
            fomtom='fom'
            defaultValue={ansatt.fom}
          />
          <SkjemaelementFeilmelding>
            {ansatt?.fomError}
          </SkjemaelementFeilmelding>
        </Column>
        <Column md='2' xs='12' className='enkeltperiode-til-tekst'>
          til
        </Column>
        <Column md='5' xs='12' className={tomErrorClass}>
          <Datovelger
            id={props.id}
            handleClose={handleCloseTom}
            fomtom='tom'
            defaultValue={ansatt.tom}
          />
          <SkjemaelementFeilmelding>
            {ansatt?.tomError}
          </SkjemaelementFeilmelding>
        </Column>
      </Row>
    </div>
  );
};

export default BulkPeriode;
