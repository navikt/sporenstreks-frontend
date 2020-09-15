import filtrerAnsatteForInnsending from './filtrerAnsatteForInnsending';
import { Ansatt } from '../../data/types/sporenstreksTypes';
import { SykepengerData } from './SykepengerData';

describe('filtrerAnsatteForInnsending', () => {
  it('should return a new list prepared for posting to the backend', () => {
    const master: Ansatt[] = [
      {
        fnr: '1',
        id: 1,
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1,
        antallDagerMedRefusjon: 1,
        beloep: 123
      },
      {
        fnr: '2',
        id: 2,
        fom: 'fom',
        tom: 'tom',
        status: 2,
        oppdatert: 2,
        antallDagerMedRefusjon: 2,
        beloep: 222
      },
      {
        fnr: '3',
        id: 3,
        fom: 'fom',
        tom: 'tom',
        status: 3,
        oppdatert: 3,
        antallDagerMedRefusjon: 3,
        beloep: 333
      }
    ]

    const expected: SykepengerData[] = [
      {
        'identitetsnummer': '1',
        'perioder': [
          {
            'antallDagerMedRefusjon': 1,
            'beloep': 123,
            'fom': 'fom',
            'tom': 'tom',
          },
        ],
        'virksomhetsnummer': '123456789',
      },
      {
        'identitetsnummer': '2',
        'perioder': [
          {
            'antallDagerMedRefusjon': 2,
            'beloep': 222,
            'fom': 'fom',
            'tom': 'tom',
          },
        ],
        'virksomhetsnummer': '123456789',
      },
      {
        'identitetsnummer': '3',
        'perioder': [
          {
            'antallDagerMedRefusjon': 3,
            'beloep': 333,
            'fom': 'fom',
            'tom': 'tom',
          },
        ],
        'virksomhetsnummer': '123456789',
      },
    ]

    expect(filtrerAnsatteForInnsending(master, '123456789')).toEqual(expected);
  })
})
