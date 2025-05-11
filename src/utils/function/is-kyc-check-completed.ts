import { User } from "types/user";

export default function isKycCheckCompleted(user: User): boolean {
  if (!user) {
    return false;
  }
  return (
    user.isEmailVerified &&
    user.isNinVerified &&
    user.isBvnVerified &&
    user.businesses?.[0]?.is_validated &&
    user.transactionPin?.[0]?.is_active
  );
}
