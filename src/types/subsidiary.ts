export type Subsidiary = {
  id: number;
  name: string;
  businessId: number;
  businessName: string;
  description: string;
  status: string;
  verificationStatus: string;
  supportEmail: string;
  role: string;
  subsidiaryLogo: string | null;
  subsidiarySettlementOption: string;
  roleId: number;
  defaultEnvId: number | null;
  isDefault: boolean;
  country: string;
  industry: string | null;
  legalBusinessName: string;
  businessType: string;
};

export type SubsidiaryCompliance = {
  profileCompliance: {
    businessType: {
      id: number;
      name: string;
    };
    country: {
      id: number;
      name: string;
    };
    description: string;
    businessName: string;
    bvn: string;
    industry: {
      id: number;
      name: string;
    };
    compliancePercentage: number;
  };
  bankCompliance: {
    bankId: number | null;
    bankName: string | null;
    accountName: string | null;
    accountNumber: string | null;
    compliancePercentage: number;
  };
  directorCompliance: {
    idNumber: string | null;
    fullName: string | null;
    identity: string | null;
    compliancePercentage: number;
  };
  kycDetailsCompliance: {
    meansOfIdentification: string | null;
    proofOfAddress: string | null;
    compliancePercentage: number;
  };
};

export type SubsidiaryComplianceChecker = {
  agreementCompliance: {
    dateCreated: string;
    termOfServiceSigned: string;
    slaSigned: string;
    msaSigned: string;
    signedBy: string;
    compliancePercentage: number;
  };
  profileCompliance: {
    businessTypeEnum: number;
    businessType: {
      id: number;
      name: string;
    };
    businessName: string;
    businessDescription: string | null;
    registrationNumber: string | null;
    taxIdNumber: string | null;
    isBusinessVerified: boolean | null;
    compliancePercentage: number;
  };
  bankCompliance: {
    bankId: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    compliancePercentage: number;
  };
  directorOrOwnerCompliance: {
    bvn: string | null;
    fullName: string | null;
    isBvnVerified: boolean | null;
    uploadedDocument: { id: number; name: string } | null;
    compliancePercentage: number;
  };
  businessRegistrationCompliance: {
    certOfIncorporation: string | null;
    memoOfAssociation: string | null;
    compliancePercentage: number;
  };
  contactCompliance: {
    emailAddress: string | null;
    phoneNumber: string | null;
    businessAddress: string | null;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
    compliancePercentage: number;
  };
};
