import React, { useState } from 'react';
import Vis from '../felles/Vis';
import EnkelPeriode from './EnkelPeriode';
import EnkelDager from './EnkelDager';
import EnkelRefusjon from './EnkelRefusjon';
import { Column, Row } from 'nav-frontend-grid';
import Slettknapp from '../bulk/Slettknapp';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import dayjs from 'dayjs';
import AlertStripe from 'nav-frontend-alertstriper';
import HjelpeteksRefusjonsModal from '../refusjon/HjelpetekstRefusjonModal';
import './PeriodeKomp.scss';
import muligMaksimalRefusjon from '../felles/muligMaksimalRefusjon';

interface PeriodeKompProps {
  index: number;
  min?: Date;
  max?: Date;
  slettPeriode: (e: any, idx: number) => void;
  numOfRows: number;
}

const PeriodeKomp = (props: PeriodeKompProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [grunnbelop, setGrunnbelop] = useState<number>(0);
  const [refusjon, setRefusjon] = useState<number>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dager, setDager] = useState<number>(0);

  const onDateColosed = (selectedDate: Date) => {
    setStartDate(selectedDate);
    getGrunnbeloep(dayjs(selectedDate).format('YYYY-MM-DD')).then(
      (grunnbelopRespons) => {
        if (grunnbelopRespons.grunnbeloep) {
          setGrunnbelop(grunnbelopRespons.grunnbeloep.grunnbeloep);
        }
      }
    );
  };

  const onRefusjonChange = (refusjonsBelop: number) => {
    setRefusjon(refusjonsBelop);
  };

  const beregnetMaksimalRefusjon = muligMaksimalRefusjon(grunnbelop, dager);

  return (
    <>
      <Row className='periode'>
        <Column md='5' xs='12'>
          <EnkelPeriode
            index={props.index}
            min={props.min}
            max={props.max}
            onClose={onDateColosed}
          />
        </Column>
        <Column md='3' xs='12'>
          <EnkelDager
            index={props.index}
            startdato={startDate}
            onChange={setDager}
          />
        </Column>
        <Column md='2' xs='12'>
          <EnkelRefusjon index={props.index} onChange={onRefusjonChange} />
        </Column>
        <Column md='2' xs='12'>
          <Vis hvis={props.numOfRows > 1}>
            <Slettknapp onClick={(e) => props.slettPeriode(e, props.index)} />
          </Vis>
        </Column>
      </Row>
      {refusjon > beregnetMaksimalRefusjon && beregnetMaksimalRefusjon > 0 && (
        <>
          <Row>
            <Column md='10' xs='12'>
              <AlertStripe type='info' className='padded-alert'>
                Refusjonsbeløpet er høyere enn normal 6G-grense basert på 260
                arbeidsdager per år (5 arbeidsdager i uken).{' '}
                <button className='lenke' onClick={() => setModalOpen(true)}>
                  Se hvordan du beregner korrekt beløp her.
                </button>{' '}
                Hvis arbeidstakeren får utbetalt lønn for mindre enn 260 dager
                kan refusjonsbeløpet likevel være korrekt. Du kan sende inn
                søknaden uansett.
              </AlertStripe>
            </Column>
          </Row>
          <HjelpeteksRefusjonsModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default PeriodeKomp;
