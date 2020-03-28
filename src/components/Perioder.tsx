import React, { useEffect, useRef, useState } from 'react';
import useForceUpdate from 'use-force-update';
import PeriodeKomp from './PeriodeKomp';
import './Perioder.less';

interface PerioderProps {
  min?: Date;
  max?: Date;
}

const Perioder = (props: PerioderProps) => {
  const [ lokal, setLokal ] = useState<number[]>([ 0 ]);
  const periodeliste = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const perioder: number[] = [];
    setLokal(perioder.length > 0 ? perioder : lokal);
    lagIdForPerioder();
    // eslint-disable-next-line
  }, [ periodeliste ]);

  const lagIdForPerioder = () => {
    const perioder = periodeliste.current!.querySelectorAll('.periode');
    perioder.forEach((value, key) => {
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
        {lokal.map((idx) => {
          return (
            <PeriodeKomp index={idx}
              slettPeriode={slettPeriode} min={props.min} max={props.max} key={idx}
            />
          )
        })}
      </div>

      <button role="link" className="periodeknapp lenke" onClick={leggTilPeriode}>
        Legg til periode
      </button>
    </>
  )
};

export default Perioder;
