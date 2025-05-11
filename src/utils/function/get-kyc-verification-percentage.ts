import { User } from "types/user";

export default function getKycVerificationPercentage(user: User): number {
  const steps = [
    user?.isEmailVerified,
    user?.isNinVerified,
    user?.isBvnVerified,
    user?.businesses?.[0]?.is_validated,
    user?.transactionPin?.[0]?.is_active,
  ].map((step) => ({
    verified: step,
  }));

  const verifiedSteps = steps?.filter((step) => step.verified).length;
  const totalSteps = steps.length;
  const verificationPercentage = (verifiedSteps / totalSteps) * 100;

  return verificationPercentage;
}
