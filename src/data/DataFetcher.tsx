import React, { useEffect, useRef, useState } from 'react';
import Spinner from 'nav-frontend-spinner';
import useFetch from './rest/use-fetch';
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils';
import { useAppStore } from './store/AppStore';
import IngenData from '../pages/IngenData';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { convertResponseDataToOrganisasjon } from './convertResponse';
import env from '../util/environment';
import { unleashKeys } from './mock/data/toggles';
import { UnleashToggles } from './types/sporenstreksTypes';

export function DataFetcher(props: { children: any }) {
  const { setUnleash, setArbeidsgivere } = useAppStore();
  const unleash = useFetch<{}>();
  const arbeidsgivere = useFetch<Organisasjon[]>();
  const [ hasTimedOut, setHasTimedOut ] = useState(false);
  const arbeidsgivereRef = useRef(arbeidsgivere);
  arbeidsgivereRef.current = arbeidsgivere;

  useEffect(() => {
    if (isNotStarted(unleash)) {
      unleash.fetch(env.unleashUrl, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(unleashKeys),
        headers: { 'Content-Type': 'application/json' }
      }, (fetchState: FetchState<UnleashToggles>) => {
        setUnleash(fetchState.data!);
      })
    }

    if (isNotStarted(arbeidsgivere)) {
      arbeidsgivere.fetch(env.baseUrl + '/api/v1/arbeidsgivere', {
        credentials: 'include',
      }, (fetchState: FetchState<Organisasjon[]>) => {
        if (hasData(fetchState)) {
          setArbeidsgivere(convertResponseDataToOrganisasjon(fetchState.data));
        }
      })
    }
    // eslint-disable-next-line
  }, [ arbeidsgivere ]);

  useEffect(() => {
    setTimeout(checkHasTimedOut, 5000);
    // eslint-disable-next-line
  }, []);

  function checkHasTimedOut() {
    if (isAnyNotStartedOrPending([ arbeidsgivereRef.current ])) {
      setHasTimedOut(true);
    }
  }

  if (hasTimedOut) {
    return <IngenData />;
  }

  if (isAnyNotStartedOrPending([ unleash, arbeidsgivere ])) {
    return <Spinner type={'XXL'} className="sporenstreks-spinner" />;

  } else if (hasAny401([ unleash, arbeidsgivere ])) {
    window.location.href = env.loginServiceUrl;

  } else if (hasAnyFailed([ unleash, arbeidsgivere ])) {
    return <IngenData />;
  }

  return props.children;
}
