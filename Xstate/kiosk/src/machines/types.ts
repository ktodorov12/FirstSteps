import type { CategoryType } from "../types";

// Events ===============================================
export type KioskUserEvents =
  | { type: "user.close_checkout" }
  | { type: "user.checkout" }
  | { type: "user.finish" }
  | { type: "user.change_product" };

export type KioskAddEvents = { type: "add.close" } | { type: "add.select" };

export type KioskTransactionEvents =
  | { type: "transaction.successful" }
  | { type: "transaction.unsuccessful" }
  | { type: "transaction.close" }
  | { type: "transaction.retry" };

export type KioskProductEvents = { type: "products.change"; newProduct: CategoryType };

export type KioskMachineEvents =
  | KioskUserEvents
  | KioskAddEvents
  | KioskTransactionEvents
  | KioskProductEvents;

// States ===============================================
export const KioskMachineState = {
  INIT: "INIT",
  BROWSING: "BROWSING",
  ORDERING_PRODUCT: "ORDERING_PRODUCT",
  CHECKING_OUT: "CHECKING_OUT",
  FINISH_ORDER: "FINISH_ORDER",
  FAIL_TRANSACTION: "FAIL_TRANSACTION",
  SUCCESS_TRANSACTION: "SUCCESS_TRANSACTION",
} as const;

export type KioskMachineStateType =
  (typeof KioskMachineState)[keyof typeof KioskMachineState];
