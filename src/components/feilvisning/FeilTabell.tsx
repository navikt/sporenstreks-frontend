import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Ingress } from 'nav-frontend-typografi';
import Vis from '../Vis';

interface feilTabellProps {
  feil : tabellFeil[]
  visAlleFeil: boolean
  handleSetVisAlleFeil: (passedValue: boolean) => void
}

export interface tabellFeil {
  melding: string,
  indeks: number,
  kolonne?: number
}

export const FeilTabell = ({ feil , visAlleFeil, handleSetVisAlleFeil }: feilTabellProps) => {

  const gruppertFeil = feil.reduce(
    function (gruppert, feil) {
      let feilGruppering = gruppert.find((el) => {
        return (el.kolonne === feil.kolonne && el.melding === feil.melding)
      })
      if (feilGruppering) {
        feilGruppering.indeks += 1

      } else {
        gruppert.push({ indeks: 1, melding: feil.melding, kolonne: feil.kolonne })
      }
      return gruppert
    }, [] as tabellFeil[])

  const tabellSortAscending = (x: tabellFeil, y: tabellFeil) => x.indeks - y.indeks;

  const tabellSortDescending = (x: tabellFeil, y: tabellFeil) => y.indeks - x.indeks;

  const toggleFeilvisning = () => handleSetVisAlleFeil(!visAlleFeil)

  const feilvisningsTabellVanlig = () => {
    return (
      <div className="feilvisningstabell feiloppsummering">
        <div className="tabell--overflow">
          <Ingress>Følgende feil i dokumentet må utbedres før du laster det opp på nytt:</Ingress>
            <table className="tabell tabell--stripet">
              <tbody>
              {/* eslint-disable-next-line react/prop-types */}
              {feil.sort(tabellSortAscending).map((f, index) => (
                <tr key={index}>
                  <td>{(f.indeks < 0 ? '' : 'Rad ' + f.indeks)}</td>
                  <td>{(f.kolonne && f.kolonne < 0 ? '' : f.kolonne)}</td>
                  <td>{f.melding}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        {/* eslint-disable-next-line react/prop-types */}
        <Vis hvis={feil.length > 10}>
          <Knapp className="feilvisningstabell__knapp"
                 onClick={toggleFeilvisning}>
            Vis feilmeldingsammendrag</Knapp>
        </Vis>
      </div>
    )
  }

  const feilvisningsTabellGruppert = (gruppertFeil: tabellFeil[]) => {
    return (
      <div className="feilvisningstabell feiloppsummering">
        {/* eslint-disable-next-line react/prop-types */}
              <Ingress>{feil.length} feil i dokumentet må utbedres før du laster det opp på nytt:</Ingress>
            <div className="tabell--overflow">
        <table className="tabell tabell--stripet">
                <thead>
                <tr>
                  <th>Feilmelding</th>
                  <th>Kolonne</th>
                  <th>Antall feil</th>
                </tr>
                </thead>

                  <tbody>
                  {gruppertFeil.sort(tabellSortDescending).map((f, index) => (
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
                      <Knapp onClick={toggleFeilvisning}>Vis alle rader med feilmelding</Knapp>
                    </th>
                  </tr>
                </tfoot>
              </table>
          </div>
          </div>
    )
  }

  return (
    <Vis hvis={feil.length > 0}>
      { (feil.length <= 10 || visAlleFeil) ?
           feilvisningsTabellVanlig() : feilvisningsTabellGruppert(gruppertFeil)}
    </Vis>
  )
}



