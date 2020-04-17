
export interface sykepengerData {
    "identitetsnummer": Number | undefined;
    "virksomhetsnummer": String | undefined;
    "perioder":[
        {
            "fom": String | undefined;
            "tom": String | undefined;
            "antallDagerMedRefusjon": number | undefined;
            "beloep": number | undefined;
        }
    ]
}
