import mergeAnsattlister from './mergeAnsattlister';
import { Ansatt } from './Ansatt';

describe('mergeAnsattlister', () => {
  it('should return a new list based on the master with values from the secondary', () => {
    const master: Ansatt[] = [
      {
        fnr: '1',
        id: 1,
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1
      },
      {
        fnr: '2',
        id: 1,
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1
      },
      {
        fnr: '3',
        id: 1,
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1
      }
    ];

    const secondary: Ansatt[] = [
      {
        fnr: '2',
        id: 1,
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1,
        referenceNumber: 'New walue'
      }
    ];

    const expected: Ansatt[] = [
      {
        fnr: '1',
        id: 1,
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1
      },
      {
        fnr: '2',
        id: 1,
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1,
        referenceNumber: 'New walue'
      },
      {
        fnr: '3',
        id: 1,
        fom: 'fom',
        tom: 'tom',
        status: 1,
        oppdatert: 1
      }
    ];

    expect(mergeAnsattlister(master, secondary)).toEqual(expected);
  });
});
