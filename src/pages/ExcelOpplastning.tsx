import React, {useState} from 'react';
import 'nav-frontend-tabell-style';
import {FormContext, useForm} from 'react-hook-form';
import {Hovedknapp, Knapp} from 'nav-frontend-knapper';
import {Link, useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Ingress, Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import {Keys} from '../locales/keys';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import {Organisasjon} from '@navikt/bedriftsmeny/lib/Organisasjon';
import {useAppStore} from '../data/store/AppStore';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {History} from 'history';
import Vis from '../components/Vis';
import env from '../util/environment';
import './ExcelOpplastning.less';
import Lenke from "nav-frontend-lenker";
import excellogo from '../img/excel-logo.png';
import save from 'save-file'
import Hjelpetekst from "nav-frontend-hjelpetekst";
import {PopoverOrientering} from "nav-frontend-popover";
import { Erklaring } from '../components/ansatte/Erklaring';

interface Feil {
  melding: string,
  indeks: number,
  kolonne?: number
}

const ExcelOpplastning = () => {
  const {arbeidsgivere} = useAppStore();
  const [arbeidsgiverId, setArbeidsgiverId] = useState<string>('');
  const [ erklæringAkseptert, setErklæringAkseptert ] = useState<boolean>(false);
  const methods = useForm();
  const {t} = useTranslation();
  const history: History = useHistory();
  const [fileName, setFileName] = useState('Last opp utfylt Excel-mal');
  const [file, setFile] = useState(undefined);
  const [feil, setFeil] = useState<Feil[]>([]);
  const [visAlleFeil, setVisAlleFeil] = useState(false)
  const FILEUPLOAD_MAX_SIZE = 250000;

  const setUploadFile = (event: any) => {
    if (event.target.files[0] && event.target.files[0].size > FILEUPLOAD_MAX_SIZE) {
      setFeil([{indeks: -1, melding: "Du kan ikke laste opp filer større enn 250 kB."}])
    } else {
      setFileName(event.target.files[0].name);
      setFile(event.target.files[0]);
      setFeil([]);
    }
  }


  function createFormData() {
    const formData = new FormData();
    if (file) {
      // @ts-ignore
      formData.append(fileName, file)
    }
    return formData
  }

  const feilVisningsTabell = () => {
    if (feil.length == 0) {
      return;
    } else if (feil.length > 10) {

      let gruppertFeil = feil.reduce(
        function (gruppert, feil) {
          let feilGruppering = gruppert.find((el) => {
            return (el.kolonne == feil.kolonne && el.melding == feil.melding)
          })
          if (feilGruppering) {
            feilGruppering.indeks += 1

          } else {
            gruppert.push({indeks: 1, melding: feil.melding, kolonne: feil.kolonne})
          }
          return gruppert
        }, [] as Feil[]
      )

      if (visAlleFeil) {
        return feilvisningsTabellVanlig()
      } else {
        return feilvisningsTabellGruppert(gruppertFeil)
      }

    } else {
      return (feilvisningsTabellVanlig())
    }
  }

  const feilvisningsTabellGruppert = (gruppertFeil: Feil[]) => {
    return (
      <span className="feiloppsummeringTabell feiloppsummering">
              <Ingress>{feil.length} feil i dokumentet må utbedres før du laster det opp på nytt:</Ingress>
              <table className="tabell tabell--stripet">
                <thead>
                <tr>
                  <th>Feilmelding</th>
                  <th>Kolonne</th>
                  <th>Antall feil</th>
                </tr>
                </thead>
                  <tbody>
                  {gruppertFeil.sort((x, y) => y.indeks - x.indeks).map((f, index) => (
                    <tr key={index}>
                      <td>{f.melding}</td>
                      <td>{f.kolonne}</td>
                      <td>{f.indeks}</td>
                    </tr>
                  ))}
                  </tbody>
                <tfoot>
                  <tr>
                    <th>
                      <Knapp onClick={() => setVisAlleFeil(!visAlleFeil)}>Vis alle rader med feilmelding</Knapp>
                    </th>
                  </tr>
                </tfoot>
              </table>
          </span>
    )
  }

  const feilvisningsTabellVanlig = () => {
    return (
      <span className="feiloppsummeringTabell feiloppsummering">
        <div className="tabellOverflow">
          <Ingress>Følgende feil i dokumentet må utbedres før du laster det opp på nytt:</Ingress>
            <table className="tabell tabell--stripet">
              <tbody>
              {feil.sort((x, y) => x.indeks - y.indeks).map((f, index) => (
                <tr key={index}>
                  <td>{(f.indeks < 0 ? "" : "Rad " + f.indeks)}</td>
                  <td>{(f.kolonne && f.kolonne < 0 ? "" : f.kolonne)}</td>
                  <td>{f.melding}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        <Vis hvis={feil.length > 10}>
          <Knapp className="toggleFeilvisning"
                 onClick={() => setVisAlleFeil(!visAlleFeil)}>
            Vis feilmeldingsammendrag</Knapp>
        </Vis>
      </span>
    )
  }


  const onSubmit = async (e: any): Promise<void> => {

    const FETCH_TIMEOUT = 5000;
    let didTimeOut = false;

    new Promise((resolve, reject) => {
      const timeout = setTimeout(function () {
        didTimeOut = true;
        reject(new Error('Request timed out'));
      }, FETCH_TIMEOUT);

      fetch(env.baseUrl + '/api/v1/bulk/upload', {
        method: 'POST',
        body: createFormData(),
      }).then((response: Response) => {
        clearTimeout(timeout);
        if (!didTimeOut) {
          switch (response.status) {
            case 401: {
              window.location.href = env.loginServiceUrl;
              break;
            }
            case 200: {
              response.blob().then(data => {
                  save(data, "nav_refusjon_kvittering.xlsx")
                  history.push('/kvitteringExcel')
                  setFeil([])
                }
              )
              break;
            }
            case 422: {
              response.json().then(data => {
                let f: Feil[] =
                  data.problemDetails.map(violation => ({
                    indeks: violation.row,
                    kolonne: violation.column,
                    melding: violation.message

                  }));

                if (f.length > 0) {
                  setFeil(f)
                } else {
                  setFeil([{indeks: -1, melding: data.detail}])
                }
              });
              break;
            }
            default: {
              let f: Feil = {melding: "Feil ved innsending av skjema.", indeks: -1}
              setFeil([f])
              break;
            }
          }
        }
      }).catch(err => {
        if (didTimeOut) return;
        reject(err);
      });
    }).catch(err => {
      let f: Feil = {melding: "Feil ved innsending av skjema.", indeks: -1}
      setFeil([f])
    });
  };


  return (
    <div className="excelOpplastning">
      <Vis hvis={arbeidsgivere.length === 0}>
        <div className="limit">
          <AlertStripeAdvarsel>
            <div>Du har ikke rettigheter til å søke om refusjon for noen bedrifter</div>
            <div>Tildeling av roller foregår i Altinn</div>
            <Link to="/min-side-arbeidsgiver/informasjon-om-tilgangsstyring"
                  className="lenke informasjonsboks__lenke">
              Les mer om roller og tilganger.
            </Link>
          </AlertStripeAdvarsel>
        </div>
      </Vis>

      <Vis hvis={arbeidsgivere.length > 0}>
        <Bedriftsmeny
          history={history}
          onOrganisasjonChange={(org: Organisasjon) => setArbeidsgiverId(org.OrganizationNumber)}
          sidetittel={t(Keys.MY_PAGE)}
          organisasjoner={arbeidsgivere}
        />
        <div className="limit">
          <AlertStripeAdvarsel>
            <Lenke
              href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
              Vi ber offentlig sektor vente med å søke.
            </Lenke>
          </AlertStripeAdvarsel>
          <Ingress className="container">
            Vanligvis skal arbeidsgiveren betale sykepenger de første
            16 kalenderdagene (arbeidsgiverperioden) av et sykefravær.
            I forbindelse med korona-pandemien kan arbeidsgiveren søke om refusjon
            fra og med fjerde dag i arbeidsgiverperioden.
            Dette gjelder hvis den ansatte enten er smittet, mistenkt smittet eller i pålagt karantene.
            <br/><br/>
            Det kan ikke søkes om refusjon for fravær på grunn av stengte skoler eller barnehager.
            <br/><br/>
            <b>Her kan du laste opp en Excel-oversikt over de ansatte det gjelder,
              for å søke om refusjon for de siste 13 dagene av arbeidsgiverperioden.</b>
          </Ingress>
          <div className="container">
            <Innholdstittel>Last ned Excel-malen, fyll ut og last opp.</Innholdstittel>
            <Normaltekst>
              Har du ansatte som har vært borte i to eller flere ikke-sammenhengende perioder
              <Link to="/enkel" className="lenke">&nbsp;skal du bruke et eget skjema som du finner her</Link>.
              Denne metoden er tiltenkt dere som har svært mange refusjonskrav.
              Vi har også et &nbsp;
              <Link to="/bulk" className="lenke">
                eget skjema for å søke om refusjonskrav for flere ansatte
              </Link> &nbsp;
              dersom dere foretrekker å gjøre det på den måten.
            </Normaltekst>
            <br/><br/>
            <Normaltekst>
              <img src={excellogo} width="35" className="excelLogo"/>
              <Lenke href={env.baseUrl + "/api/v1/bulk/template"}>
                Last ned malen her</Lenke>, og fyll ut.
              Det er ikke mulig å benytte ditt eget excel-dokument,
              alt må fylles ut i denne malen før du laster opp.
            </Normaltekst>
          </div>
          <div className="container">
            <Normaltekst>
              NB, det kan maks legges inn 5000 linjer per excel-doc.
              Om det ikke er tilstrekkelig må dere gjøre dette i flere omganger.
            </Normaltekst>
            <label className="knapp filKnapp">
              <input className="fileinput"
                     type="file"
                     id="fileUploader"
                     accept=".xls,.xlsx"
                     onChange={setUploadFile}
                      onClick={(e: any) => e.target.value = null}/>
              {fileName}
            </label>
            {feilVisningsTabell()}
          </div>
          <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="excelform container">
            <Erklaring value={erklæringAkseptert} handleSetErklæring={value => setErklæringAkseptert(value)}/>
              <Hovedknapp disabled={!(erklæringAkseptert && file != undefined)} className="knapp filKnapp">
                Send søknad om refusjon</Hovedknapp>
            </form>
          </FormContext>
        </div>
      </Vis>
    </div>
  );
};

export default ExcelOpplastning;
