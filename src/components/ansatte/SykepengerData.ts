
export interface SykepengerData {
    "identitetsnummer"?: string;
    "virksomhetsnummer"?: string;
    "perioder":[
        {
            "fom"?: string;
            "tom"?: string;
            "antallDagerMedRefusjon"?: number;
            "beloep"?: number;
        }
    ]
}
