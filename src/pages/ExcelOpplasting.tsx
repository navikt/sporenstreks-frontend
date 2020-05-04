import React, {useState} from 'react';
import 'nav-frontend-tabell-style';
import {FormContext, useForm} from 'react-hook-form';
import {Hovedknapp} from 'nav-frontend-knapper';
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
import './ExcelOpplasting.less';
import Lenke from "nav-frontend-lenker";
import excellogo from '../img/excel-logo.png';
import save from 'save-file'
import { Erklaring } from '../components/ansatte/Erklaring';
import { FeilTabell, tabellFeil } from '../components/feilvisning/FeilTabell';


const ExcelOpplasting = () => {
  const {arbeidsgivere} = useAppStore();
  const [arbeidsgiverId, setArbeidsgiverId] = useState<string>('');
  const [ erklæringAkseptert, setErklæringAkseptert ] = useState<boolean>(false);
  const methods = useForm();
  const {t} = useTranslation();
  const history: History = useHistory();
  const [fileName, setFileName] = useState('Last opp utfylt Excel-mal');
  const [file, setFile] = useState(undefined);
  const [feil, setFeil] = useState<tabellFeil[]>([]);
  const [visAlleFeil, setVisAlleFeil] = useState(false)
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false)
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
                let f: tabellFeil[] =
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
              let f: tabellFeil = {melding: "Feil ved innsending av skjema.", indeks: -1}
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
      let f: tabellFeil = {melding: "Feil ved innsending av skjema.", indeks: -1}
      setFeil([f])
    });
  };

  return (
    <div className="excelopplasting">
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

        <div className="limit"  style={{padding: "2rem 0rem 1rem 0rem"}}>
          <a href="/min-side-arbeidsgiver/"
             className="lenke informasjonsboks__lenke"
             style={{paddingLeft: "1rem"}}>
            &lt;&lt;Min side arbeidsgiver
          </a>
        </div>

        <div className="limit bakgrunn">
          <Ingress className="container">
            Når sykefraværet handler om korona, dekker NAV sykepenger fra dag 4 i de 16 dagene
            arbeidsgiveren vanligvis skal betale. Den ansatte må være smittet,
            mistenkt smittet eller i pålagt karantene.
            Refusjon kan gis for dager fra og med 16. mars.&nbsp;
            <Lenke
              href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
              Se mer informasjon om refusjonsordningen.
            </Lenke>
            <br/><br/>
            <b>Det kan ikke søkes om refusjon for fravær på grunn av stengte skoler eller barnehager.</b>
          </Ingress>
          <div className="container">
            <Innholdstittel>Last ned Excel-malen, fyll ut og last opp.</Innholdstittel>
            <Normaltekst>
              Har du ansatte som har vært borte i to eller flere ikke-sammenhengende perioder
              <Link to="/enkel" className="lenke">&nbsp;skal du bruke et eget skjema</Link>.
              Excel-opplasting er tiltenkt dere som har svært mange refusjonskrav.

              Vi har også et &nbsp;
              <Link to="/bulk" className="lenke">
                eget skjema for å søke om refusjonskrav for flere ansatte</Link>
              &nbsp; dersom dere foretrekker å gjøre det på den måten.
            </Normaltekst>
            <br/><br/>
            <Normaltekst>
              <img src={excellogo}
                   width="35"
                   className="excelopplasting__excellogo"
              alt="Excel-symbol"/>
              <Lenke href={env.baseUrl + "/api/v1/bulk/template"}>
                Last ned malen her</Lenke>, og fyll ut.
              Det er ikke mulig å benytte ditt eget excel-dokument,
              alt må fylles ut i denne malen før du laster opp.
            </Normaltekst>
          </div>
          <div className="container">
            <Normaltekst>
              NB, det kan maks legges inn 5000 linjer per excel-doc.
              Om det ikke er tilstrekkelig, må dere gjøre dette i flere omganger.
            </Normaltekst>
            <label className="knapp filknapp">
              <input className="fileinput"
                     type="file"
                     id="fileUploader"
                     accept=".xls,.xlsx"
                     onChange={setUploadFile}
                      onClick={(e: any) => e.target.value = null}/>
              {fileName}
            </label>
            <FeilTabell
              feil={feil}
              visAlleFeil={visAlleFeil}
              handleSetVisAlleFeil={visAlleFeil => setVisAlleFeil(visAlleFeil)}/>
          </div>
          <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}
                  className="excelform container"
                  onClick={e => setHasTriedSubmit(true)}>
            <Erklaring value={erklæringAkseptert} handleSetErklæring={value => setErklæringAkseptert(value)}/>
              <Hovedknapp disabled={!(erklæringAkseptert && file !== undefined)} className="knapp filknapp">
                Send søknad om refusjon</Hovedknapp>
              <Vis hvis={hasTriedSubmit}>
                <Vis hvis={!erklæringAkseptert}>
                  <Normaltekst className="advarsel">Du må huke av erklæringen før du kan sende inn</Normaltekst>
                </Vis>
                <Vis hvis={file === undefined}>
                  <Normaltekst className="advarsel">Du må laste opp Excel-skjemaet som skal sendes inn</Normaltekst>
                </Vis>
              </Vis>
            </form>
          </FormContext>
        </div>
      </Vis>
    </div>
  );
};

export default ExcelOpplasting;
