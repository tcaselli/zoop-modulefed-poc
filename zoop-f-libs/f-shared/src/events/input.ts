export type InputEventListener = (
  e: CustomEvent<{ input: string; id: string }>
) => void;

enum InputEvent {
  change = 'input/change',
}

export const emitInputEvent = (input: string, id: string) => {
  window.dispatchEvent(
    new CustomEvent(InputEvent.change, { detail: { input, id } })
  );
};

export const inputEventSubscribe = (handler: InputEventListener) => {
  window.addEventListener(InputEvent.change, handler as EventListener);
};

export const inputEventUnsubscribe = (handler: InputEventListener) => {
  window.removeEventListener(InputEvent.change, handler as EventListener);
};
