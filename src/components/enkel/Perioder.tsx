import React, { useState } from 'react';
import useForceUpdate from 'use-force-update';
import PeriodeKomp from './PeriodeKomp';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Element } from 'nav-frontend-typografi';
import { Row, Column } from 'nav-frontend-grid';
import { HjelpetekstDager } from '../dager/HjelpetekstDager';
import { HjelpetekstPeriode } from '../periode/HjelpetekstPeriode';
import HjelpetekstRefusjon from '../refusjon/HjelpetekstRefusjon';
import dayjs from 'dayjs';

interface PerioderProps {
  min?: Date;
  max?: Date;
}

const Perioder = (props: PerioderProps) => {
  const [lokal, setLokal] = useState<number[]>([0]);
  const forceUpdate = useForceUpdate();

  const oppdaterPerioder = () => {
    forceUpdate();
  };

  const slettPeriode = (e: any, idx: number) => {
    e.preventDefault();
    const elementIndex = lokal.findIndex((element) => element === idx);
    lokal.splice(elementIndex, 1);
    setLokal(lokal);
    oppdaterPerioder();
  };

  const leggTilPeriode = (e: any) => {
    e.preventDefault();
    const fairlyRandom = Number('' + dayjs().valueOf() + Math.random());
    lokal.push(fairlyRandom);
    setLokal(lokal);
    oppdaterPerioder();
  };

  return (
    <>
      <div className='periodeliste'>
        <Row className='periode periodeliste--overskrift'>
          <Column md='5' xs='12'>
            <Element tag='label'>
              Hvilken periode var den ansatte borte?
              <HjelpetekstPeriode />
            </Element>
          </Column>
          <Column md='3' xs='12'>
            <Element tag='label'>
              Antall dager:
              <HjelpetekstDager />
            </Element>
          </Column>
          <Column md='2' xs='12'>
            <Element tag='label'>
              Beløp:
              <HjelpetekstRefusjon />
            </Element>
          </Column>
        </Row>
        {lokal.map((idx) => {
          return (
            <PeriodeKomp
              index={idx}
              numOfRows={lokal.length}
              slettPeriode={(env) => slettPeriode(env, idx)}
              min={props.min}
              max={props.max}
              key={idx}
            />
          );
        })}
      </div>

      <button
        role='link'
        className='periodeknapp lenke'
        onClick={leggTilPeriode}
      >
        + Legg til ekstra fraværsperiode
      </button>
      <Hjelpetekst>
        Denne benytter du kun dersom arbeidstaker har vært borte fra jobb i to
        eller flere omganger.
      </Hjelpetekst>
    </>
  );
};

export default Perioder;
