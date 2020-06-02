import React, { useRef } from 'react';
import Vis from '../Vis';
import { Undertittel } from 'nav-frontend-typografi';
import InternLenke from '../InternLenke';

interface FeiloppsummeringProps {
  settFokus?: boolean;
  errors: any;
}

type FeilProps = FeiloppsummeringProps;

const FeilOppsummering = (props: FeilProps) => {
  const oppsummering = useRef<HTMLDivElement>(null);
  const { settFokus, errors } = props;
  const entries: any[] = Object.entries(errors);

  const handleClick = (list: any) => {
    const id = `${list[0]}`;
    const element = document.getElementById(id);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div aria-live='polite' role='alert'>
      <Vis hvis={entries.length > 0}>
        <div ref={oppsummering} role='region' className='feiloppsummering'>
          <Undertittel>{'Det er ' + entries.length + ' feil i skjemaet'}</Undertittel>
          <ul className='feiloppsummering__liste'>
            {entries.sort(list => list[0][0]).map((list, index) => (
              <li key={index}>
                <InternLenke onClick={() => handleClick(list)} onKeyDown={() => handleClick(list)}>
									{list[1].type === 'pattern' ? list[1].message : list[1].type}
                </InternLenke>
              </li>
            ))}
          </ul>
        </div>
      </Vis>
    </div>
  );
};

export default FeilOppsummering;
