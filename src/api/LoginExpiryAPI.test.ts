import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import LoginExpiryAPI, { ParseExpiryDate } from './LoginExpiryAPI';

const mockServer = 'https://mockserver.nav.no';
const mockUrl = mockServer + '/api/v1/login-expiry';

jest.mock('../components/felles/environment', () => ({
  get baseUrl() {
    return mockServer;
  }
}));

describe('loginExpiryAPI', () => {
  let mock: FetchMock;
  let spy: SpyMiddleware;

  beforeEach(() => {
    spy = new SpyMiddleware();
    mock = FetchMock.configure({
      middleware: spy.middleware
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should return status and a string when stuff is OK and it is a time string', async () => {
    const input = '2045-01-23T08:27:57.000+0000';
    mock.get(mockUrl, (req, res, ctx) => res(ctx.json(input)));
    const loginExpiry = await LoginExpiryAPI();
    expect(loginExpiry.tidspunkt).toEqual(ParseExpiryDate(input));
  });

  it('should return a status and empty string when endpoint is not found', async () => {
    mock.get(mockUrl, (req, res, ctx) => res(ctx.status(404)));

    const loginExpiry = await LoginExpiryAPI();
    expect(loginExpiry.tidspunkt).toBeUndefined();
  });
});
