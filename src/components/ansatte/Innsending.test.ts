import fetchMock from 'fetch-mock-jest';
import Innsending from './Innsending';
import { SkjemaStatus, Ansatt, BackendStatus } from '../../data/types/sporenstreksTypes';

const mockServer = 'http://mockserver.nav.no';

jest.mock('../../util/environment', () => ({
  get baseUrl() {
    return mockServer
  },
  get loginServiceUrl() {
    return mockServer + "/loginServer"
  }
}))

const mockUrl = mockServer + '/api/v1/refusjonskrav/list';

describe('Innsending', () => {
  it("should handle a 404", async () => {
    const input: Ansatt[] = [
      {
        fnr: "1234",
        fom: "fom",
        tom: "tom",
        id: 123,
        status: SkjemaStatus.AVVENTER,
        oppdatert: 1
      },
      {
        fnr: "1234",
        fom: "fom",
        tom: "tom",
        id: 234,
        status: SkjemaStatus.AVVENTER,
        oppdatert: 1
      }
    ]

    fetchMock
      .post(mockUrl, 400);

    expect(await Innsending('arbeidsgiverId', input, jest.fn())).toEqual(input);

    fetchMock.reset();
  })

  it("should handle a 200", async () => {
    const input: Ansatt[] = [
      {
        fnr: "1234",
        fom: "fom",
        tom: "tom",
        id: 123,
        status: SkjemaStatus.AVVENTER,
        oppdatert: 1
      },
      {
        fnr: "2345",
        fom: "fom2",
        tom: "tom2",
        id: 234,
        status: SkjemaStatus.AVVENTER,
        oppdatert: 1
      }
    ]

    const backendResponce: BackendStatus[] = [
      {
        status: "OK",
        validationErrors: null,
        genericMessage: null,
        referenceNumber: "1234"
      },
      {
        status: "VALIDATION_ERRORS",
        validationErrors: [
          {
            validationType: "type",
            message: "Validation periode error",
            propertyPath: 'perioder[0].tom',
            invalidValue: "fom"
          }
        ],
        genericMessage: null,
        referenceNumber: null
      }
    ]

    const expected: Ansatt[] = [
      {
        fnr: "1234",
        fom: "fom",
        tom: "tom",
        id: 123,
        status: SkjemaStatus.GODKJENT,
        referenceNumber: "1234",
        oppdatert: 1
      },
      {
        fnr: "2345",
        fom: "fom2",
        tom: "tom2",
        id: 234,
        status: SkjemaStatus.VALIDERINGSFEIL,
        oppdatert: 1,
        periodeError: "Validation periode error.",
      }
    ]

    fetchMock
      .post(mockUrl, backendResponce, { overwriteRoutes: true });

    expect(await Innsending('arbeidsgiverId', input, jest.fn())).toEqual(expected);

    fetchMock.reset();
  })

  it("should handle a 401", async () => {
    const input: Ansatt[] = [
      {
        fnr: "1234",
        fom: "fom",
        tom: "tom",
        id: 123,
        status: SkjemaStatus.AVVENTER,
        oppdatert: 1
      },
      {
        fnr: "1234",
        fom: "fom",
        tom: "tom",
        id: 234,
        status: SkjemaStatus.AVVENTER,
        oppdatert: 1
      }
    ]

    Object.defineProperty(window, "location", {
      value: new URL(mockUrl)
    });

    fetchMock
      .post(mockUrl, 401);

    await Innsending('arbeidsgiverId', input, jest.fn());

    expect(window.location.href).toEqual(mockServer + "/loginServer");

    fetchMock.reset();
  })
})
