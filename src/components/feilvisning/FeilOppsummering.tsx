import React, { useEffect, useRef } from 'react';
import Vis from '../Vis';
import { erSynligIViewport } from '../../util/browser-utils';
import { Undertittel } from 'nav-frontend-typografi';
import './FeilOppsummering.less';

interface FeiloppsummeringProps {
  settFokus?: boolean;
  errors: any;
}

type FeilProps = FeiloppsummeringProps;

const FeilOppsummering = (props: FeilProps) => {
  const oppsummering = useRef<HTMLDivElement>(null);
  const { settFokus, errors } = props;
  const entries: any[] = Object.entries(errors);

  useEffect(() => {
    let fokuser = settFokus;
    if (fokuser === undefined) {
      fokuser = true;
    }
    if (fokuser && oppsummering.current) {
      if (!erSynligIViewport(oppsummering.current)) {
        setTimeout(() => {
          oppsummering.current?.focus();
        }, 300);
      } else {
        oppsummering.current?.focus();
      }
    }
  });

  const handleClick = (list: any) => {
    const id = `${list[0]}`;
    const element = document.getElementById(id);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: any, list: any) => {
    if (e.key === 'Enter') {
      handleClick(list);
    }
  };

  return (
    <div aria-live='polite' role='alert'>
      <Vis hvis={entries.length > 0}>
        <div ref={oppsummering} tabIndex={0} role='region' className='feiloppsummering'>
          <Undertittel>{'Det er ' + entries.length + ' feil i skjemaet'}</Undertittel>
          <ul className='feiloppsummering__liste'>
            {entries.sort(list => list[0][0]).map((list, index) => (
              <li key={index}>
                <div role='link' className='lenke' tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, list)}
                  onClick={() => handleClick(list)}
                >
                  {list[1].type}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Vis>
    </div>
  );
};

export default FeilOppsummering;