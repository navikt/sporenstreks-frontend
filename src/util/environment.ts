enum EnvironmentType {
  PROD, PREPROD, LOCAL
}

class Environment {

  private env = (window as any)._env_ || {
    MOCK_BACKEND: 'true',
    AMPLITUDE_ENABLED: 'true',
    NODE_ENV: 'development'
  };

  get amplitudeKey() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD : return "d5b43a81941b61a3b06059197807a25a";
      case EnvironmentType.PREPROD : return "7a887ba3e5a07c755526c6591810101a";
      default : return "7a887ba3e5a07c755526c6591810101a";
    }
  }

  get unleashUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD : return "https://tjenester.nav.no/syfounleash";
      case EnvironmentType.PREPROD : return "https://tjenester-q1.nav.no/syfounleash"
      default : return "http://localhost:1956/syfounleash";
    }
  }

  get loginServiceUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD : return "https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/nettrefusjon/";
      case EnvironmentType.PREPROD : return "https://loginservice-q.nav.no/login?redirect=https://arbeidsgiver-q.nav.no/nettrefusjon/";
      default : return "http://localhost:3000/local/cookie-please?subject=12321&redirect=http://localhost:3000/nettrefusjon/";
    }
  }

  get baseUrl() {
    switch (this.environmentMode) {
      case EnvironmentType.PROD : return "https://arbeidsgiver.nav.no/nettrefusjon";
      case EnvironmentType.PREPROD : return "https://arbeidsgiver-q.nav.no/nettrefusjon";
      default : return "http://localhost:3000";
    }
  }

  get environmentMode(){
    if (window.location.hostname === "localhost") {
      return EnvironmentType.LOCAL;
    }
    if (window.location.hostname.indexOf("-") > -1) {
      return EnvironmentType.PREPROD;
    }
    return EnvironmentType.PROD;
  }

  get amplitudeEnabled() {
    return this.env.AMPLITUDE_ENABLED === 'true'
  }
}

const env = new Environment();

export default env;
