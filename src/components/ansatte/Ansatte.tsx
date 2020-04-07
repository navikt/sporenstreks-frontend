import React, { useRef } from 'react';
import useForceUpdate from 'use-force-update';
import { useAppStore } from '../../data/store/AppStore';
import AnsattKomp from './AnsattKomp';
import './Ansatte.less';
import { Ansatt } from '../../data/types/sporenstreksTypes';

interface AnsatteProps {
  min?: Date;
  max?: Date;
}

const Ansatte = (props: AnsatteProps) => {
  const { ansatte, setAnsatte } = useAppStore();
  const ansatteliste = useRef<HTMLDivElement>(null);
  const forceUpdate = useForceUpdate();

  return (
    <>
      <div className="ansattliste" ref={ansatteliste}>
        {ansatte.map((ansatt: Ansatt, idx) => {
          return <AnsattKomp index={idx} ansatt={ansatt} min={props.min} max={props.max} key={idx} />;
        })}
      </div>
      <button role="link" className="ansattknapp lenke" onClick={() => {
      }}>
        Legg til ansatt
      </button>
    </>
  );
};

export default Ansatte;
