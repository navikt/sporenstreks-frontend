import Hjelpetekst from 'nav-frontend-hjelpetekst';
import React from 'react';
import { PopoverOrientering } from 'nav-frontend-popover';

export const HjelpetekstRefusjon = () => {
  return (
    <Hjelpetekst id="HjelpetekstRefusjon" type={PopoverOrientering.Under}>
      <h3>Slik finner dere beløpet dere kan kreve:</h3>
      <ol>
        <li>Avklar antall dager det kan kreves refusjon for. Ta kun med dager det skulle vært utbetalt lønn for, fra og
          med dag 4 i arbeidsgiverperioden. Helger og helligdager kan tas med hvis de er en del av den faste
          arbeidstiden. Krev så refusjon fra og med dag 4, men maksimalt 13 dager til sammen. Dager før 16. mars får du
          ikke refusjon for.
        </li>
        <li>Beregn månedsinntekten slik det ellers gjøres for sykepenger i arbeidsgiverperioden.</li>
        <li>Gang med 12 måneder for å finne årslønn.</li>
        <li>Reduser beløpet til 6G (=599 148) hvis beløpet er over dette.</li>
        <li>Finn dagsatsen ved å dele årslønnen på antall dager dere utbetaler lønn for i året.</li>
        <li>Gang dagsatsen med antall dager dere krever refusjon for.</li>
      </ol>
      <h3>Eksempel:</h3>
      <ol>
        <li>Frida har første fraværsdag 20. mars. Hun jobber mandag-fredag og får ikke utbetalt lønn for helgedager.
          Arbeidsgiverperioden går til og med 4. april. Trekk fra helgedager og de tre første dagene i
          arbeidsgiverperioden = 10 dager som det kan kreves refusjon for.
        </li>
        <li>Finn gjennomsnittet av Fridas bruttolønn i desember, januar og februar = kr. 55 000</li>
        <li>Gang med 12 = 660 000 i årslønn</li>
        <li>Reduser beløpet til 6G = 599 148</li>
        <li>Del på 260 (antallet arbeidsdager Frida jobber i året) = 2 304 kroner pr dag (dagsats)</li>
        <li>Gang dagsatsen med 10 = 23 040 kroner</li>
      </ol>
    </Hjelpetekst>
  )
}
