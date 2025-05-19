import { Outlet } from "react-router-dom";

function PaymentLink() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default PaymentLink;

export const Component = PaymentLink;
