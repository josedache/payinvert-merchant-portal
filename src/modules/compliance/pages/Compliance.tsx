import PageTitle from "components/PageTitle";
import ComplianceUpdate from "modules/compliance/features/ComplianceUpdate";

export default function Compliance() {
  return (
    <>
      <PageTitle breadcrumbs={[{ label: "Compliance" }]}>Compliance</PageTitle>
      <ComplianceUpdate isView />
    </>
  );
}

export const Component = Compliance;
