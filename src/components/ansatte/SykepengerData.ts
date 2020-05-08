
export interface SykepengerData {
    "identitetsnummer"?: string;
    "virksomhetsnummer"?: string;
    "perioder":[
        {
            "fom"?: Date;
            "tom"?: Date;
            "antallDagerMedRefusjon"?: number;
            "beloep"?: number;
        }
    ]
}
