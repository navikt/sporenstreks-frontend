import React, { useState } from 'react';
import 'nav-frontend-tabell-style';
import { Undertittel } from 'nav-frontend-typografi';
import ModalWrapper from 'nav-frontend-modal';
import Veilederpanel from 'nav-frontend-veilederpanel';
import './HjelpetekstRefusjon.scss'
import Lenke from 'nav-frontend-lenker';

const VeilederIkon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 93">
    <path fill="#e7e5e2" d="M14 50.7C15 52.3 17.9 81 26.5 81S39 51.8 39 50.3c-13.2-7.6-25 .4-25 .4z"/>
    <path fill="#5c4378" d="M38.7 50.2c6 2.9 15.3 10.9 15.3 18.3V93H0V68.5c0-7.1 8.5-14.8 14.5-18-.3.2-.5.3-.5.3 1 1.7
    3.8 9.2 12.4 9.2C35 60 39 51.9 39 50.4c-.1-.1-.2-.2-.3-.2z"/>
    <path fill="#d2242a" d="M46.7 76H31.2c-.7 0-1.3-.6-1.2-1.3v-8.5c0-.7.6-1.3 1.3-1.3h15.5c.7 0
    1.3.6 1.3 1.3v8.5c-.1.7-.7 1.3-1.4 1.3"/>
    <path fill="#fff" d="M42.9 71c0 2.1-1.7 3.8-3.8 3.8-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8c2.1 0 3.8 1.7 3.8 3.8m-8.7
    1.7h-.7l.8-1.9h.7l-.8 1.9zm9.3 0H43l.8-1.9h.5l-.8 1.9zm1.2 0h-.2l.8-1.9h.2l-.8 1.9z"/>
    <path fill="#c52d35" d="M36.2 72.7h.6s.1 0 .1-.1v-1.8s0-.1-.1-.1h-.6s-.1 0-.1.1l-.2.6v.1h.2l.1 1.2c0-.1 0 0 0 0"/>
    <path fill="#c52d35" d="M37.5 72.7h.6s.1 0 .1-.1v-1.8s0-.1-.1-.1h-.9s-.1 0-.1.1l-.2.6-.1.1h.5c.1 0
    .2.1.2.2v1c-.1-.1-.1 0 0 0m2.6-1.9h-.6s-.1 0-.1.1v1.8s0 .1.1.1h.6s.1 0 .1-.1l.2-.6V72h-.2l-.1-1.2"/>
    <path fill="#c52d35" d="M37.7 72.7h.4s.1 0 .1-.1l.2-.6v-.1h-.2c0 .1-.5.8-.5.8zm3.9-1.9h.7s.1 0 0 .1l-.7
    1.8H41l.6-1.9"/>
    <path fill="#c52d35" d="M40.8 70.8h-1c-.1 0 .3.1.3.1l.7 1.7s0 .1.1.1h.6l-.7-1.9m-1.3.6v.4s-.1-.4-.3-.4c-.3
    0-.3.2-.3.3 0 .1.1.3.2.3h.5l-.3.7H39c-.2 0-.9-.3-.9-.9 0-.6.5-1 .9-1 .2-.1.5.2.5.6 0-.1 0-.1 0 0z"/>
    <path fill="#5a1f57" d="M39.9 66.7h-1.6c-.1 0-.2-.1-.2-.2v-.3c0-.1.1-.2.2-.2h1.6c.1 0 .2.1.2.2v.3c0 .2-.1.2-.2.2"/>
    <path fill="#c2b5cf" d="M38.7 66.5h.9V64h-.9v2.5z"/>
    <path fill="#e7e5e2" d="M47.2 35.3C44.7 45.6 36.6 53.1 27 53.1S9.3 45.6 6.8 35.3c-.2.1-.5.1-.8.1-1.1
    0-2-.8-2-1.7v-7c0-1 .9-1.7 2-1.7h.2C7.7 13.1 16.4 4 27 4c10.6 0 19.3 9.1 20.8 21h.2c1.1 0 2 .8 2 1.7v7c0 1-.9 1.7-2
    1.7-.3 0-.5 0-.8-.1z"/>
    <path fill="#635e59" d="M19 27.6c-1.4.1-1.9-2-1.4-3.4.1-.3.6-1.5 1.4-1.5.8 0 1.2.7 1.3.8.6 1.4.3 4-1.3 4.1m16.2
    0c1.4.1 1.9-2 1.4-3.4-.1-.3-.6-1.5-1.4-1.5-.8 0-1.2.7-1.3.8-.6 1.4-.3 4 1.3 4.1"/>
    <path fill="#d1bfa3" d="M26.8 34.6c-.4 0-.7-.1-1-.2-.3-.1-.4-.4-.3-.7.1-.3.4-.4.7-.3.5.2 1.5.1 2.2-.4.7-.4 1.1-1
    1.2-1.5.1-.4-.1-.9-.4-1.3-.2-.2-.8-.2-1.6-.1-.3 0-.5-.1-.6-.4 0-.3.1-.5.4-.6 1.2-.2 2.1 0 2.6.6.5.7.8
    1.4.6 2.1-.1.8-.7 1.6-1.7 2.2-.6.3-1.4.6-2.1.6z"/><path fill="#593a32" d="M27.1
    42.1h-.3c-5.3-.2-7.3-4.1-7.4-4.3-.1-.3 0-.6.2-.7.2-.1.6 0 .7.2.1.1 1.9 3.6 6.6 3.8 4.7.2 6.4-3.7
    6.4-3.7.1-.3.4-.4.7-.3.3.1.4.4.3.7-.1 0-2.1 4.3-7.2 4.3z"/>
    <path fill="#f6b873" d="M6.6 30.7c.1-.1.1-.2.1-.3v-2c-.1-5.6 1.8-8.1 3.4-10.1 0 0-1
    4.3-.3 3.4 3.8-5 21.4-1.6 25-8.1.5 3.6-4.1 4.6-4.1 4.6 3.7.7 6.9-.8 7.7-2.5.3 1.4-.6 2.4-1.9 3.4 4.5-.9
    4.6-4 4.6-4 .6 4.1 5.3 2.5 5.3 9.3v6c0 .3.2.6.5.6h.5c.3 0 .5-.3.5-.6V26c.3-15.6-8.5-26-20.6-26C15.9 0 5
    10.4 5 24.1v6.3c0 .4.2.6.5.6h.6c.2 0 .3-.1.5-.3"/><path fill="#f6b873" d="M25.9 43.4c-4.4 0-8-1.4-8-3.2s3.6-3.2
    8-3.2 8 1.4 8 3.2c0 1.8-3.6 3.2-8 3.2m.8-9.4c-2.9 0-4.7.7-8.8 2.1-12.7 4.6-11.6-14-11.6-14C3.4 46 18.6 52 26.5
    52c8.1 0 24.1-8.1 21-30 0 0 .4 17.1-12.9 13.8-3.7-.9-5-1.8-7.9-1.8z"/>
  </svg>
);
const HjelpetekstIkon = (
  <svg className="hjelpetekst__ikon" width="32" height="32" focusable="false" viewBox="0 0 18.2 18.2"
       xmlns="http://www.w3.org/2000/svg">
    <path d="M9.1 0C4.1 0 0 4.1 0 9.1s4.1 9.1 9.1 9.1 9.1-4.1 9.1-9.1S14.1 0 9.1 0zm0 17.2C4.6 17.2 1 13.6 1 9.1S4.6 1
    9.1 1s8.1 3.6 8.1 8.1-3.6 8.1-8.1 8.1z"/>
    <circle cx="9.1" cy="13.8" r=".9"/>
    <path d="M9.1 11.5c-.3 0-.5-.2-.5-.5V8.6c0-.3.2-.5.5-.5 1 0 1.9-.8 1.9-1.9s-.8-1.9-1.9-1.9c-1 0-1.9.8-1.9 1.9 0
    .3-.2.5-.5.5s-.5-.2-.5-.4c0-1.6 1.3-2.9 2.9-2.9S12 4.7 12 6.3c0 1.4-1 2.6-2.4 2.8V11c0 .3-.2.5-.5.5z"/>
  </svg>
);

