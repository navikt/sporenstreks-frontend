import {Ansatt} from "../../data/types/sporenstreksTypes";
import {sykepengerData} from "./SykepengerData";
import env from "../../util/environment";

export const Innsending = (arbeidsgiverId: String, validerteAnsatte: Ansatt[]) => {
    console.log("ansatte", JSON.stringify(validerteAnsatte));
    const preparedAnsatte: sykepengerData[] = validerteAnsatte.map((ansatt: Ansatt) => {
        return {
            identitetsnummer: ansatt.fnr,
            virksomhetsnummer: arbeidsgiverId,
            perioder: [
                {
                    fom: ansatt.fom,
                    tom: ansatt.tom,
                    antallDagerMedRefusjon: ansatt.antallDagerMedRefusjon,
                    beloep: ansatt.beloep
                }
            ]
        }
    })
    fetch(env.baseUrl + '/api/v1/refusjonskrav/list', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(preparedAnsatte),
    }).then(response => {
        if (response.status === 401) {
            window.location.href = env.loginServiceUrl;
        } else if (response.status === 200) {
            response.json().then(data => {
                //setReferanseNummer(data.referansenummer);
                //history.push('/kvittering')
            })
        } else if (response.status === 422) {
            // response.json().then(data => {
            //     data.violations.map(violation => {
            //         methods.setError('backend', violation.message);
            //         return methods;
            //     });
            //     data.violations.map(violation => ({
            //         errorType: violation.validationType,
            //         errorMessage: violation.message,
            //     }));
            // });
        } else { // todo: error 400
            //methods.setError('backend', 'Feil ved innsending av skjema');
        }
    });
}
