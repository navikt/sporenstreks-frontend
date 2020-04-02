import React, { useEffect, useRef, useState } from 'react';
import useForceUpdate from 'use-force-update';
import AnsattKomp from './AnsattKomp';
import './Ansatte.less';

interface AnsatteProps {
  min?: Date;
  max?: Date;
}

const Ansatte = (props: AnsatteProps) => {
  const [ lokal, setLokal ] = useState<number[]>([ 0 ]);
  const ansatteliste = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const periods: number[] = [];
    setLokal(periods.length > 0 ? periods : lokal);
    lagIdForAnsatte();
    // eslint-disable-next-line
  }, [ ansatteliste ]);

  const lagIdForAnsatte = () => {
    const employees = ansatteliste.current!.querySelectorAll('.ansatt');
    employees.forEach((value, key) => {
      const input = value.querySelector('.input--m[type=text]');
      if (input) {
        input!.setAttribute('id', 't_' + key);
        input!.setAttribute('autoComplete', 'off');
      }
    });
    forceUpdate();
  };

  const oppdaterAnsatte = () => {
    setTimeout(() => {
      lagIdForAnsatte();
    }, 10);
  };

  const slettAnsatt = (e: any, idx: number) => {
    const employees = ansatteliste.current!.querySelectorAll('.ansatt');
    employees[idx].remove();
    oppdaterAnsatte();
  };

  const leggTilAnsatt = (e: any) => {
    e.preventDefault();
    lokal.push(lokal[lokal.length - 1] + 1);
    setLokal(lokal);
    oppdaterAnsatte();
  };

  return (
    <div>
      <div className="ansattliste" ref={ansatteliste}>
        {lokal.map((idx) => {
          return (
            <AnsattKomp index={idx}
              slettAnsatt={slettAnsatt} min={props.min} max={props.max} key={idx}
            />
          )
        })}
      </div>

      <button role="link" className="ansattknapp lenke" onClick={leggTilAnsatt}>
        Legg til ansatt
      </button>

    </div>
  );
};

export default Ansatte;
