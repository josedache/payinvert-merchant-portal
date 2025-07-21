// import { render, waitFor } from "configs/testing-library";
// import { createRoutesStub } from "react-router-dom";
// import { SIGNIN } from "constants/urls";
// import AuthSignin from "modules/auth/pages/AuthSignin";

describe("<AuthSignin />", () => {
  test.skip("Should render correctly, When email and password inputs exist", async () => {
    // const Stub = createRoutesStub([
    //   {
    //     path: SIGNIN,
    //     Component: AuthSignin,
    //   },
    // ]);

    // const { user, findByLabelText, findByText } = render(
    //   <Stub initialEntries={[SIGNIN]} />
    // );

    // const [emailNode, passwordNode, submitNode] = await Promise.all([
    //   findByLabelText(/Email Address/i, { selector: "input" }),
    //   findByLabelText(/Password/i, { selector: "input" }),
    //   findByText(/Sign in/i, { selector: "button" }),
    //   findByText(/Create an account/i, { selector: "a" }),
    //   findByText(/Sign in to your Account/i),
    // ]);
    //
    // const email = "test@tmpbox.net";
    // const password = "P@55w0rd";
    //
    // expect(submitNode).toBeDisabled();
    //
    // await user.type(emailNode, email);
    // await user.type(passwordNode, password);
    //
    // expect(submitNode).toBeEnabled();
    // expect(emailNode).toHaveDisplayValue(email);
    // expect(passwordNode).toHaveDisplayValue(password);
  });

  test.skip("Should navigate, When form is submitted with valid credential", async () => {
    // const Stub = createRoutesStub([
    //   {
    //     path: SIGNIN,
    //     Component: AuthSignin,
    //   },
    // ]);
    //
    // const { user, findByLabelText, findByText } = render(
    //   <Stub initialEntries={[SIGNIN]} />
    // );
    //
    // const [emailNode, passwordNode, submitNode] = await Promise.all([
    //   findByLabelText(/Email Address/i, { selector: "input" }),
    //   findByLabelText(/Password/i, { selector: "input" }),
    //   findByText(/Sign in/i, { selector: "button" }),
    // ]);
    //
    // const email = "bettykitchen@tmpbox.net";
    // const password = "P@55w0rd";
    //
    // await user.type(emailNode, email);
    // await user.type(passwordNode, password);
    // await user.click(submitNode);

    // await waitFor(() => {
    //   expect(emailNode).not.toBeInTheDocument();
    //   expect(passwordNode).not.toBeInTheDocument();
    //   expect(submitNode).not.toBeInTheDocument();
    // });
  });

  test.skip("Should not navigate, When form is submitted with invalid credential", async () => {
    // const Stub = createRoutesStub([
    //   {
    //     path: SIGNIN,
    //     Component: AuthSignin,
    //   },
    // ]);
    //
    // const { user, findByLabelText, findByText } = render(
    //   <Stub initialEntries={[SIGNIN]} />
    // );
    //
    // const [emailNode, passwordNode, submitNode] = await Promise.all([
    //   findByLabelText(/Email Address/i, { selector: "input" }),
    //   findByLabelText(/Password/i, { selector: "input" }),
    //   findByText(/Sign in/i, { selector: "button" }),
    // ]);
    //
    // await user.type(emailNode, "test@tmpbox.net");
    // await user.type(passwordNode, "wrongP@55w0rd");
    // await user.click(submitNode);

    // expect(emailNode).toBeInTheDocument();
    // expect(passwordNode).toBeInTheDocument();
    // expect(submitNode).toBeInTheDocument();
  });
});
