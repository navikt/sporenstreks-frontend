import React, {useState} from 'react';
import 'nav-frontend-tabell-style';
import {FormContext, useForm} from 'react-hook-form';
import {Hovedknapp} from 'nav-frontend-knapper';
import {Link, useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Ingress, Normaltekst} from 'nav-frontend-typografi';
import {Keys} from '../locales/keys';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import {Organisasjon} from '@navikt/bedriftsmeny/lib/Organisasjon';
import {useAppStore} from '../data/store/AppStore';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {History} from 'history';
import Vis from '../components/Vis';
import env from '../util/environment';
import './ExcelOpplastning.less';
import Lenke from "nav-frontend-lenker";
import excellogo from '../img/excel-logo.png';
import save from 'save-file'

interface Feil {
    melding: string,
    rad: number,
    kolonne?: number
}

const ExcelOpplastning = () => {
    const {arbeidsgivere} = useAppStore();
    const [arbeidsgiverId, setArbeidsgiverId] = useState<string>('');
    const methods = useForm();
    const {t} = useTranslation();
    const history: History = useHistory();
    const [fileName, setFileName] = useState('Last opp utfylt Excel-mal');
    const [file, setFile] = useState();
    const [feil, setFeil] = useState<Feil[]>([]);
    const FILEUPLOAD_MAX_SIZE = 100000;

    const setUploadFile = (event: any) => {
        if (event.target.files[0].size > FILEUPLOAD_MAX_SIZE) {
            setFeil([{rad: -1, melding: "Du kan ikke laste opp filer større enn 100 kB."}])
        } else {
            setFileName(event.target.files[0].name);
            setFile(event.target.files[0])
        }
    }


    function createFormData() {
        const formData = new FormData();
        if (file) {
            // @ts-ignore
            formData.append(fileName, file)
        }
        return formData
    }


    const onSubmit = async (e: any): Promise<void> => {

        const FETCH_TIMEOUT = 5000;
        let didTimeOut = false;

        new Promise((resolve, reject) => {
            const timeout = setTimeout(function () {
                didTimeOut = true;
                reject(new Error('Request timed out'));
            }, FETCH_TIMEOUT);

            fetch(env.baseUrl + '/api/v1/bulk/upload', {
                method: 'POST',
                body: createFormData(),
            }).then((response: Response) => {
                clearTimeout(timeout);
                if (!didTimeOut) {
                    if (response.status === 401) {
                        window.location.href = env.loginServiceUrl;
                    } else if (response.status === 200) {
                        response.blob().then(data => {
                                save(data, "nav_refusjon")
                                history.push('/kvitteringExcel')
                                setFeil([])
                            }
                        )

                    } else if (response.status === 422) {
                        response.json().then(data => {
                            let f: Feil[] =
                                data.problemDetails.map(violation => ({
                                    rad: violation.row,
                                    kolonne: violation.column,
                                    melding: violation.message

                                }));
                            setFeil(f)
                        });
                    } else {
                        let f: Feil = {melding: "Feil ved innsending av skjema.", rad: -1}
                        setFeil([f])
                    }
                }
            }).catch(err => {
                if (didTimeOut) return;
                reject(err);
            });
        }).catch(err => {
            let f: Feil = {melding: "Feil ved innsending av skjema.", rad: -1}
            setFeil([f])
        });
    };


    return (
        <div className="excelOpplastning">
            <Vis hvis={arbeidsgivere.length === 0}>
                <div className="limit">
                    <AlertStripeAdvarsel>
                        <div>Du har ikke rettigheter til å søke om refusjon for noen bedrifter</div>
                        <div>Tildeling av roller foregår i Altinn</div>
                        <Link to="/min-side-arbeidsgiver/informasjon-om-tilgangsstyring"
                              className="lenke informasjonsboks__lenke">
                            Les mer om roller og tilganger.
                        </Link>
                    </AlertStripeAdvarsel>
                </div>
            </Vis>

            <Vis hvis={arbeidsgivere.length > 0}>
                <Bedriftsmeny
                    history={history}
                    onOrganisasjonChange={(org: Organisasjon) => setArbeidsgiverId(org.OrganizationNumber)}
                    sidetittel={t(Keys.MY_PAGE)}
                    organisasjoner={arbeidsgivere}
                />
                <div className="limit">
                    <AlertStripeAdvarsel>
                        <Lenke
                            href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
                            Vi ber offentlig sektor vente med å søke.
                        </Lenke>
                    </AlertStripeAdvarsel>
                    <Ingress className="container">
                        Vanligvis skal arbeidsgiveren betale sykepenger de første
                        16 kalenderdagene (arbeidsgiverperioden) av et sykefravær.
                        I forbindelse med korona-pandemien kan arbeidsgiveren søke om refusjon
                        fra og med fjerde dag i arbeidsgiverperioden.
                        Dette gjelder hvis den ansatte enten er smittet, mistenkt smittet eller i pålagt karantene.
                        <br/><br/>
                        Det kan ikke søkes om refusjon for fravær på grunn av stengte skoler eller barnehager.
                        <br/><br/>
                        <b>Her kan du laste opp en Excel-oversikt over de ansatte det gjelder,
                            for å søke om refusjon for de siste 13 dagene av arbeidsgiverperioden.</b>
                    </Ingress>
                    <div className="container">
                        <Ingress>Last ned Excel-malen, fyll ut og last opp.</Ingress>
                        <Normaltekst>
                            Har du ansatte som har vært borte i to eller flere ikke-sammenhengende perioder
                            <Link to="/">&nbsp;skal du bruke et eget skjema som du finner her</Link>.
                            Denne metoden er tiltenkt dere som har svært mange refusjonskrav.
                            Vi har også et eget
                            skjema for å søke om refusjonskrav for flere ansatte
                            dersom dere foretrekker å gjøre det på den måten.
                        </Normaltekst>
                        <br/><br/>
                        <Normaltekst>
                            <img src={excellogo} width="35" className="excelLogo"/>
                            <Lenke href={env.baseUrl + "/api/v1/bulk/template"}>
                                Last ned</Lenke> malen her, og fyll ut.
                            Det er ikke mulig å benytte ditt eget excel-dokument,
                            alt må fylles ut i denne malen før du laster opp.
                        </Normaltekst>
                    </div>
                    <div>
                        <label className="knapp">
                            <input className="fileinput"
                                   type="file"
                                   id="fileUploader"
                                   accept=".xls,.xlsx"
                                   onChange={setUploadFile}/>
                            {fileName}
                        </label>
                        <Normaltekst>
                            NB, det kan maks legges inn 5000 linjer per excel-doc.
                            Om det ikke er tilstrekkelig må dere gjøre dette i flere omganger.
                        </Normaltekst>
                    </div>
                    <Vis hvis={feil.length > 0}>
                        <div className="feiloppsummering">
                            <Ingress>Følgende feil i dokumentet må utbedres før du laster det opp på nytt:</Ingress>
                            <table className="tabell tabell--stripet">
                                <tbody>
                                {feil.sort((x, y) => x.rad > y.rad ? 1 : -1).map((f, index) => (
                                    <tr key={index}>
                                        <td>{(f.rad < 0 ? "" : f.rad)}</td>
                                        <td>{(f.kolonne && f.kolonne  < 0 ? "" : f.kolonne)}</td>
                                        <td>{f.melding}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </Vis>
                    <div className="container">
                        <FormContext {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)} className="excelform">
                                <Normaltekst>
                                    Vi erklærer at det ikke er søkt om omsorgspenger
                                    og at arbeidstakeren ikke er permittert.
                                    Vi erklærer at dette kravet er basert på
                                    at fraværet skyldes arbeidstakerens opplysninger
                                    om at det aktuelle fraværet skyldes covid-19-pandemien.
                                    Vær oppmerksom på at NAV kan foreta kontroller.
                                </Normaltekst>
                                <Hovedknapp className="knapp">Send søknad om refusjon</Hovedknapp>
                            </form>
                        </FormContext>
                    </div>
                </div>
            </Vis>
        </div>
    );
};

export default ExcelOpplastning;