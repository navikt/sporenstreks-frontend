import React, { useEffect, useState } from 'react';
import Spinner from 'nav-frontend-spinner';
import useFetch from './rest/use-fetch';
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils';
import { useAppStore } from './store/AppStore';
import IngenData from '../pages/IngenData';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { convertResponseDataToOrganisasjon } from './convertResponse';
import env from '../util/environment';

export function DataFetcher(props: { children: any }) {
  const { setArbeidsgivere } = useAppStore();
  const [ hasTimedOut, setHasTimedOut ] = useState(false);
  const arbeidsgivere = useFetch<Organisasjon[]>();

  useEffect(() => {
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
    if (isAnyNotStartedOrPending([ arbeidsgivere ])) {
      setHasTimedOut(true);
    }
  }

  if (hasTimedOut) {
    return <IngenData />;
  }

  if (isAnyNotStartedOrPending([ arbeidsgivere ])) {
    return <Spinner type={'XXL'} className="sporenstreks-spinner" />;

  } else if (hasAny401([ arbeidsgivere ])) {
    window.location.href = env.loginServiceUrl;

  } else if (hasAnyFailed([ arbeidsgivere ])) {
    return <IngenData />;
  }

  return props.children;
}
