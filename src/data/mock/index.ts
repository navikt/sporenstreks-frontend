import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import arbeidsgivere from './data/arbeidsgivere';
import env from '../../util/environment';

const mock = FetchMock.configure({
  enableFallback: true,
  middleware: MiddlewareUtils.combine(
    MiddlewareUtils.delayMiddleware(500),
    MiddlewareUtils.loggingMiddleware()
  )
});

mock.get('/login', '/nettrefusjon');
mock.get(env.baseUrl + '/api/v1/arbeidsgivere', arbeidsgivere);
