import * as utils from './utils';

describe('utils', () => {
  describe('hasData', () => {
    it('should return true when we have data', () => {
      const input: utils.FetchState = {
        data: 'Some data',
        status: utils.FetchStatus.PENDING,
        error: null,
        httpCode: 200
      };
      expect(utils.hasData(input)).toBeTruthy();
    });

    it('should return false when we do not have data', () => {
      const input: utils.FetchState = {
        data: null,
        status: utils.FetchStatus.PENDING,
        error: null,
        httpCode: 200
      };
      expect(utils.hasData(input)).toBeFalsy();
    });
  });

  describe('has401', () => {
    it('should return true when we have data', () => {
      const input: utils.FetchState = {
        data: 'Some data',
        status: utils.FetchStatus.PENDING,
        error: null,
        httpCode: 401
      };
      expect(utils.has401(input)).toBeTruthy();
    });

    it('should return false when we do not have data', () => {
      const input: utils.FetchState = {
        data: null,
        status: utils.FetchStatus.PENDING,
        error: null,
        httpCode: 200
      };
      expect(utils.has401(input)).toBeFalsy();
    });
  });

  describe('hasFailed', () => {
    it('should return true when we have error', () => {
      const input: utils.FetchState = {
        data: 'Some data',
        status: utils.FetchStatus.PENDING,
        error: 'an error',
        httpCode: 401
      };
      expect(utils.hasFailed(input)).toBeTruthy();
    });

    it('should return true when we have errorcode in httpCode', () => {
      const input: utils.FetchState = {
        data: 'Some data',
        status: utils.FetchStatus.PENDING,
        error: null,
        httpCode: 500
      };
      expect(utils.hasFailed(input)).toBeTruthy();
    });

    it('should return false when we do not have error', () => {
      const input: utils.FetchState = {
        data: null,
        status: utils.FetchStatus.PENDING,
        error: null,
        httpCode: 200
      };
      expect(utils.hasFailed(input)).toBeFalsy();
    });
  });

  describe('hasFinished', () => {
    it('should return true when we have status finished', () => {
      const input: utils.FetchState = {
        data: 'Some data',
        status: utils.FetchStatus.FINISHED,
        error: 'an error',
        httpCode: 401
      };
      expect(utils.hasFinished(input)).toBeTruthy();
    });

    it('should return false when we do not have status finished', () => {
      const input: utils.FetchState = {
        data: null,
        status: utils.FetchStatus.PENDING,
        error: null,
        httpCode: 200
      };
      expect(utils.hasFinished(input)).toBeFalsy();
    });
  });

  describe('isNotStartedOrPending', () => {
    it('should return true when we have status not started', () => {
      const input: utils.FetchState = {
        data: 'Some data',
        status: utils.FetchStatus.NOT_STARTED,
        error: 'an error',
        httpCode: 401
      };
      expect(utils.isNotStartedOrPending(input)).toBeTruthy();
    });

    it('should return true when we have status pending', () => {
      const input: utils.FetchState = {
        data: 'Some data',
        status: utils.FetchStatus.PENDING,
        error: 'an error',
        httpCode: 401
      };
      expect(utils.isNotStartedOrPending(input)).toBeTruthy();
    });

    it('should return false when we do not have status not started or pending', () => {
      const input: utils.FetchState = {
        data: null,
        status: utils.FetchStatus.FINISHED,
        error: null,
        httpCode: 200
      };
      expect(utils.isNotStartedOrPending(input)).toBeFalsy();
    });
  });

  describe('isNotStarted', () => {
    it('should return true when we have status not started', () => {
      const input: utils.FetchState = {
        data: 'Some data',
        status: utils.FetchStatus.NOT_STARTED,
        error: 'an error',
        httpCode: 401
      };
      expect(utils.isNotStarted(input)).toBeTruthy();
    });

    it('should return false when we do not have status not started', () => {
      const input: utils.FetchState = {
        data: null,
        status: utils.FetchStatus.FINISHED,
        error: null,
        httpCode: 200
      };
      expect(utils.isNotStarted(input)).toBeFalsy();
    });
  });
});
