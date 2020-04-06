import React, { useRef } from 'react';
import Vis from '../Vis';
import { Undertittel } from 'nav-frontend-typografi';
import './FeilOppsummering.less';

interface FeiloppsummeringProps {
  errors: any;
}

type FeilProps = FeiloppsummeringProps;

const FeilOppsummeringExcel = (props: FeilProps) => {
  const oppsummering = useRef<HTMLDivElement>(null);
  const { errors } = props;
  const entries: any[] = errors;


  return (
    <div aria-live='polite' role='alert'>
      <Vis hvis={entries.length >= 0}>
        <div ref={oppsummering} tabIndex={0} role='region' className='feiloppsummering'>
          <Undertittel>{'Det er ' + entries.length + ' feil i filen'}</Undertittel>
          <ul className='feiloppsummering__liste'>
            {entries.map((list, index) => (
              <li key={index}>
                {list.length}
              </li>
            ))}
          </ul>
        </div>
      </Vis>
    </div>
  );
};

export default FeilOppsummeringExcel;
