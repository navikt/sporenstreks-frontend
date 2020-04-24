import React from "react";
import {Knapp} from "nav-frontend-knapper";
import {Ingress} from "nav-frontend-typografi";
import Vis from "../Vis";

interface feilTabellProps {
  feil : Feil[]
  visAlleFeil: boolean
  handleSetVisAlleFeil: (passedValue: boolean) => void
}

interface Feil {
  melding: string,
  indeks: number,
  kolonne?: number
}

export const FeilTabell = ({feil , visAlleFeil, handleSetVisAlleFeil}: feilTabellProps) => {

  const gruppertFeil = feil.reduce(
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
    }, [] as Feil[])

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
                 onClick={() => handleSetVisAlleFeil(!visAlleFeil)}>
            Vis feilmeldingsammendrag</Knapp>
        </Vis>
      </span>
    )
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
                      <Knapp onClick={() => handleSetVisAlleFeil(!visAlleFeil)}>Vis alle rader med feilmelding</Knapp>
                    </th>
                  </tr>
                </tfoot>
              </table>
          </span>
    )
  }

  return (
    <Vis hvis={feil.length > 0}>
      { (feil.length < 10 || visAlleFeil) ?
           feilvisningsTabellVanlig() : feilvisningsTabellGruppert(gruppertFeil)}
    </Vis>
  )
}



