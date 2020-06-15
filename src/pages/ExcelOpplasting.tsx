import React, { useState } from 'react';
import 'nav-frontend-tabell-style';
import { FormContext, useForm } from 'react-hook-form';
import {  useHistory } from 'react-router-dom';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import { History } from 'history';
import Vis from '../components/Vis';
import env from '../util/environment';
import Lenke from 'nav-frontend-lenker';
import excellogo from '../img/excel-logo.png';
import innsendingExcelFil from '../components/InnsendingExcelFil';
import { Erklaring } from '../components/ansatte/Erklaring';
import { FeilTabell, tabellFeil } from '../components/feilvisning/FeilTabell';
import InnloggetSide from './InnloggetSide';
import Panel from 'nav-frontend-paneler';
import Skillelinje from '../components/ansatte/Skillelinje';
import { Column, Row, Container } from 'nav-frontend-grid';
import InternLenke from '../components/InternLenke';
import KnappMedVarsel from '../components/KnappMedVarsel';
import { useTranslation } from 'react-i18next';
import { CoronaTopptekst } from '../components/CoronaTopptekst';
import TimeoutAdvarsel from '../components/ansatte/TimeoutAdvarsel';

const ExcelOpplasting = () => {
  const [erklæringAkseptert, setErklæringAkseptert] = useState<boolean>(false);
  const methods = useForm();
  const { t } = useTranslation();
  const history: History = useHistory();
  const [fileName, setFileName] = useState('Last opp utfylt Excel-mal');
  const [file, setFile] = useState(undefined);
  const [feil, setFeil] = useState<tabellFeil[]>([]);
  const [visAlleFeil, setVisAlleFeil] = useState(false)
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false)
  const FILEUPLOAD_MAX_SIZE = 250000;

  const handleSubmit = async  (e: React.FormEvent): Promise<any> => {
    e.preventDefault();
    if (file) {
      // @ts-ignore
      const responsFeil = await innsendingExcelFil(file)
      if (responsFeil.length === 0) {
        setFeil([])
        history.push('/kvitteringExcel')
      } else {
        setFeil(responsFeil)
      }
    }
  }

  const setUploadFile = (event: any) => {
    if (event.target.files[0] && event.target.files[0].size > FILEUPLOAD_MAX_SIZE) {
      setFeil([{ indeks: -1, melding: 'Du kan ikke laste opp filer større enn 250 kB.' }])
    } else {
      setFileName(event.target.files[0].name);
      setFile(event.target.files[0]);
      setFeil([]);
    }
  }

  const handleDisabledClick = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTriedSubmit(true)
  }

  return (
    <InnloggetSide>
      <main>
        <TimeoutAdvarsel/>
        <CoronaTopptekst />
        <Skillelinje />
        <Row>
          <Column>
            <Panel>
              <Innholdstittel>Last ned Excel-malen, fyll ut og last opp.</Innholdstittel>
            </Panel>
            <Panel>
              <Normaltekst>
                Har du ansatte som har vært borte i to eller flere ikke-sammenhengende perioder
              <InternLenke to="/enkel">
                  &nbsp;skal du bruke et eget skjema
              </InternLenke>.
              Excel-opplasting er tiltenkt dere som har svært mange refusjonskrav.
              Vi har også et &nbsp;
              <InternLenke to="/bulk">
                  eget skjema for å søke om refusjonskrav for flere ansatte
              </InternLenke>
              &nbsp; dersom dere foretrekker å gjøre det på den måten.
            </Normaltekst>
            </Panel>
            <Panel>
              <Normaltekst>
                <img src={excellogo}
                  width="35"
                  className="excelopplasting__excellogo"
                  alt="Excel-symbol" />
                <Lenke href={env.baseUrl + '/api/v1/bulk/template'}>
                  Last ned malen her</Lenke>, og fyll ut.
              Det er ikke mulig å benytte ditt eget excel-dokument,
              alt må fylles ut i denne malen før du laster opp.
              NB, det kan maks legges inn 5000 linjer per excel-doc.
              Om det ikke er tilstrekkelig, må dere gjøre dette i flere omganger.
            </Normaltekst>
            </Panel>
          </Column>
        </Row>

        <Skillelinje />

        <Row>
          <Column>
            <Panel className="excelopplasting">
              <label className="knapp filknapp">
                <input className="fileinput"
                  type="file"
                  id="fileUploader"
                  accept=".xls,.xlsx"
                  onChange={setUploadFile}
                  onClick={(e: any) => e.target.value = null} />
                {fileName}
              </label>
              <FeilTabell
                feil={feil}
                visAlleFeil={visAlleFeil}
                handleSetVisAlleFeil={visAlleFeil => setVisAlleFeil(visAlleFeil)} />
            </Panel>
          </Column>
        </Row>

        <Skillelinje />

        <Container>
          <Erklaring value={erklæringAkseptert} handleSetErklæring={value => setErklæringAkseptert(value)} />
        </Container>
        <Row className="send-soknad">
          <Column>
            <Panel>
              <FormContext {...methods}>
                <form onSubmit={handleSubmit}>
                  <KnappMedVarsel
                    disabled={!(erklæringAkseptert && file !== undefined)}
                    disabledClick={handleDisabledClick} >
                    Send søknad om refusjon
                      </KnappMedVarsel>
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
      </main>
    </InnloggetSide>
  );
};

export default ExcelOpplasting;
