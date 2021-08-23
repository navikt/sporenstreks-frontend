import { RequestMock, Selector } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';
import { mockHeaders } from '@smartive/testcafe-utils';

const arbeidsgiverAPI = new RegExp(/\/api\/v1\/arbeidsgivere/);
const cookiePlease = new RegExp(/\/local\/cookie-please/);
const loginExpiry = new RegExp(/\/api\/v1\/login-expiry/);
const navAuth = new RegExp(/\/person\/innloggingsstatus\/auth/);
const grunnBeloep = new RegExp(/\/api\/v1\/grunnbeloep/);
const innsendingAPI = new RegExp(/\/api\/v1\/refusjonskrav\/list/);

const arbeidsgiverRespons = [
  {
    name: 'ANSTENDIG BJØRN KOMMUNE',
    type: 'Enterprise',
    parentOrganizationNumber: null,
    organizationForm: 'KOMM',
    organizationNumber: '810007672',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN BRANNVESEN',
    type: 'Business',
    parentOrganizationNumber: '810007702',
    organizationForm: 'BEDR',
    organizationNumber: '810008032',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN BARNEHAGE',
    type: 'Business',
    parentOrganizationNumber: '810007702',
    organizationForm: 'BEDR',
    organizationNumber: '810007842',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN BYDEL',
    type: 'Enterprise',
    parentOrganizationNumber: null,
    organizationForm: 'ORGL',
    organizationNumber: '810007702',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'ANSTENDIG PIGGSVIN SYKEHJEM',
    type: 'Business',
    parentOrganizationNumber: '810007702',
    organizationForm: 'BEDR',
    organizationNumber: '810007982',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'SKOPPUM OG SANDØY',
    type: 'Business',
    parentOrganizationNumber: null,
    organizationForm: 'BEDR',
    organizationNumber: '911206722',
    socialSecurityNumber: null,
    status: 'Active'
  },
  {
    name: 'SKJERSTAD OG KJØRSVIKBUGEN',
    type: 'Enterprise',
    parentOrganizationNumber: null,
    organizationForm: 'AS',
    organizationNumber: '911212218',
    socialSecurityNumber: null,
    status: 'Active'
  }
];

const headereJson = {
  'content-type': 'application/json; charset=UTF-8',
  'access-control-allow-origin': 'http://localhost:3000',
  'access-control-allow-credentials': 'true',
  'strict-transport-security': 'max-age=15724800; includeSubDomains'
};

const headereJsonUnauthorized = {
  'content-type': 'application/json; charset=UTF-8',
  'access-control-allow-origin': '*'
};

const headereText = Object.apply({}, headereJson);

headereText['content-type'] = 'text/html; charset=UTF-8';

const grunnBeloepVerdier = {
  dato: '2021-05-01',
  grunnbeloep: 106399,
  grunnbeloepPerMaaned: 8867,
  gjennomsnittPerAar: 104716,
  omregningsfaktor: 1.049807
};

const cookieMock = RequestMock()
  .onRequestTo(loginExpiry)
  .respond('"2025-08-02T10:51:34.000+00:00"', 200, headereJson)
  .onRequestTo(cookiePlease)
  .respond(
    "<script>window.location.href='http://localhost:3000/nettrefusjon/bulk/?bedrift=810007842?loggedIn=true';</script>",
    200,
    headereText
  )
  .onRequestTo(arbeidsgiverAPI)
  .respond(arbeidsgiverRespons, 200, headereJson)
  .onRequestTo(navAuth)
  .respond(null, 200, headereJson)
  .onRequestTo(grunnBeloep)
  .respond(grunnBeloepVerdier, 200, mockHeaders)
  .onRequestTo(innsendingAPI)
  .respond(null, 201, mockHeaders);

fixture`Bulkinnsending`
  .page`http://localhost:3000/nettrefusjon/bulk/?bedrift=810007842&TestCafe=running`
  .requestHooks(cookieMock)
  .beforeEach(async () => {
    await waitForReact();
  });

test('Klikk submit uten data, fjern feilmeldinger en etter en og send inn', async (t) => {
  await t
    .click(ReactSelector('BekreftCheckboksPanel').find('input'))
    .click(ReactSelector('Hovedknapp'))
    .expect(
      ReactSelector('Feiloppsummering').withText('Det er en feil i rad nr 1')
        .visible
    )
    .ok()
    .expect(Selector('html').textContent)
    .contains('Fødselsnummer må fylles ut')
    .expect(Selector('html').textContent)
    .contains('Perioden må ha 2 gyldige datoer')
    .expect(Selector('html').textContent)
    .contains('Feltet må fylles ut')
    .expect(Selector('html').textContent)
    .contains('Beløp må fylles ut')
    .expect(Selector('html').textContent)
    .contains('Du må rette feilene før du kan sende inn skjema');

  const fnr = ReactSelector('FnrInput').find('.skjemaelement__input-fodselsnr');

  await t
    .typeText(fnr, '260')
    .expect(
      ReactSelector('Feiloppsummering').withText('Det er en feil i rad nr 1')
        .visible
    )
    .ok()
    .expect(Selector('html').textContent)
    .contains('Fødselsnummer må ha 11 siffer')
    .expect(Selector('html').textContent)
    .notContains('Fødselsnummer må fylles ut');

  await t
    .click(fnr)
    .pressKey('ctrl+a delete')
    .typeText(fnr, '20125027610')
    .expect(Selector('html').textContent)
    .notContains('Fødselsnummer må ha 11 siffer')
    .expect(Selector('html').textContent)
    .notContains('Fødselsnummer må fylles ut');

  const belop = ReactSelector('BulkRefusjon');
  await t
    .typeText(belop, '5000')
    .expect(Selector('html').textContent)
    .notContains('Beløp må fylles ut');

  const velgDager = ReactSelector('BulkDager');
  const velgDagerOption = velgDager.find('option');

  await t
    .click(velgDager)
    .click(velgDagerOption.withText('5'))
    .expect(Selector('html').textContent)
    .notContains('Feltet må fylles ut');

  const fraDato = ReactSelector('BulkPeriode');
  const valgtFraDato = Selector(
    '.flatpickr-calendar.open .dayContainer .flatpickr-day:nth-child(3)'
  );
  const valgtTilDato = Selector(
    '.flatpickr-calendar.open .dayContainer .flatpickr-day:nth-child(13)'
  );

  await t
    .click(fraDato)
    .click(valgtFraDato)
    .click(valgtTilDato)
    .expect(Selector('html').textContent)
    .notContains('Perioden må ha 2 gyldige datoer');

  await t
    .click(ReactSelector('Hovedknapp'))
    .click(ReactSelector('ModalWrapper').findReact('Knapp'))
    .expect(Selector('html').textContent)
    .contains('Søknaden er mottatt');
});

test('Legg til og fjern perioder', async (t) => {
  await t
    .click(ReactSelector('LeggTilKnapp'))
    .expect(ReactSelector('RefusjonInput').count)
    .eql(2);

  await t
    .scrollBy(0, 200)
    .click(ReactSelector('InternLenke').withText('Slett'))
    .expect(ReactSelector('RefusjonInput').count)
    .eql(1);
});
