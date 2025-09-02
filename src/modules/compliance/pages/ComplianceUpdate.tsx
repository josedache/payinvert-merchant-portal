import PageTitle from "components/PageTitle";
import ComplianceUpdateScaffold from "modules/compliance/features/ComplianceUpdate";

function ComplianceUpdate() {
  return (
    <>
      <PageTitle breadcrumbs={[{ label: "Compliance Update" }]}>
        Compliance Update
      </PageTitle>
      <ComplianceUpdateScaffold />
    </>
  );
}

export const Component = ComplianceUpdate;

export default ComplianceUpdate;
