import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import 'nav-frontend-tabell-style';
import { Input } from 'nav-frontend-skjema';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import 'react-datepicker/dist/react-datepicker.css';
import { Keys } from '../locales/keys';
import { RootState } from '../store/rootState';
import { ErrorObject, ErrorType, RefusjonsKrav, Ytelsesperiode } from '../store/types/sporenstreksTypes';
import { fetchArbeidsgivere } from '../store/thunks/fetchArbeidsgivere';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { Knapp } from 'nav-frontend-knapper';
import { dateToString } from "../util/dateToString";
import { submitRefusjon } from "../store/thunks/submitRefusjon";
import AlertStripe from "nav-frontend-alertstriper";
import Perioder from './Perioder';
import FormKomp from './FormKomp';
import './Sykepenger.less';
import { filterStringToNumbersOnly } from "../util/filterStringToNumbersOnly";
import { identityNumberSeparation } from "../util/identityNumberSeparation";

const mockOrganisasjoner: Organisasjon[] = [
  {
    Name: 'Firmaet AS',
    Type: 'Aksjeselskap',
    OrganizationNumber: '123456789',
    OrganizationForm: 'Aksjeselskap',
    Status: 'PÅBEGYNT',
    ParentOrganizationNumber: '987654321',
  }
];

type OwnProps = {
  t: (str: string) => string
  history: History
}

type StateProps = {
  arbeidsgivere: Organisasjon[]
  ytelsesperioder: Ytelsesperiode[]
  refusjonErrors?: ErrorObject[],
  refusjonLoading: boolean,
}

type DispatchProps = {
  fetchArbeidsgivere: () => void
  submitRefusjon: (refusjonsKrav: RefusjonsKrav) => void
}

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  identityNumberInput: string
  arbeidsgiverId: string
  daysInput: string
  amountInput: string
  fom?: Date
  tom?: Date
}

class Sykepenger extends Component<Props, State> {
  state: State = {
    identityNumberInput: '',
    arbeidsgiverId: '',
    daysInput: '',
    amountInput: '',
  };
  
  componentDidMount = async(): Promise<void> => {
    this.props.fetchArbeidsgivere();
  };

  setIdentityNumberInput = (input: string) =>
    this.setState({ identityNumberInput: filterStringToNumbersOnly(input, 11) });
  
  submitRefusjon = (): void => {
    
    // todo: validering av inputs
    const refusjonsKrav: RefusjonsKrav = {
      identitetsnummer: this.state.identityNumberInput,
      virksomhetsnummer: this.state.arbeidsgiverId,
      perioder: [
        {
          fom: dateToString(this.state.fom!),
          tom: dateToString(this.state.tom!),
          antallDagerMedRefusjon: parseInt(this.state.daysInput),
        }
      ],
      beløp: parseInt(this.state.amountInput)
    };
    this.props.submitRefusjon(refusjonsKrav);
  };
  
  render() {
    const {
      t, history, arbeidsgivere, ytelsesperioder, refusjonErrors, refusjonLoading,
    } = this.props;
    const { amountInput, daysInput, identityNumberInput, fom, tom } = this.state;
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
            {
              refusjonErrors?.map(error => error.errorType in ErrorType
                ? <AlertStripe type="feil">{t(error.errorType)}</AlertStripe>
                : <AlertStripe type="feil">{error.errorMessage}</AlertStripe>
              )
            }
            <div className="sykepenger--arbeidstaker">
              <Undertittel className="sykepenger--undertittel">
                Hvilken arbeidstaker gjelder søknaden?
              </Undertittel>
              <Input
                label="Fødselsnummer til arbeidstaker"
                bredde="M"
                onChange={e => this.setIdentityNumberInput(e.target.value)}
                value={identityNumberSeparation(identityNumberInput)}
              />
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
              {/*<DatePicker*/}
              {/*  className="form-control"*/}
              {/*  locale="nb"*/}
              {/*  dateFormat="dd.MM.yy"*/}
              {/*  selected={fom}*/}
              {/*  onChange={e => this.setState({ fom: e })}*/}
              {/*  showYearDropdown*/}
              {/*  ariaLabelledBy="periode fra"*/}
              {/*/>*/}
              {/*<b>-</b>*/}
              {/*<DatePicker*/}
              {/*  className="form-control"*/}
              {/*  locale="nb"*/}
              {/*  dateFormat="dd.MM.yy"*/}
              {/*  selected={tom}*/}
              {/*  onChange={e => this.setState({ tom: e })}*/}
              {/*  showYearDropdown*/}
              {/*  ariaLabelledBy="periode til"*/}
              {/*/>*/}
            </div>

            <Undertittel className="sykepenger--undertittel">Hvor mye ønskes refundert?</Undertittel>
            <Input
              label="Beløp"
              type="number"
              bredde="S"
              value={amountInput}
              onChange={e => this.setState({amountInput: e.target.value})}
            />
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
  refusjonErrors: state.helseSpionState.refusjonErrors,
  refusjonLoading: state.helseSpionState.refusjonSubmitting
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => bindActionCreators({
  fetchArbeidsgivere,
  submitRefusjon,
}, dispatch);

export default withRouter(withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Sykepenger)));
