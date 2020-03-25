import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import 'nav-frontend-tabell-style';
import { Input } from 'nav-frontend-skjema';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Keys } from '../locales/keys';
import { RootState } from '../store/rootState';
import { fetchPerson } from '../store/thunks/fetchPerson';
import { Ytelsesperiode } from '../store/types/helseSpionTypes';
import { filterStringToNumbersOnly } from '../util/filterStringToNumbersOnly';
import { fetchArbeidsgivere } from '../store/thunks/fetchArbeidsgivere';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import './Sykepenger.less';
import { Knapp } from 'nav-frontend-knapper';

type OwnProps = {
  t: (str: string) => string
  history: History
}

type StateProps = {
  arbeidsgivere: Organisasjon[]
  ytelsesperioder: Ytelsesperiode[]
  personErrorType?: string,
  personErrorMessage?: string,
  personLoading: boolean,
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

  setIdentityNumberInput = (input: string) =>
    this.setState({ identityNumberInput: filterStringToNumbersOnly(input, 11) });

  onEnterClick = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.submitSearch();
    }
  };

  submitSearch = (): void => {
    this.setState({ fom: undefined, tom: undefined });
    this.props.fetchPerson(this.state.identityNumberInput, this.state.arbeidsgiverId);
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
        <Bedriftsmeny
          history={history}
          onOrganisasjonChange={(org: Organisasjon) => this.setState({ arbeidsgiverId: org.OrganizationNumber })}
          sidetittel={t(Keys.MY_PAGE)}
          organisasjoner={arbeidsgivere}
        />
        <div className="container">
          <div className="sykepenger--arbeidstaker">
            <Undertittel className="sykepenger--undertittel">Hvilken arbeidstaker gjelder søknaden?</Undertittel>
            <Input label="Fødselsnummer til arbeidstaker" bredde="M" />
          </div>
        </div>

        <div className="container">
          <div className="sykepenger--periode-velger form-group">
            <Undertittel className="sykepenger--undertittel">Hvilken periode har den ansatte vært fraværende?</Undertittel>
            <Undertekst className="sykepenger--undertekst">Fra og med første, til og med siste fraværsdag</Undertekst>
            <Normaltekst tag="label" id="periode">{t(Keys.PERIOD)}:</Normaltekst>
            <DatePicker
              className="form-control"
              locale="nb"
              dateFormat="dd.MM.yy"
              selected={fom}
              onChange={e => this.setState({ fom: e })}
              showYearDropdown
              ariaLabelledBy="periode fra"
            />
            <b>-</b>
            <DatePicker
              className="form-control"
              locale="nb"
              dateFormat="dd.MM.yy"
              selected={tom}
              onChange={e => this.setState({ tom: e })}
              showYearDropdown
              ariaLabelledBy="periode til"
            />
          </div>

          <Undertittel className="sykepenger--undertittel">Hvor mange dager ønsker dere refundert?</Undertittel>
          <Undertekst className="sykepenger--undertekst">NAV dekker ifm. coronaviruset inntil 13 av de 16 dagene som vanligvis er arbeidsgivers ansvar</Undertekst>
          <Input label="Antall dager" type="number" bredde="XS" />
        </div>

        <div className="container">
          <Undertittel className="sykepenger--undertittel">Hvor mye ønskes refundert?</Undertittel>
          <Input label="Beløp" bredde="S" />
        </div>

        <div className="container">
          <Knapp type="hoved">Send refusjonssøknad</Knapp>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  arbeidsgivere: state.helseSpionState.arbeidsgivere,
  ytelsesperioder: state.helseSpionState.ytelsesperioder,
  personErrorType: state.helseSpionState.personErrorType,
  personErrorMessage: state.helseSpionState.personErrorMessage,
  personLoading: state.helseSpionState.personLoading
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators({
  fetchPerson,
  fetchArbeidsgivere,
}, dispatch);

export default withRouter(withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Sykepenger)));
