import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../store/rootState";
import 'nav-frontend-tabell-style';
import 'nav-frontend-skjema-style';
import { ErrorType, Ytelsesperiode } from "../store/types/helseSpionTypes";
import { Input } from "nav-frontend-skjema";
import { Søkeknapp } from 'nav-frontend-ikonknapper';
import './ArbeidsgiverPeriodeTabell.less';
import Lenke from "nav-frontend-lenker";
import { Innholdstittel } from "nav-frontend-typografi";
import 'nav-frontend-alertstriper-style';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchPerson } from "../store/thunks/fetchPerson";
import { identityNumberSeparation } from "../util/identityNumberSeparation";
import AlertStripe from "nav-frontend-alertstriper";
import { withTranslation } from "react-i18next";
import { Keys } from "../locales/keys";
import { filterStringToNumbersOnly } from "../util/filterStringToNumbersOnly";
import YtelsesperiodeTable from "./YtelsesperiodeTable";
import { fetchArbeidsgivere } from "../store/thunks/fetchArbeidsgivere";
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { withRouter } from 'react-router-dom';
import { Organisasjon } from "@navikt/bedriftsmeny/lib/Organisasjon";
import NavFrontendSpinner from 'nav-frontend-spinner';

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

class ArbeidsgiverPeriodeTabell extends Component<Props, State> {
  state: State = {
    identityNumberInput: '',
    arbeidsgiverId: '',
  };
  
  componentDidMount = async (): Promise<void> => {
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
      t, history, arbeidsgivere, ytelsesperioder, personErrorType, personErrorMessage, personLoading
    } = this.props;
    const { identityNumberInput, fom, tom } = this.state;
    const arbeidstaker = ytelsesperioder[0]?.arbeidsforhold.arbeidstaker;
    
    if (arbeidstaker) {
      document.title = `${t(Keys.REFUNDS)}/${arbeidstaker.fornavn} ${arbeidstaker.etternavn} - www.nav.no`;
    } else {
      document.title = `${t(Keys.DOCUMENT_TITLE)}/${t(Keys.REFUNDS)} - www.nav.no`;
    }
    
    return (
      <div className="arbeidsgiver-periode-tabell">
        <Bedriftsmeny
          history={history}
          onOrganisasjonChange={(org: Organisasjon) => this.setState({arbeidsgiverId: org.OrganizationNumber})}
          sidetittel={t(Keys.MY_PAGE)}
          organisasjoner={arbeidsgivere}
        />
        <div className="container">
          <Lenke href="">&lt;&lt; {t(Keys.ALL_REFUNDS)}</Lenke>
          <div className="arbeidsgiver-periode-tabell--header">
            <div className="arbeidsgiver-periode-tabell--info-gruppe">
              {
                arbeidstaker &&
                <>
                  <div className="arbeidsgiver-periode-tabell--person-nummer">
                    {t(Keys.IDENTITY_NUMBER)}: {identityNumberSeparation(arbeidstaker.identitetsnummer)}
                  </div>
                  <Innholdstittel id="arbeidsgiver-periode-tabell--person-navn">
                    {arbeidstaker.fornavn} {arbeidstaker.etternavn}
                  </Innholdstittel>
                </>
              }
            </div>
          <div className="row arbeidsgiver-periode-tabell--søke-gruppe">
            <div className="col col-md-6 col-sm-12 arbeidsgiver-periode-tabell--periode-velger form-group">
              <label id="periode">{t(Keys.PERIOD)}:</label>
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
            <div className="col col-md-6 col-sm-12 arbeidsgiver-periode-tabell--person-gruppe-container">
              <div className="arbeidsgiver-periode-tabell--person-gruppe">
                <Input
                  className="arbeidsgiver-periode-tabell--søke-input"
                  label={t(Keys.FIND_OTHER_EMPLOYEE)}
                  placeholder={t(Keys.IDENTITY_NUMBER_EXT)}
                  onChange={e => this.setIdentityNumberInput(e.target.value)}
                  value={identityNumberSeparation(identityNumberInput)}
                  onKeyDown={this.onEnterClick}
                />
                <div>
                  <label className="skjemaelement__label">&nbsp;</label>
                  <Søkeknapp
                    disabled={this.state.identityNumberInput.length < 11 || personLoading }
                    className="arbeidsgiver-periode-tabell--søke-knapp"
                    onClick={this.submitSearch}
                  >
                    <span>{t(Keys.SEARCH)}</span>
                  </Søkeknapp>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {
                personErrorType &&
                (
                  personErrorType in ErrorType
                    ? <AlertStripe type="feil">{t(personErrorType)}</AlertStripe>
                    : <AlertStripe type="feil">{personErrorMessage}</AlertStripe>
                )
              }
              {
                personLoading &&
                <div className="arbeidsgiver-periode-tabell--loading-spinner"> <NavFrontendSpinner /> </div>
              }
              {
                ytelsesperioder.length > 0 && !personLoading &&
                <YtelsesperiodeTable ytelsesperioder={ytelsesperioder} fom={fom} tom={tom}/>
              }
            </div>
          </div>
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

export default withRouter(withTranslation()(connect(mapStateToProps, mapDispatchToProps)(ArbeidsgiverPeriodeTabell)));
