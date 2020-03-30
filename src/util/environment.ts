class Environment {

  private env = (window as any)._env_ || {
    MOCK_BACKEND: 'true',
    AMPLITUDE_KEY: '7a887ba3e5a07c755526c6591810101a',
    AMPLITUDE_ENABLED: 'true',
    NODE_ENV: 'development'
  };

  get loginServiceUrl() {
    switch (this.environmentMode) {
      case 0 : return "https://loginservice.nav.no/login?redirect=https://arbeidsgiver.nav.no/nettrefusjon/";
      case 1 : return "https://loginservice-q.nav.no/login?redirect=https://arbeidsgiver-q.nav.no/nettrefusjon/";
      default : return "http://localhost:3000/local/cookie-please?subject=12321&redirect=http://localhost:3000/nettrefusjon/";
    }
  }

  get baseUrl() {
    switch (this.environmentMode) {
      case 0 : return "https://arbeidsgiver.nav.no/nettrefusjon";
      case 1 : return "https://arbeidsgiver-q.nav.no/nettrefusjon";
      default : return "http://localhost:3000";
    }
  }

  get environmentMode(){
    if (window.location.hostname === "localhost") {
      return 2; // local
    }
    if (window.location.hostname.indexOf("-") > -1) {
      return 1; // preprod
    }
    return 0; // prod
  }

  get amplitudeKey() {
    return this.env.AMPLITUDE_KEY
  }

  get amplitudeEnabled() {
    return this.env.AMPLITUDE_ENABLED === 'true'
  }
}

const env = new Environment();

export default env;
