import { tabellFeil } from '../feilvisning/FeilTabell';

const errors = [
  { indeks: -1, melding: 'Noe gikk galt' }
] as tabellFeil[]

export default (formData: FormData): Promise<tabellFeil[]> => {
  console.log('HALLO!')
    return new Promise((resolve, reject) => {
      if(formData.has('fil.xlsx')) { //returnerer OK
        resolve([] as tabellFeil[])
      } else { // returnerer feil
        resolve(errors)
      }
    })};
