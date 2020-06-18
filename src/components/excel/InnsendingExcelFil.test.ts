import FetchMock, { SpyMiddleware, ResponseUtils } from 'yet-another-fetch-mock';
import InnsendingExcelFil from './InnsendingExcelFil';

const mockServer = 'http://mockserver.nav.no';

jest.mock('../util/environment', () => ({
  get baseUrl() {
    return mockServer
  },
  get loginServiceUrl() {
    return mockServer + '/loginServer'
  }
}))

const mockUrl = mockServer + '/api/v1/bulk/upload';

const file = new File(['(⌐□_□)'], 'fil.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
const response200 = 'Søknaden er mottatt.'
const response500 = {
  'type': 'urn:sporenstreks:uventet-feil',
  'title': 'Uventet feil',
  'status': 500,
  'detail': null,
  'instance': 'urn:sporenstreks:uventent-feil:1f447140-6d6c-403c-bbc5-7e0f400bc684'
}
const response422 = {
  'problemDetails': [{
    'message': 'EnkelDager refusjonsdager kan ikke være flere enn dagene i perioden',
    'row': '1',
    'column': 'Arbeidsgiverperioden (fom+tom)'
  }, {
    'message': 'Du har ikke korrekte tilganger for denne virksomheten',
    'row': '2',
    'column': 'Virksomhetsnummer'
  }, {
    'message': 'Feil ved lesing av tall. Påse at formatet er riktig.',
    'row': '3',
    'column': 'Beløp'
  }, {
    'message': 'Ugyldig virksomhetsnummer',
    'row': '4',
    'column': 'Virksomhetsnummer'
  }],
  'message': 'En eller flere rader/kolonner har feil.',
  'type': 'urn:sporenstreks:excel-error',
  'title': 'Det var en eller flere feil med excelarket',
  'status': 422,
  'detail': 'En eller flere rader/kolonner har feil.',
  'instance': 'about:blank'
}

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
    mock.post(mockUrl, ResponseUtils.combine(
      ResponseUtils.statusCode(200),
      response200
    ));

    expect(await InnsendingExcelFil(file)).toEqual([]);
  })

  it('returns tabellFeil list when given 422', async () => {
    mock.post(mockUrl, ResponseUtils.combine(
      ResponseUtils.statusCode(422),
      response422
    ));

    const expected = response422.problemDetails;

    const result = await InnsendingExcelFil(file);

    expect(result).toHaveLength(4);

    result.sort((x, y) => x.indeks - y.indeks).map((f, index) => {
      expect(f.indeks).toBe(expected[index].row);
      expect(f.kolonne).toBe(expected[index].column);
      expect(f.melding).toBe(expected[index].message);
    })
  });

  it('returns a generic error message when given 5xx error', async () => {
    mock.post(mockUrl, ResponseUtils.combine(
      ResponseUtils.statusCode(500),
      response500
    ));

    expect(await InnsendingExcelFil(file)).toEqual([{ indeks: -1, melding: 'Feil ved innsending av skjema.' }]);
  });
});
