import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import InnsendingExcelFil from './InnsendingExcelFil';

const mockServer = 'https://mockserver.nav.no';

jest.mock('../felles/environment', () => ({
  get baseUrl() {
    return mockServer;
  },
  get loginServiceUrl() {
    return mockServer + '/loginServer';
  }
}));

const mockUrl = mockServer + '/api/v1/bulk/upload';

const file = new File(['(⌐□_□)'], 'fil.xlsx', {
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
});
const response200 = 'Søknaden er mottatt.';
const response500 = {
  type: 'urn:sporenstreks:uventet-feil',
  title: 'Uventet feil',
  status: 500,
  detail: null,
  instance:
    'urn:sporenstreks:uventent-feil:1f447140-6d6c-403c-bbc5-7e0f400bc684'
};
const response401 = [
  {
    indeks: -1,
    melding: 'Du har blitt logget ut. Vennligst prøv på nytt etter innlogging.'
  }
];

const response422 = {
  problemDetails: [
    {
      message:
        'EnkelDager refusjonsdager kan ikke være flere enn dagene i perioden',
      row: '1',
      column: 'Arbeidsgiverperioden (fom+tom)'
    },
    {
      message: 'Du har ikke korrekte tilganger for denne virksomheten',
      row: '2',
      column: 'Virksomhetsnummer'
    },
    {
      message: 'Feil ved lesing av tall. Påse at formatet er riktig.',
      row: '3',
      column: 'Beløp'
    },
    {
      message: 'Ugyldig virksomhetsnummer',
      row: '4',
      column: 'Virksomhetsnummer'
    }
  ],
  message: 'En eller flere rader/kolonner har feil.',
  type: 'urn:sporenstreks:excel-error',
  title: 'Det var en eller flere feil med excelarket',
  status: 422,
  detail: 'En eller flere rader/kolonner har feil.',
  instance: 'about:blank'
};

describe('InnsendingExcelFil', () => {
  let mock: FetchMock;
  let spy: SpyMiddleware;

  beforeEach(() => {
    spy = new SpyMiddleware();
    mock = FetchMock.configure({
      middleware: spy.middleware
    });
    expect(spy.size()).toBe(0);
  });
  afterEach(() => {
    mock.restore();
  });

  it('returns an empty list when given 200 OK', async () => {
    mock.post(mockUrl, (req, res, ctx) =>
      res(ctx.status(200), ctx.json(response200))
    );

    expect(await InnsendingExcelFil(file, jest.fn())).toEqual([]);
  });

  it('returns tabellFeil list when given 422', async () => {
    mock.post(mockUrl, (req, res, ctx) =>
      res(ctx.status(422), ctx.json(response422))
    );

    const expected = response422.problemDetails;

    const result = await InnsendingExcelFil(file, jest.fn());

    expect(result).toHaveLength(4);

    result
      .sort((x, y) => x.indeks - y.indeks)
      .forEach((f, index) => {
        expect(f.indeks).toBe(expected[index].row);
        expect(f.kolonne).toBe(expected[index].column);
        expect(f.melding).toBe(expected[index].message);
      });
  });

  it('returns a generic error message when given 5xx error', async () => {
    mock.post(mockUrl, (req, res, ctx) =>
      res(ctx.status(500), ctx.json(response500))
    );

    expect(await InnsendingExcelFil(file, jest.fn())).toEqual([
      { indeks: -1, melding: 'Feil ved innsending av skjema.' }
    ]);
  });

  it('returns an error message when 401 and fires setTokenExpired', async () => {
    mock.post(mockUrl, (req, res, ctx) =>
      res(ctx.status(401), ctx.json(response500))
    );

    const setTokenExpired = jest.fn();

    expect(await InnsendingExcelFil(file, setTokenExpired)).toEqual(
      response401
    );
    expect(setTokenExpired).toHaveBeenCalledTimes(2);
    expect(setTokenExpired).toHaveBeenLastCalledWith(true);
  });

  it('returns an empty list when given 401 OK', async () => {
    mock.post(mockUrl, (req, res, ctx) => res(ctx.status(401)));
    const setTokenExpired = jest.fn();

    expect(await InnsendingExcelFil(file, setTokenExpired)).toEqual(
      response401
    );
    expect(setTokenExpired).toHaveBeenCalledTimes(2);
    expect(setTokenExpired).toHaveBeenLastCalledWith(true);
  });
});
