import {Ansatt} from "../../data/types/sporenstreksTypes";

export const ByggValideringsFeil = (ansatt: Ansatt[]) => {
    return [
        {skjemaelementId: '1', feilmelding: 'Du må oppgi et navn'},
        {skjemaelementId: '2', feilmelding: 'Du må oppgi en adresse'},
        {skjemaelementId: '3', feilmelding: 'Du må oppgi et telefonnummer'}
    ]
}
