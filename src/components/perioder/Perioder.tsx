import React, { useRef } from 'react';
import { useAppStore } from '../../data/store/AppStore';
import { Periode, tomPeriode } from '../../data/types/sporenstreksTypes';
import useForceUpdate from 'use-force-update';
import './Perioder.less';
import PeriodeKomp from './PeriodeKomp';

interface PerioderProps {
  min?: Date;
  max?: Date;
}

const Perioder = (props: PerioderProps) => {
  const { perioder, setPerioder } = useAppStore();
  const periodeliste = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

  const leggTilPeriode = (e) => {
    e.preventDefault();
    perioder.push(tomPeriode);
    setPerioder(perioder);
    forceUpdate();
  };

  const slettPeriode = (e, index) => {
    e.preventDefault();
    perioder.splice(index, 1);
    setPerioder(perioder);
    forceUpdate();
  };

  return (
    <>
      <div className="periodeliste" ref={periodeliste}>
        {perioder.map((periode: Periode, idx: number) => {
          return <PeriodeKomp index={idx} slettPeriode={slettPeriode} min={props.min} max={props.max} key={idx} />
        })}
      </div>

      <button role="link" className="periodeknapp lenke" onClick={(e) => leggTilPeriode(e)}>
        Legg til periode
      </button>
    </>
  )
};

export default Perioder;
