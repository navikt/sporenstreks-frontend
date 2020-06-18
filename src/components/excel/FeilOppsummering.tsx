import React, { useRef } from 'react';
import Vis from '../felles/Vis';
import { Undertittel } from 'nav-frontend-typografi';
import InternLenke from '../felles/InternLenke';

interface FeiloppsummeringProps {
  settFokus?: boolean;
  errors: any;
}

enum keyCodes {
  'ENTER' = 13
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

  const handleKeyDown = (e: React.KeyboardEvent, list: any) => {
    if (e.keyCode === keyCodes.ENTER) {
      handleClick(list);
    }
  }

  return (
    <div aria-live='polite' role='alert'>
      <Vis hvis={entries.length > 0}>
        <div ref={oppsummering} role='region' className='feiloppsummering'>
          <Undertittel>{'Det er ' + entries.length + ' feil i skjemaet'}</Undertittel>
          <ul className='feiloppsummering__liste'>
            {entries.sort(list => list[0][0]).map((list, index) => (
              <li key={index}>
                <InternLenke onClick={() => handleClick(list)} onKeyDown={(e: React.KeyboardEvent<Element>) => handleKeyDown(e, list)}>
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
