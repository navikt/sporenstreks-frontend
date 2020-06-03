import FetchMock, { MatcherUtils, SpyMiddleware, ResponseUtils, HandlerArgument } from 'yet-another-fetch-mock';
import LoginExpiryAPI, { ParseExpiryDate } from './LoginExpiryAPI';

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
    const expected = { 'status': 200, 'tidspunkt': '08:27' };
    const input = '2045-01-23T08:27:57.000+0000';
    mock.get(mockUrl, input);
    const loginExpiry = await LoginExpiryAPI();
    expect(loginExpiry.tidspunkt).toEqual(ParseExpiryDate(input));
  })

  it('should return a status and empty string when endpoint is not found', async () => {
    mock.get(mockUrl, ResponseUtils.statusCode(404));
    const loginExpiry = await LoginExpiryAPI();
    expect(loginExpiry.tidspunkt).toBeUndefined();
  })
})
