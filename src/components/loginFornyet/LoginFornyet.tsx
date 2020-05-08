
import React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import '../../pages/Kvittering.less';
import { Row } from "nav-frontend-grid";

export const LoginFornyet = () => (
  <Row>
    <Panel>
      <Innholdstittel>Innloggingen er fornyet</Innholdstittel>
    </Panel>
    <Panel>
      <Normaltekst>
        Du har nå fornyet innloggingen med en time.
      </Normaltekst>
      <Normaltekst>
        Dette vinduet kan nå lukkes.
      </Normaltekst>
    </Panel>
  </Row>
)

export default LoginFornyet;
