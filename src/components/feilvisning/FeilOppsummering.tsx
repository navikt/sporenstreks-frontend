import React, { useEffect, useRef } from 'react';
import Vis from '../Vis';
import { erSynligIViewport } from '../../util/browser-utils';
import { Undertittel } from 'nav-frontend-typografi';
import './FeilOppsummering.less';
import { useAppStore } from '../../data/store/AppStore';
import { ErrorObject } from '../../data/types/sporenstreksTypes';

interface FeiloppsummeringProps {
  settFokus?: boolean;
}

type FeilProps = FeiloppsummeringProps;

const FeilOppsummering = (props: FeilProps) => {
  const { errors } = useAppStore();
  const oppsummering = useRef<HTMLDivElement>(null);
  const { settFokus } = props;

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
      <Vis hvis={errors.length > 0}>
        <div ref={oppsummering} tabIndex={0} role='region' className='feiloppsummering'>
          <Undertittel>{'Det er ' + errors.length + ' feil i skjemaet'}</Undertittel>
          <ul className='feiloppsummering__liste'>
            {errors.map((error: ErrorObject, index) => (
              <li key={index}>
                <div role='link' className='lenke' tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, error)}
                  onClick={() => handleClick(error)}
                >
                  {error.errorMessage}
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