const Sprsml = () => (HjelpetekstIkon);

const HjelpetekstRefusjon = () => {
  const [ eksempelOpen, setEksempelOpen ] = useState<boolean>(false);

  const handleCloseButton = (evt : React.MouseEvent) => {
    evt.preventDefault();
    setEksempelOpen(false);
  };

  const handleOpenButton = (evt : React.MouseEvent) => {
    evt.preventDefault();
    setEksempelOpen(true);
  }


  return (
    <div className="hjelpetekst-refusjon">
      <ModalWrapper
        isOpen={eksempelOpen}

        onRequestClose={() => setEksempelOpen(false)}
        closeButton={false}
        contentLabel="Eksempel på refusjon"
        className="eksempel-modal"
      >
        <Veilederpanel svg={VeilederIkon}
        >
          <Undertittel>Slik finner dere beløpet dere kan kreve:</Undertittel><br/>
          (Merk: Beløpet er før skatt, og det skal være uten feriepenger og arbeidsgiveravgift.
          Det beregnes feriepenger av det NAV refunderer. Dere får utbetalt refusjonen av feriepengene neste år)<br/>
          <ol>
            <li>Avklar antall dager det kan kreves refusjon for. Ta kun med dager det skulle vært utbetalt lønn for, fra
              og med dag 4 i arbeidsgiverperioden. Helger og helligdager kan tas med hvis de er en del av den faste
              arbeidstiden. Krev så refusjon fra og med dag 4, men maksimalt 13 dager til sammen. Dager før 16. mars får
              du ikke refusjon for.</li>
            <li>
              Beregn månedsinntekten slik det ellers gjøres for &nbsp;
              <Lenke href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/sykepenger/inntekter-som-innga%CC%8Ar-i-beregning-av-ma%CC%8Anedsinntekten_kap"
                     target="_blank">
                sykepenger i arbeidsgiverperioden</Lenke>.
            </li>
            <li>
              Gang med 12 måneder for å finne årslønn.
            </li>
            <li>
              Reduser beløpet til 6G hvis beløpet er over dette.
            </li>
            <li>
              Finn dagsatsen ved å dele årslønnen på antall dager dere utbetaler lønn for i året.
            </li>
            <li>
              Gang dagsatsen med antall dager dere krever refusjon for.
            </li>
          </ol>
          <Undertittel>Eksempel:</Undertittel>
          <ol>
            <li>Frida har første fraværsdag 20. mars. Hun jobber mandag-fredag og får ikke utbetalt lønn for helgedager.
              Arbeidsgiverperioden går til og med 4. april. Trekk fra helgedager og de tre første dagene i
              arbeidsgiverperioden = 10 dager som det kan kreves refusjon for.</li>
            <li>
              Finn gjennomsnittet av Fridas bruttolønn i desember, januar og februar.
              I dette eksempelet har Frida en snittlønn på 55 000 kroner de aktuelle månedene.
            </li>
            <li>
              Gang med 12 = årslønn, for Frida blir dette 55 000 * 12 = 660 000 kroner
            </li>
            <li>
              Reduser beløpet til 6G. Siden Frida tjener mer enn 6G så må årslønnen reduseres til 6*G = 608 106 kroner.
            </li>
            <li>
              Del på 260 (antallet arbeidsdager Frida jobber i året) = dagsatsen. Fridas dagsats blir da 608 106 kr / 206 = 2338,87
            </li>
            <li>
              Gang dagsatsen med 10. Maksimalt refusjonsbeløp for Frida for de ti dagene blir da 23 388,70 kroner
            </li>
          </ol>
          <button role="link" className="periodeknapp lenke" onClick={(evt) => handleCloseButton(evt)}>
            Lukk dette vinduet
          </button>
        </Veilederpanel>
      </ModalWrapper>
      <div className="hjelpetekst">
        <button role="link" className="hjelpetekst__apneknapp" onClick={(evt) => handleOpenButton(evt)}>
          <Sprsml/>
          <span className="sr-only">
            Hjelp
          </span>
        </button>
      </div>
    </div>
  );
};

export default HjelpetekstRefusjon;
