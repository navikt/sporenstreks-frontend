import React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import '../../pages/Kvittering.less';
import { Row, Container } from "nav-frontend-grid";
import TokenUtloper from '../ansatte/TokenUtloper';

export const LoginFornyet = () => (
  <Container className={"innloggetside__innhold"}>
    <Row>
      <Panel>
        <Innholdstittel>Innloggingen er fornyet</Innholdstittel>
      </Panel>
      <Panel>
        <Normaltekst>
          Du har nå fornyet innloggingen med en time. Denne innloggingen utløper kl: <TokenUtloper/>
        </Normaltekst>
        <Normaltekst>
          Dette vinduet kan nå lukkes.
        </Normaltekst>
      </Panel>
    </Row>
  </Container>
)

export default LoginFornyet;
