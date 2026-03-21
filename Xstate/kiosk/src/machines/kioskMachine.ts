import {
  assign,
  createActor,
  fromPromise,
  getNextTransitions,
  raise,
  setup,
} from "xstate";
import type { CategoryType, OrderedProducts } from "../types";
import { KioskMachineState, type KioskMachineEvents } from "./types";
import type { StateFrom } from "xstate";
import { useKioskStore } from "../stores/kiosk-store";

export interface KioskMachineContext {
  orderedProducts: Array<OrderedProducts>;
  currentProductType: CategoryType;
}

const initialContext: KioskMachineContext = {
  orderedProducts: [],
  currentProductType: "" as CategoryType,
};

const kioskMachine = setup({
  types: {
    context: {} as KioskMachineContext,
    events: {} as KioskMachineEvents,
  },
  guards: {
    isSelectedProductChanged: ({ context, event }) => {
      if (event.type !== "products.change") {
        return false;
      }

      return context.currentProductType !== event.newProduct;
    },
    hasProductsInCart: () => {
      // TODO: implement;
      return true;
    },
  },
  actions: {
    assignNewCategory: assign({
      currentProductType: ({ context, event }) => {
        if (event.type === "products.change") {
          return event.newProduct;
        }

        return context.currentProductType;
      },
    }),
    syncProductsWithZustand: ({ event }) => {
      if (event.type !== "products.change") {
        return;
      }

      const store = useKioskStore.getState();
      store.setCurrentProductType(event.newProduct);
      store.getProductsByCategory(event.newProduct);
    },
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
  initial: KioskMachineState.INIT,
  states: {
    [KioskMachineState.INIT]: {
      always: {
        target: KioskMachineState.BROWSING,
        actions: raise({ type: "products.change", newProduct: "coffee" }),
      },
    },
    [KioskMachineState.BROWSING]: {
      on: {
        "products.change": {
          guard: "isSelectedProductChanged",
          actions: ["assignNewCategory", "syncProductsWithZustand"],
        },
      },
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

_actor.subscribe((state) => {
  console.log("[KioskActorState]", "State received -", JSON.stringify(state, null, 2));
  console.log(
    "[KioskActorNextTransitions]",
    "Transitions -",
    JSON.stringify(getNextTransitions(_actor.getSnapshot()), null, 2),
  );
});

export function startKioskMachine() {
  _actor.start();
}

export function getKioskActorRef() {
  return _actor;
}
