import { RequestMock, Selector } from 'testcafe';
import { waitForReact, ReactSelector } from 'testcafe-react-selectors';
import { mockHeaders } from '@smartive/testcafe-utils';
import arbeidsgiverRespons from './mocks/arbeidsgivere';

const arbeidsgiverAPI = new RegExp(/\/api\/v1\/arbeidsgivere/);
const cookiePlease = new RegExp(/\/local\/cookie-please/);
const loginExpiry = new RegExp(/\/api\/v1\/login-expiry/);
const navAuth = new RegExp(/\/person\/innloggingsstatus\/auth/);
const grunnBeloep = new RegExp(/\/api\/v1\/grunnbeloep/);
const innsendingAPI = new RegExp(/\/api\/v1\/refusjonskrav/);

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
  .respond({ referansenummer: '10' }, 200, mockHeaders);

fixture`Enkeltinnsending`.clientScripts([
  { module: 'mockdate' },
  { content: "MockDate.set('2021-06-22')" }
])
  .page`http://localhost:3000/nettrefusjon/bulk/?bedrift=810007842&TestCafe=running`
  .requestHooks(cookieMock)
  .beforeEach(async () => {
    await waitForReact();
  });

test('Klikk submit uten data, fjern feilmeldinger en etter en og send inn', async (t) => {
  await t
    .click(
      ReactSelector('InternLenke').withText(
        'skal du bruke et eget skjema som du finner her'
      )
    )
    .expect(Selector('html').textContent)
    .contains('Fødselsnummer til arbeidstaker');

  await t
    .click(ReactSelector('BekreftCheckboksPanel').find('input'))
    .click(Selector('.knapp--hoved'))
    .expect(
      ReactSelector('Feiloppsummering').withText('Fødselsnummer må fylles ut')
        .visible
    )
    .ok()
    .expect(Selector('html').textContent)
    .contains('Fødselsnummer må fylles ut')
    .expect(Selector('html').textContent)
    .contains('Dato må fylles ut')
    .expect(Selector('html').textContent)
    .contains('Antall dager må fylles ut')
    .expect(Selector('html').textContent)
    .contains('Beløp må fylles ut');

  const fnr = ReactSelector('FnrInput').find('.skjemaelement__input-fodselsnr');

  await t
    .typeText(fnr, '260')
    .expect(
      ReactSelector('Feiloppsummering').withText(
        'Fødselsnummer må ha 11 siffer'
      ).visible
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

  const belop = ReactSelector('EnkelRefusjon');
  await t
    .typeText(belop, '5000')
    .expect(Selector('html').textContent)
    .notContains('Beløp må fylles ut');

  const velgDager = ReactSelector('EnkelDager');
  const velgDagerOption = velgDager.find('option');

  await t
    .click(velgDager)
    .click(velgDagerOption.withText('5'))
    .expect(Selector('html').textContent)
    .notContains('Feltet må fylles ut');

  const fraDato = ReactSelector('Datovelger').nth(0);
  const tilDato = ReactSelector('Datovelger').nth(1);

  await t
    .click(fraDato)
    .typeText(tilDato, '01.12.2021')
    .click(fraDato)
    .typeText(fraDato, '13.12.2021')
    .pressKey('tab')
    .expect(Selector('html').textContent)
    .notContains('Dato må fylles ut');

  await t
    .click(Selector('.knapp--hoved'))
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
