import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import arbeidsgivere from './data/arbeidsgivere';
import { unleashToggles } from './data/toggles';
import env from '../../util/environment';

const mock = FetchMock.configure({
  enableFallback: true,
  middleware: MiddlewareUtils.combine(
    MiddlewareUtils.delayMiddleware(500),
    MiddlewareUtils.loggingMiddleware()
  )
});

mock.get('/login', '/contextroot');
mock.post(env.unleashUrl, unleashToggles);
mock.get(process.env.REACT_APP_BASE_URL + '/api/v1/arbeidsgivere', arbeidsgivere);
