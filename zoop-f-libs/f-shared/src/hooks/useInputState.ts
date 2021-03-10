import { useCallback, useEffect, useState } from 'react';
import {
  emitInputEvent,
  inputEventSubscribe,
  inputEventUnsubscribe,
} from './../events/input';

export interface State {
  status: 'idle' | 'ready';
  value?: string;
}

export interface Params {
  id: string;
}

/**
 *
 * Input hook, status and value via events
 *
 */
export const useInput = ({ id }: Params) => {
  const [{ status, value }, setState] = useState<State>({
    status: 'idle',
    value: '',
  });

  const init = useCallback(() => {
    // search for input with this id and read its value
    const input = document.getElementById(id) as HTMLInputElement;
    const value = input?.value || '';
    setState({ value: value, status: 'ready' });
  }, [id]);

  const onChange = useCallback(
    (inputValue: string) => {
      const input = inputValue || '';
      emitInputEvent(input, id);
      setState({ value: input, status: 'ready' });
    },
    [id]
  );

  const inputEventHandler = (e: CustomEvent<{ input: string; id: string }>) => {
    if (id === e.detail.id && status === 'ready') {
      setState((prevState) => {
        return { ...prevState, value: e.detail.input };
      });
    }
  };

  const subscribe = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      inputEventSubscribe(inputEventHandler);
      return () => inputEventUnsubscribe(inputEventHandler);
    }, [status]);

  return { status, value, init, onChange, subscribe };
};
