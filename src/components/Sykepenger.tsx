import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import 'nav-frontend-tabell-style';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import { Keys } from '../locales/keys';
import NumberFormat from 'react-number-format';
import { RootState } from '../store/rootState';
import { fetchPerson } from '../store/thunks/fetchPerson';
import { Ytelsesperiode } from '../store/types/helseSpionTypes';
import { fetchArbeidsgivere } from '../store/thunks/fetchArbeidsgivere';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import Perioder from './Perioder';
import FormKomp from './FormKomp';
import './Sykepenger.less';

type OwnProps = {
  t: (str: string) => string
  history: History
}

type StateProps = {
  arbeidsgivere: Organisasjon[]
  ytelsesperioder: Ytelsesperiode[]
}

type DispatchProps = {
  fetchPerson: (identityNumber?: string, arbeidsgiverId?: string) => void
  fetchArbeidsgivere: () => void
}

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  identityNumberInput: string
  arbeidsgiverId: string
  fom?: Date
  tom?: Date
}

class Sykepenger extends Component<Props, State> {
  state: State = {
    identityNumberInput: '',
    arbeidsgiverId: '',
  };

  componentDidMount = async(): Promise<void> => {
    this.props.fetchArbeidsgivere();
  };

  render() {
    const {
      t, history, arbeidsgivere, ytelsesperioder
    } = this.props;
    const { fom, tom } = this.state;
    const arbeidstaker = ytelsesperioder[0]?.arbeidsforhold.arbeidstaker;

    if (arbeidstaker) {
      document.title = `${t(Keys.REFUNDS)}/${arbeidstaker.fornavn} ${arbeidstaker.etternavn} - www.nav.no`;
    } else {
      document.title = `${t(Keys.DOCUMENT_TITLE)}/${t(Keys.REFUNDS)} - www.nav.no`;
    }

    return (
      <div className="sykepenger">
        <FormKomp>
          <Bedriftsmeny
            history={history}
            onOrganisasjonChange={(org: Organisasjon) => this.setState({ arbeidsgiverId: org.OrganizationNumber })}
            sidetittel={t(Keys.MY_PAGE)}
            organisasjoner={arbeidsgivere}
          />
          <div className="container">
            <div className="sykepenger--arbeidstaker">
              <Undertittel className="sykepenger--undertittel">
                Hvilken arbeidstaker gjelder søknaden?
              </Undertittel>
              <Input label="Fødselsnummer til arbeidstaker" bredde="M" />
            </div>
          </div>

          <div className="container">
            <div className="sykepenger--periode-velger form-group">
              <Undertittel className="sykepenger--undertittel">
                Hvilken periode har den ansatte vært fraværende?
              </Undertittel>
              <Undertekst className="sykepenger--undertekst">
                NAV dekker ifm. coronaviruset inntil 13 av de 16 dagene som vanligvis er arbeidsgivers ansvar
              </Undertekst>
              <Perioder id="perioder" />
            </div>
          </div>

          <div className="container">
            <Undertittel className="sykepenger--undertittel">Hvor mye ønskes refundert?</Undertittel>
            <label htmlFor="belop">
              <Normaltekst tag="span">Beløp</Normaltekst>
            </label>
            <NumberFormat id="belop" customInput={Input} format={'### ### ### ###'} className="input--s" />
          </div>

          <div className="container">
            <Knapp type="hoved">Send refusjonssøknad</Knapp>
          </div>
        </FormKomp>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  arbeidsgivere: state.helseSpionState.arbeidsgivere,
  ytelsesperioder: state.helseSpionState.ytelsesperioder,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators({
  fetchPerson,
  fetchArbeidsgivere,
}, dispatch);

export default withRouter(withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Sykepenger)));
