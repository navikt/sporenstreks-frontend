import FetchMock, { MatcherUtils, SpyMiddleware, ResponseUtils, HandlerArgument } from 'yet-another-fetch-mock';
import LoginExpiryAPI from './LoginExpiryAPI';

const mockServer = 'http://mockserver.nav.no';

const mockUrl = mockServer + '/api/v1/login-expiry'

jest.mock('../util/environment', () => ({
  get baseUrl() {
    return mockServer
  },
}))

describe('loginExpiryAPI', () => {
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

  it('should return status and a string when stuff is OK and it is a time string', async () => {
    const expected = { 'status': 200, 'tidspunkt': '09:55' };
    const input = '2045-01-01T08:55:34.000+0000';
    mock
      .get(mockUrl, input);

    expect(await LoginExpiryAPI()).toStrictEqual(expected);
  })

  it('should return a status and empty string when endpoint is not found', async () => {
    const expected = { 'status': 404, 'tidspunkt': 'Klarte ikke hente utløpstidspunkt' };
    mock
      .get(mockUrl, ResponseUtils.statusCode(404));

    expect(await LoginExpiryAPI()).toStrictEqual(expected);
  })
})
