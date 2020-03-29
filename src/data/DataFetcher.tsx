import React, { useEffect } from 'react';
import Spinner from 'nav-frontend-spinner';
import useFetch from './rest/use-fetch';
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils';
import { useAppStore } from './store/AppStore';
import { useHistory } from 'react-router-dom';
import IngenData from '../pages/IngenData';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { convertResponseDataToOrganisasjon } from './convertResponse';

export function DataFetcher(props: { children: any }) {
  const { setArbeidsgivere } = useAppStore();
  const history = useHistory();
  const arbeidsgivere = useFetch<Organisasjon[]>();

  useEffect(() => {
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
    history.push(process.env.REACT_APP_LOGIN_SERVICE_URL ?? '')

  } else if (hasAnyFailed([ arbeidsgivere ])) {
    return <IngenData />;
  }

  return props.children;
}
