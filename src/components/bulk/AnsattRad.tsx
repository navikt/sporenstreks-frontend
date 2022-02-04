import React, { FormEvent, useState } from 'react';
import { BulkDager } from './BulkDager';
import { BulkRefusjon } from './BulkRefusjon';
import { BulkFnr } from './BulkFnr';
import BulkVisning from './BulkVisning';
import BulkPeriode from './BulkPeriode';
import { AnsattID, byggAnsatt } from './Ansatt';
import { SkjemaStatus } from '../../data/types/sporenstreksTypes';
import { ByggValideringsFeil } from './ByggValideringsFeil';
import Slettknapp from './Slettknapp';
import { Column, Row } from 'nav-frontend-grid';
import RadNr from './RadNr';
import { useBulk } from '../../context/BulkContext';
import dayjs from 'dayjs';
import getGrunnbeloep from '../../api/grunnbelop/getGrunnbeloep';
import AlertStripe from 'nav-frontend-alertstriper';
import HjelpeteksRefusjonsModal from '../refusjon/HjelpetekstRefusjonModal';
import './AnsattRad.scss';

export const AnsattRad = ({ id }: AnsattID) => {
  const { ansatte, setAnsatte, setFeil } = useBulk();
  const handleClick = (evt: FormEvent) => {
    const arr = ansatte.filter((ansatt) => ansatt.id !== id);
    setAnsatte([...arr]);
    setFeil(ByggValideringsFeil([...arr]));
    evt.preventDefault();
  };

  const [grunnbelop, setGrunnbelop] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleCloseFom = (fomDato: string) => {
    getGrunnbeloep(fomDato).then((grunnbelopRespons) => {
      if (grunnbelopRespons.grunnbeloep) {
        setGrunnbelop(grunnbelopRespons.grunnbeloep.grunnbeloep);
      }
    });
  };

  const a = ansatte.find((ansatt) => ansatt.id === id) || byggAnsatt();

  const muligMaksimalRefusjon = (
    refusjonGrunnbelop: number,
    refusjonDager: number
  ): number => {
    const aarsbelop = refusjonGrunnbelop * 6;
    const dagsbelop = aarsbelop / 260;

    return dagsbelop * refusjonDager;
  };

  const beregnetMaksimalRefusjon = muligMaksimalRefusjon(
    grunnbelop,
    a.antallDagerMedRefusjon
  );

  if (a.status === SkjemaStatus.GODKJENT) {
    return (
      <Row key={a.id} className='AnsattRad'>
        <Column md='1' xs='12'>
          <RadNr nr={ansatte.indexOf(a) + 1} />
        </Column>
        <Column md='2' xs='12'>
          <BulkVisning label='Fødselsnummer:'>{a?.fnr}</BulkVisning>
        </Column>
        <Column md='4' xs='12'>
          <BulkVisning label='Hvilken periode var den ansatte borte?'>
            {a.fom} til {a.tom}
          </BulkVisning>
        </Column>
        <Column md='2' xs='12'>
          <BulkVisning label='Antall dager:'>
            {a.antallDagerMedRefusjon}
          </BulkVisning>
        </Column>
        <Column md='2' xs='12'>
          <BulkVisning label='Beløp'>{a.beloep}</BulkVisning>
        </Column>
        <Column md='1' xs='12'>
          {' '}
        </Column>
      </Row>
    );
  }
  return (
    <>
      <Row key={a?.id} className='AnsattRad'>
        <Column md='1' xs='12'>
          <RadNr nr={ansatte.indexOf(a) + 1} />
        </Column>
        <Column md='2' xs='12'>
          <BulkFnr id={a?.id} />
        </Column>
        <Column md='4' xs='12'>
          <BulkPeriode id={a?.id} onClose={handleCloseFom} />
        </Column>
        <Column md='2' xs='12'>
          <BulkDager id={a?.id} startdato={dayjs(a.fom).toDate()} />
        </Column>
        <Column md='2' xs='12'>
          <BulkRefusjon id={a?.id} />
        </Column>
        <Column md='1' xs='12'>
          {ansatte.length > 1 && <Slettknapp onClick={handleClick} />}
        </Column>
      </Row>
      {a.beloep > beregnetMaksimalRefusjon && beregnetMaksimalRefusjon > 0 && (
        <>
          <Row>
            <Column md='1' xs='12'></Column>
            <Column md='10' xs='12'>
              <AlertStripe type='info' className='padded-alert'>
                Refusjonsbeløpet er høyere enn normal 6G-grense basert på 260
                arbeidsdager per år (5 arbeidsdager i uken).{' '}
                <button className='lenke' onClick={() => setModalOpen(true)}>
                  Se hvordan du beregner korrekt beløp her.
                </button>{' '}
                Hvis arbeidstakeren får utbetalt lønn for mindre enn 260 dager
                kan refusjonsbeløpet likevel være korrekt. Du kan sende inn
                søknaden uansett.
              </AlertStripe>
            </Column>
          </Row>
          <HjelpeteksRefusjonsModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </>
      )}
    </>
  );
};
