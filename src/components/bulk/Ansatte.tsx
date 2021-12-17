import React, { useState } from 'react';
import './Ansatte.less';
import { AnsattRad } from './AnsattRad';
import { valideringAnsatte } from './ValideringAnsatte';
import { ByggValideringsFeil } from './ByggValideringsFeil';
import Innsending from './Innsending';
import { LeggTilKnapp } from './LeggTilKnapp';
import { BekreftKnapp } from './BekreftKnapp';
import { Erklaring } from '../felles/Erklaring';
import { ValideringOppsummering } from './ValideringOppsummering';
import { History } from 'history';
import { useHistory } from 'react-router-dom';
import { byggAnsatt, Ansatt } from './Ansatt';
import Advarsler from './Advarsler';
import { Column, Row, Container } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import Skillelinje from '../felles/Skillelinje';
import { Normaltekst, Element, Systemtittel } from 'nav-frontend-typografi';
import LoggetUtAdvarsel from '../login/LoggetUtAdvarsel';
import InternLenke from '../felles/InternLenke';
import { HjelpetekstPeriode } from '../periode/HjelpetekstPeriode';
import { HjelpetekstDager } from '../dager/HjelpetekstDager';
import HjelpetekstRefusjon from '../refusjon/HjelpetekstRefusjon';
import { useArbeidsgiver } from '../../context/ArbeidsgiverContext';
import { useBulk } from '../../context/BulkContext';
import { useAppStore } from '../../context/AppStoreContext';
import { Linker } from '../../pages/Linker';

const Ansatte: React.FC = () => {
  const { arbeidsgiverId } = useArbeidsgiver();
  const { ansatte, setAnsatte, setFeil, setLoadingStatus } = useBulk();
  const { setTokenExpired } = useAppStore();
  const history: History = useHistory();
  const [erklæringAkseptert, setErklæringAkseptert] = useState<boolean>(false);
  const [
    harTrykketSubmitMinstEnGang,
    setHarTrykketSubmitMinstEnGang
  ] = useState<boolean>(false);
  const handleBekreftSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    let localTokenExpired = false;

    const localSetTokenExpired = (status: boolean): void => {
      setTokenExpired(status);
      localTokenExpired = status;
    };
    const validerteAnsatte = valideringAnsatte(ansatte);
    const innsendteAnsatte = await Innsending(
      arbeidsgiverId,
      validerteAnsatte,
      setLoadingStatus,
      localSetTokenExpired
    );

    setHarTrykketSubmitMinstEnGang(true);
    let valideringsfeil = ByggValideringsFeil(innsendteAnsatte);

    if (!innsendteAnsatte.find((ansatt: Ansatt) => !ansatt.referenceNumber)) {
      setAnsatte([byggAnsatt()]);
      valideringsfeil = [];
    }

    setFeil(valideringsfeil);
    if (valideringsfeil.length === 0 && localTokenExpired === false) {
      history.push(Linker.BulkKvittering);
    }
  };
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
  };
  const handleBekreftKlikk = (evt: React.FormEvent) => {
    evt.preventDefault();
    setHarTrykketSubmitMinstEnGang(true);
  };

  return (
    <div className='ansatte'>
      <Skillelinje />

      <form onSubmit={handleSubmit} data-testid='bulk-form'>
        <Row>
          <Column>
            <Panel>
              <Systemtittel className='sykepenger--undertittel'>
                Oppgi ansatte, arbeidsgiverperiode og beløp
              </Systemtittel>
              <Normaltekst>
                Har du ansatte som har vært borte i to eller flere
                ikke-sammenhengende perioder
                <InternLenke to={Linker.Enkel}>
                  {' '}
                  skal du bruke et eget skjema som du finner her.
                </InternLenke>
              </Normaltekst>
              <Normaltekst>
                Hvis dere har mange ansatte kan dere{' '}
                <InternLenke to={Linker.Excel}>
                  benytte Excel-opplasting.
                </InternLenke>{' '}
                Hvis dere vil endre tidliger innsendte krav pga. tariffendring
                må dere{' '}
                <InternLenke to={Linker.Excel}>
                  benytte Excel-opplasting.
                </InternLenke>{' '}
              </Normaltekst>
            </Panel>
          </Column>
        </Row>
        <Row className='AnsattRad-overskrift'>
          <Column md='1' xs='12'>
            <Element tag='label' className='AnsattRad-overskrift--element'>
              Nr.
            </Element>
          </Column>
          <Column md='2' xs='12'>
            <Element tag='label' className='AnsattRad-overskrift--element'>
              Fødselsnummer:
            </Element>
          </Column>
          <Column md='4' xs='12'>
            <Element tag='label' className='AnsattRad-overskrift--element'>
              Hvilken periode var den ansatte borte?
              <HjelpetekstPeriode />
            </Element>
          </Column>
          <Column md='2' xs='12'>
            <Element tag='label' className='AnsattRad-overskrift--element'>
              Antall dager:
              <HjelpetekstDager />
            </Element>
          </Column>
          <Column md='2' xs='12'>
            <Element tag='label' className='AnsattRad-overskrift--element'>
              Beløp:
              <HjelpetekstRefusjon />
            </Element>
          </Column>
          <Column md='1' xs='12'></Column>
        </Row>

        {ansatte.map((ansatt) => (
          <AnsattRad id={ansatt.id} key={ansatt.id} />
        ))}

        <Row className={'ansatte__leggtilknapp'}>
          <Column md='1' sm='12'>
            {' '}
          </Column>
          <Column sm='10'>
            <LeggTilKnapp />
          </Column>
        </Row>

        <Skillelinje />

        <Row>
          <Column sm='12'>
            <ValideringOppsummering />
          </Column>
        </Row>

        <Row>
          <Column>
            <Panel>
              <Erklaring
                value={erklæringAkseptert}
                handleSetErklæring={(value) => setErklæringAkseptert(value)}
              />
            </Panel>
          </Column>
        </Row>
      </form>

      <Row className='send-soknad'>
        <Column>
          <Panel>
            <BekreftKnapp
              onSubmit={handleBekreftSubmit}
              onClick={handleBekreftKlikk}
              erklæringAkseptert={erklæringAkseptert}
            />
            <Advarsler
              erklæringAkseptert={erklæringAkseptert}
              harFeil={false}
              visFeil={harTrykketSubmitMinstEnGang}
            />
          </Panel>
        </Column>
      </Row>
      <LoggetUtAdvarsel />
    </div>
  );
};

export default Ansatte;
