enum EnvironmentType {
  PROD, PREPROD, LOCAL
}

class Environment {

  private env = (window as any)._env_ || {
    MOCK_BACKEND: 'true',
    NODE_ENV: 'development'
  };

  get unleashUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD : return 'https://tjenester.nav.no/syfounleash';
      case EnvironmentType.PREPROD : return 'https://tjenester-q1.nav.no/syfounleash'
      default : return 'http://localhost:1956/syfounleash';
    }
  }

  get loginServiceUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD : return 'https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/nettrefusjon/';
      case EnvironmentType.PREPROD : return 'https://loginservice-q.nav.no/login?redirect=https://arbeidsgiver-q.nav.no/nettrefusjon/';
      default : return 'http://localhost:3000/local/cookie-please?subject=12321&redirect=http://localhost:3000/nettrefusjon/';
    }
  }

  get baseUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD : return 'https://arbeidsgiver.nav.no/nettrefusjon';
      case EnvironmentType.PREPROD : return 'https://arbeidsgiver-q.nav.no/nettrefusjon';
      default : return 'http://localhost:3000';
    }
  }

  get environmentMode(){
    if (window.location.hostname === 'localhost') {
      return EnvironmentType.LOCAL;
    }
    if (window.location.hostname.indexOf('-') > -1) {
      return EnvironmentType.PREPROD;
    }
    return EnvironmentType.PROD;
  }

}

const env = new Environment();

export default env;
