import React, { useReducer } from 'react';
import AnsattKomp from './AnsattKomp';
import './Ansatte.less';
import { Ansatt, tomAnsatt } from '../../data/types/sporenstreksTypes';
import { useAppStore } from '../../data/store/AppStore';
import Vis from '../Vis';
import { Normaltekst } from 'nav-frontend-typografi';
import { FnrInput } from 'nav-frontend-skjema';
import Periode2 from '../inputfelt/Periode2';
import Antall2 from '../inputfelt/Antall2';
import Beloep2 from '../inputfelt/Beloep2';
import useForceUpdate from 'use-force-update';
import { identityNumberSeparation } from '../../util/identityNumberSeparation';

interface AnsatteProps {
  // min?: Date;
  // max?: Date;
  // ansatte: Ansatt[]
}

// const ansatt = (ansatt: Ansatt) => <>
//   <div className="ansatt" role="group">
//     <FnrInput
//       id="fnr"
//       name="fnr"
//       bredde="M"
//       label="Fødselsnummer til arbeidstaker"
//       value={ansatt.fnr}
//       onChange={(e) => setIdentityNumberInput(e.target.value)}
//       onValidate={(valid) => setValidFnr( valid )}
//       feil={(validFnr || !identityNumberInput ? undefined : 'Ugyldig fødselsnummer')}
//     />
//     <Periode2 index={props.index} min={props.min} max={props.max} />
//     <Antall2 index={props.index} />
//     <Beloep2 index={props.index} />
//
//
//     <Vis hvis={props.showDelete}>
//       <button role='link' id={'btn_' + props.index} className='ansattknapp lenke slett'
//               onClick={(e) => props.slettAnsatt(e, props.index)}
//       >
//         <Normaltekst tag="span">
//           Slett ansatt
//         </Normaltekst>
//       </button>
//     </Vis>
//   </div>
// </>;



const Ansatte2 = (props: AnsatteProps) => {
  // const { ansatte, setAnsatte } = useAppStore();
  const [ ansatte, dispatch ] = useReducer((ansatte, { type, value }) => {
    switch (type) {
      case "add":
        return [...ansatte, tomAnsatt];
      case "edit":
        // console.log(value)
        let nyAnsatte: Ansatt[] = ansatte;
        console.log(nyAnsatte)
        nyAnsatte[value.idx].fnr = value.fnr;
        console.log(nyAnsatte)
        return [...nyAnsatte];
      case "remove":
        return ansatte.filter((_, index) => index !== value.idx);
      default:
        return ansatte;
    }
  }, [tomAnsatt]);
  
  // console.log(ansatte)
  
  return (
    <>
      <div className="ansattliste">
        {
          ansatte.map((ansatt: Ansatt, idx) => {
            console.log(ansatt, idx)
          return <div key={idx} className="ansatt" role="group">
              <FnrInput
                id={"fnr_"+idx}
                name="fnr"
                bredde="M"
                label="Fødselsnummer til arbeidstaker"
                value={ansatt.fnr}
                onChange={(e) => dispatch({ type: "edit", value: {fnr: e.target.value,
                    idx: idx}})}
                onValidate={(valid) => true} // todo: fix
                feil={!ansatt.fnr ? undefined : 'Ugyldig fødselsnummer'}
              />
              <Periode2 index={idx} />
              {/*<Antall2 index={props.index} />*/}
              {/*<Beloep2 index={props.index} />*/}
    
              
              {/*<Vis hvis={props.showDelete}>*/}
              {/*  <button role='link' id={'btn_' + props.index} className='ansattknapp lenke slett'*/}
              {/*          onClick={(e) => props.slettAnsatt(e, props.index)}*/}
              {/*  >*/}
              {/*    <Normaltekst tag="span">*/}
              {/*      Slett ansatt*/}
              {/*    </Normaltekst>*/}
              {/*  </button>*/}
              {/*</Vis>*/}
            </div>
        })}
      </div>
      <button role="link" className="ansattknapp lenke" onClick={(e) => dispatch({type: "add", value: ''})}>
        Legg til ansatt
      </button>
    </>
  );
};

export default Ansatte2;
