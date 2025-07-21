import AuthSignupVerification from "./AuthSignupVerification.tsx";
import { createRoutesStub } from "react-router-dom";
import { SIGNUP_VERIFY } from "constants/urls.ts";

describe("<AuthSignupVerification />", () => {
  it("renders", () => {
    const Stub = createRoutesStub([
      { path: SIGNUP_VERIFY, Component: AuthSignupVerification },
    ]);

    const token = "PGW-ID-F8C69C2F8AAF4B83BC3068A1450F7337";
    cy.mount(
      <Stub initialEntries={[SIGNUP_VERIFY.concat("?token=", token)]} />
    );
    
  });
});
