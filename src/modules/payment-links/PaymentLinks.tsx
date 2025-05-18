import { Outlet } from "react-router-dom";

function PaymentLinks() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default PaymentLinks;

export const Component = PaymentLinks;
