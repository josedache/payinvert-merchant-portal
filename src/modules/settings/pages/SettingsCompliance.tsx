import SettingComplianceAddEdit from "../features/SettingComplianceAddEdit";
import PageTitle from "components/PageTitle";

export default function SettingsCompliance() {
  return (
    <div>
      <PageTitle>Compliance</PageTitle>
      <SettingComplianceAddEdit />
    </div>
  );
}

export const Component = SettingsCompliance;
