import React, { useEffect, useRef, useState } from 'react';
import useForceUpdate from 'use-force-update';
import PeriodeKomp from './PeriodeKomp';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Element } from 'nav-frontend-typografi';
import { Row, Column } from 'nav-frontend-grid';
import { HjelpetekstDager } from '../dager/HjelpetekstDager';
import { HjelpetekstPeriode } from '../periode/HjelpetekstPeriode';
import EksempelBulk from '../bulk/EksempelBulk';

interface PerioderProps {
  min?: Date;
  max?: Date;
}

const Perioder = (props: PerioderProps) => {
  const [lokal, setLokal] = useState<number[]>([0]);
  const periodeliste = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const periods: number[] = [];
    setLokal(periods.length > 0 ? periods : lokal);
    lagIdForPerioder();
    // eslint-disable-next-line
  }, [periodeliste]);

  const lagIdForPerioder = () => {
    const periods = periodeliste.current!.querySelectorAll('.periode');
    periods.forEach((value, key) => {
      const input = value.querySelector('.input--xl[type=text]');
      if (input) {
        input!.setAttribute('id', 't_' + key);
        input!.setAttribute('autoComplete', 'off');
      }
    });
  };

  const oppdaterPerioder = () => {
    forceUpdate();
    setTimeout(() => {
      lagIdForPerioder();
    }, 10);
  };

  const slettPeriode = (e: any, idx: number) => {
    e.preventDefault();
    lokal.splice(idx, 1);
    setLokal(lokal.map((val, idx) => idx));
    oppdaterPerioder();
  };

  const leggTilPeriode = (e: any) => {
    e.preventDefault();
    lokal.push(lokal[lokal.length - 1] + 1);
    setLokal(lokal);
    oppdaterPerioder();
  };

  return (
    <>
      <div className="periodeliste" ref={periodeliste}>
        <Row className="periode periodeliste--overskrift">
          <Column md="5" xs="12">
            <Element tag="span">
              Hvilken periode var den ansatte borte?
              <HjelpetekstPeriode/>
            </Element>
          </Column>
          <Column md="3" xs="12">
            <Element tag="span">
              Antall dager:<HjelpetekstDager/>
            </Element>
          </Column>
          <Column md="2" xs="12">
            <Element tag="span">
              Beløp:<EksempelBulk />
            </Element>
          </Column>
        </Row>
        {lokal.map((idx) => {
          return (
            <PeriodeKomp index={idx} numOfRows={lokal.length}
              slettPeriode={slettPeriode} min={props.min} max={props.max} key={idx}
            />
          )
        })}
      </div>

      <button role="link" className="periodeknapp lenke" onClick={leggTilPeriode}>
        + Legg til ekstra fraværsperiode
      </button>
      <Hjelpetekst>
        Denne benytter du kun dersom arbeidstaker har vært borte fra jobb i to eller flere omganger.
      </Hjelpetekst>
    </>
  )
};

export default Perioder;
