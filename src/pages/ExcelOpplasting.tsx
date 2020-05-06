import React, {useState} from 'react';
import 'nav-frontend-tabell-style';
import {FormContext, useForm} from 'react-hook-form';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Ingress, Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import {useAppStore} from '../data/store/AppStore';
import {History} from 'history';
import Vis from '../components/Vis';
import env from '../util/environment';
import './ExcelOpplasting.less';
import Lenke from "nav-frontend-lenker";
import excellogo from '../img/excel-logo.png';
import { Erklaring } from '../components/ansatte/Erklaring';
import { FeilTabell, tabellFeil } from '../components/feilvisning/FeilTabell';
import InnloggetSide from "./InnloggetSide";


const ExcelOpplasting = () => {
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
  const pathname = useLocation().pathname

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
                history.push( '/kvittering',
                    {
                      from: pathname,
                      message: "Last opp en ny fil"
                    }
                    )
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
    <InnloggetSide>
    <div className="excelopplasting">
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
          <div className="container limit">
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
          <div className="container limit">
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
                  className="excelform container limit"
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
    </InnloggetSide>
  );
};

export default ExcelOpplasting;
