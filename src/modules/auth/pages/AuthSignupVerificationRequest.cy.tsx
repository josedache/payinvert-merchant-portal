import AuthSignupVerificationRequest from "./AuthSignupVerificationRequest.tsx";
import { createRoutesStub, generatePath } from "react-router-dom";
import { SIGNUP_VERIFY_REQUEST } from "constants/urls.ts";

describe("<AuthSignupVerificationRequest />", () => {
  it("renders", () => {
    const Stub = createRoutesStub([
      { path: SIGNUP_VERIFY_REQUEST, Component: AuthSignupVerificationRequest },
    ]);

    const email = "test@tmpbox.com";

    cy.mount(
      <Stub initialEntries={[generatePath(SIGNUP_VERIFY_REQUEST, { email })]} />
    );
  });
});
