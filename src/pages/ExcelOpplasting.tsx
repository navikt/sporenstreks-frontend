import React, {useState} from 'react';
import 'nav-frontend-tabell-style';
import {FormContext, useForm} from 'react-hook-form';
import {Hovedknapp} from 'nav-frontend-knapper';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Ingress, Innholdstittel, Normaltekst, Undertittel} from 'nav-frontend-typografi';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import {History} from 'history';
import Vis from '../components/Vis';
import env from '../util/environment';
import Lenke from "nav-frontend-lenker";
import excellogo from '../img/excel-logo.png';
import {Erklaring} from '../components/ansatte/Erklaring';
import {FeilTabell, tabellFeil} from '../components/feilvisning/FeilTabell';
import innsendingExcelFil from "../components/InnsendingExcelFil";
import InnloggetSide from "./InnloggetSide";
import Panel from "nav-frontend-paneler";
import Skillelinje from "../components/ansatte/Skillelinje";
import {Column, Row} from "nav-frontend-grid";

const ExcelOpplasting = () => {
  const [erklæringAkseptert, setErklæringAkseptert] = useState<boolean>(false);
  const methods = useForm();
  const {t} = useTranslation();
  const history: History = useHistory();
  const [fileName, setFileName] = useState('Last opp utfylt Excel-mal');
  const [file, setFile] = useState(undefined);
  const [feil, setFeil] = useState<tabellFeil[]>([]);
  const [visAlleFeil, setVisAlleFeil] = useState(false)
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false)
  const FILEUPLOAD_MAX_SIZE = 250000;

  const handleSubmit = async  (e: React.FormEvent): Promise<any> => {
    e.preventDefault();
    const responsFeil = await innsendingExcelFil(createFormData())
    if (responsFeil.length == 0) {
      setFeil([])
      history.push('/kvitteringExcel')
    } else {
      setFeil(responsFeil)
    }
  }

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

  return (
    <InnloggetSide className="excelopplasting">
      <Row>
        <Column>
          <Panel>
            <Ingress>
              Når sykefraværet handler om korona, dekker NAV sykepenger fra dag 4 i de 16 dagene
              arbeidsgiveren vanligvis skal betale. Den ansatte må være smittet,
              mistenkt smittet eller i pålagt karantene.
              Refusjon kan gis for dager fra og med 16. mars.&nbsp;
              <Lenke
                href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
                Se mer informasjon om refusjonsordningen.
              </Lenke>
            </Ingress>
          </Panel>
          <Panel>
            <Undertittel>
              Det kan ikke søkes om refusjon for fravær på grunn av stengte skoler eller barnehager.
            </Undertittel>
          </Panel>
        </Column>
      </Row>

      <Skillelinje/>

      <Row>
        <Column>
          <Panel>
            <Innholdstittel>Last ned Excel-malen, fyll ut og last opp.</Innholdstittel>
          </Panel>
          <Panel>
            <Normaltekst>
              Har du ansatte som har vært borte i to eller flere ikke-sammenhengende perioder
              <Lenke href="/enkel">
                &nbsp;skal du bruke et eget skjema
              </Lenke>.
              Excel-opplasting er tiltenkt dere som har svært mange refusjonskrav.
              Vi har også et &nbsp;
              <Lenke href="/bulk">
                eget skjema for å søke om refusjonskrav for flere ansatte
              </Lenke>
              &nbsp; dersom dere foretrekker å gjøre det på den måten.
            </Normaltekst>
          </Panel>
          <Panel>
            <Normaltekst>
              <img src={excellogo}
                   width="35"
                   className="excelopplasting__excellogo"
                   alt="Excel-symbol"/>
              <Lenke href={env.baseUrl + "/api/v1/bulk/template"}>
                Last ned malen her</Lenke>, og fyll ut.
              Det er ikke mulig å benytte ditt eget excel-dokument,
              alt må fylles ut i denne malen før du laster opp.
              NB, det kan maks legges inn 5000 linjer per excel-doc.
              Om det ikke er tilstrekkelig, må dere gjøre dette i flere omganger.
            </Normaltekst>
          </Panel>
        </Column>
      </Row>

      <Skillelinje/>

      <Row>
        <Column>
          <Panel>
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
          </Panel>
        </Column>
      </Row>

      <Skillelinje/>

      <Row>
        <Column>
          <Panel>
            <FormContext {...methods}>
              <form onSubmit={handleSubmit}
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
          </Panel>
        </Column>
      </Row>
    </InnloggetSide>
  );
};

export default ExcelOpplasting;
