enum EnvironmentType {
  PROD,
  PREPROD_DEV, // Angir at man aksesserer preprod via naisdevice på *.dev.nav.no, kun tilgjengelig via naisdevice
  PREPROD_Q, // angir at man aksesserer preprod inne i nord korea
  LOCAL
}

class Environment {

  private env = (window as any)._env_ || {
    MOCK_BACKEND: 'true',
    NODE_ENV: 'development'
  };

  get loginServiceUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD : return 'https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/nettrefusjon/';
      case EnvironmentType.PREPROD_DEV : return 'https://loginservice.dev.nav.no/login?redirect=https://arbeidsgiver-nettrefusjon.dev.nav.no';
      case EnvironmentType.PREPROD_Q : return 'https://loginservice-q.nav.no/login?redirect=https://arbeidsgiver-q.nav.no/nettrefusjon/';
      default : return 'http://localhost:8080/local/cookie-please?subject=12321&redirect=http://localhost:3000/nettrefusjon/';
    }
  }

  get downloadUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD : return 'https://arbeidsgiver.nav.no/nettrefusjon';
      case EnvironmentType.PREPROD_DEV : return 'https://arbeidsgiver-nettrefusjon.dev.nav.no/nettrefusjon';
      case EnvironmentType.PREPROD_Q : return 'https://arbeidsgiver-q.nav.no/nettrefusjon';
      default : return 'http://localhost:8080';
    }
  }

  get baseUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD : return 'https://arbeidsgiver.nav.no/nettrefusjon';
      case EnvironmentType.PREPROD_DEV : return 'https://arbeidsgiver-nettrefusjon.dev.nav.no/nettrefusjon';
      case EnvironmentType.PREPROD_Q : return 'https://arbeidsgiver-q.nav.no/nettrefusjon';
      default : return 'http://localhost:3000';
    }
  }

  get environmentMode(){
    if (window.location.hostname === 'localhost') {
      return EnvironmentType.LOCAL;
    }
    if (window.location.hostname.indexOf('.dev.nav.no') > -1) {
      return EnvironmentType.PREPROD_DEV;
    }
    if (window.location.hostname.indexOf('arbeidsgiver-q.nav.no') > -1) {
      return EnvironmentType.PREPROD_Q;
    }
    return EnvironmentType.PROD;
  }

}

const env = new Environment();

export default env;
