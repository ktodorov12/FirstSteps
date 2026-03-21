import { assign, createActor, fromPromise, setup } from "xstate";
import type { CategoryType, OrderedProducts } from "../types";
import { KioskMachineState, type KioskMachineEvents } from "./types";
import type { StateFrom } from "xstate";

export interface KioskMachineContext {
  orderedProducts: Array<OrderedProducts>;
  currentProductType: CategoryType;
}

const initialContext: KioskMachineContext = {
  orderedProducts: [],
  currentProductType: "coffee",
};

const kioskMachine = setup({
  types: {
    context: {} as KioskMachineContext,
    events: {} as KioskMachineEvents,
  },
  guards: {
    isSelectedProductChanged: () => {
      // TODO: implement;
      return true;
    },
    hasProductsInCart: () => {
      // TODO: implement;
      return true;
    },
  },
  actions: {
    getProducts: assign({
      // TODO: implement;
    }),
    changeProductInCartQuantity: assign({
      // TODO: implement;
    }),
  },
  actors: {
    addToCart: fromPromise(async () => {
      // TODO: implement;
    }),
    paymentProcessor: fromPromise(async () => {
      // TODO: implement;
    }),
  },
  delays: {
    paymentIdleness: 5_000,
  },
}).createMachine({
  context: initialContext,
  id: "kiosk",
  initial: KioskMachineState.BROWSING,
  states: {
    [KioskMachineState.BROWSING]: {
      entry: "getProducts",
    },
    [KioskMachineState.ORDERING_PRODUCT]: {},
    [KioskMachineState.CHECKING_OUT]: {},
    [KioskMachineState.FINISH_ORDER]: {},
    [KioskMachineState.FAIL_TRANSACTION]: {},
    [KioskMachineState.SUCCESS_TRANSACTION]: {},
  },
});

export type KioskState = StateFrom<typeof kioskMachine>;

const _actor = createActor(kioskMachine);

export function startKioskMachine() {
  _actor.start();
}

export function getKioskActorRef() {
  return _actor;
}
