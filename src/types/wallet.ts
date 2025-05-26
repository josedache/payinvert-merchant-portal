export interface TransactionType {
  id: number;
  code: string;
  value: string;
  deposit: boolean;
  dividendPayout: boolean;
  withdrawal: boolean;
  interestPosting: boolean;
  feeDeduction: boolean;
  initiateTransfer: boolean;
  approveTransfer: boolean;
  withdrawTransfer: boolean;
  rejectTransfer: boolean;
  overdraftinterest: boolean;
  writtenoff: boolean;
  overdraftFee: boolean;
  withholdTax: boolean;
  escheat: boolean;
  amountHold: boolean;
  amountRelease: boolean;
  accrual: boolean;
  depositOrWithdrawal: boolean;
  transactionTypeEnum: string;
  annualFee: boolean;
  entryType: string;
  withdrawalFee: boolean;
  chargeTransaction: boolean;
  credit: boolean;
  overDraftinterestPosting: boolean;
  incomeFrominterest: boolean;
  payCharge: boolean;
  debit: boolean;
}

export interface Currency {
  code: string;
  name: string;
  decimalPlaces: number;
  inMultiplesOf: number;
  nameCode: string;
  displayLabel: string;
}

export interface PaymentType {
  id: number;
  name: string;
  isSystemDefined: boolean;
}

export interface PaymentDetailData {
  id: number;
  paymentType: PaymentType;
  accountNumber: string;
  checkNumber: string;
  routingCode: string;
  receiptNumber: string;
  bankNumber: string;
}

export interface Wallet {
  id: number;
  transactionType: TransactionType;
  currency: Currency;
  amount: number;
  runningBalance: number;
  reversed: boolean;
  submittedOnDate: number[];
  interestedPostedAsOn: boolean;
  submittedByUsername: string;
  isReversal: boolean;
  originalTransactionId: number;
  isManualTransaction: boolean;
  lienTransaction: boolean;
  releaseTransactionId: number;
  entryType: string;
  accountId: number;
  accountNo: string;
  date: number[];
  chargesPaidByData: any[];
  feeCharge: boolean;
  penaltyCharge: boolean;
  notReversed: boolean;
  depositAndNotReversed: boolean;
  reversalTransaction: boolean;
  withdrawal: boolean;
  interestPostingAndNotReversed: boolean;
  withdrawalFeeAndNotReversed: boolean;
  annualFeeAndNotReversed: boolean;
  feeChargeAndNotReversed: boolean;
  waiveFeeChargeAndNotReversed: boolean;
  penaltyChargeAndNotReversed: boolean;
  waivePenaltyChargeAndNotReversed: boolean;
  overdraftinterestAndNotReversed: boolean;
  withHoldTaxAndNotReversed: boolean;
  annualFee: boolean;
  dividendPayoutAndNotReversed: boolean;
  deposit: boolean;
  interestPosting: boolean;
  amountRelease: boolean;
  waiveCharge: boolean;
  savingsAccountChargesPaid: any[];
  chargeTransaction: boolean;
  credit: boolean;
  taxDetails: any[];
  manualTransaction: boolean;
  chargeTransactionAndNotReversed: boolean;
  payCharge: boolean;
  waiveFeeCharge: boolean;
  waivePenaltyCharge: boolean;
  debit: boolean;
  amountOnHold: boolean;
  paymentDetailData: PaymentDetailData;
}
