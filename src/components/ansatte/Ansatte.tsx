import React from 'react';
import useForceUpdate from 'use-force-update';
import { useAppStore } from '../../data/store/AppStore';
import AnsattKomp from './AnsattKomp';
import './Ansatte.less';
import { Ansatt, tomAnsatt } from '../../data/types/sporenstreksTypes';

interface AnsatteProps {
  min?: Date;
  max?: Date;
}

const Ansatte = (props: AnsatteProps) => {
  const { ansatte, setAnsatte } = useAppStore();
  const forceUpdate = useForceUpdate();
  
  const leggTilAnsatt = (e) => {
    e.preventDefault();
    ansatte.push(tomAnsatt);
    setAnsatte(ansatte);
    forceUpdate();
  };
  
  const slettAnsatt = (e, index) => {
    e.preventDefault();
    ansatte.splice(index, 1);
    setAnsatte(ansatte);
    forceUpdate();
  };
  
  return (
    <>
      <div className="ansattliste">
        {ansatte.map((ansatt: Ansatt, idx) => {
          return <AnsattKomp
            index={idx}
            min={props.min}
            max={props.max}
            slettAnsatt={slettAnsatt}
            key={idx}
            showDelete={ansatte.length > 1}
          />;
        })}
      </div>
      <button role="link" className="ansattknapp lenke" onClick={(e) => leggTilAnsatt(e)}>
        Legg til ansatt
      </button>
    </>
  );
};

export default Ansatte;
