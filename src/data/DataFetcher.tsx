import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import useFetch from './rest/use-fetch';
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils';
import { useAppStore } from './store/AppStore';
import { UnleashToggles } from './types/sporenstreksTypes';
import IngenData from '../pages/IngenData';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { unleashKeys } from './mock/data/toggles';
import env from '../util/environment';
import { convertResponseDataToOrganisasjon } from '../store/thunks/fetchArbeidsgivere';

export function DataFetcher(props: { children: any }) {
  const { setArbeidsgivere } = useAppStore();
  // const unleash = useFetch<{}>();
  const arbeidsgivere = useFetch<Organisasjon[]>();

  useEffect(() => {
/*
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
*/

    if (isNotStarted(arbeidsgivere)) {
      arbeidsgivere.fetch(process.env.REACT_APP_BASE_URL + '/api/v1/arbeidsgivere', {
        credentials: 'include',
      }, (fetchState: FetchState<Organisasjon[]>) => {
        if (hasData(fetchState)) {
          setArbeidsgivere(convertResponseDataToOrganisasjon(fetchState.data));
        }
      })
    }

    // eslint-disable-next-line
  }, [ arbeidsgivere ]);

  if (isAnyNotStartedOrPending([ arbeidsgivere ])) {
    return <Spinner />;

  } else if (hasAny401([ arbeidsgivere ])) {
    window.location.href = `${hentLoginUrl()}?redirect=${window.location.origin}/nettrefusjon`;

  } else if (hasAnyFailed([ arbeidsgivere ])) {
    return <IngenData />;
  }

  return props.children;
}

export const hentLoginUrl = () => {
  window.localStorage.setItem('REDIRECT_ETTER_LOGIN', window.location.href);
  return env.loginServiceUrl
};
