export type CounterEventListener = (e: CustomEvent<{ count: number }>) => void;

enum countEvent {
  increment = 'count/increment',
}

export const emitCountEventIncrement = (count: number) => {
  window.dispatchEvent(
    new CustomEvent(countEvent.increment, { detail: { count } })
  );
};

export const countEventSubscribe = (handler: CounterEventListener) => {
  window.addEventListener(countEvent.increment, handler as EventListener);
};

export const countEventUnsubscribe = (handler: CounterEventListener) => {
  window.removeEventListener(countEvent.increment, handler as EventListener);
};
