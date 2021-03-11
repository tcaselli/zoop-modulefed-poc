import { useCallback, useEffect, useState } from 'react';
import { getCounter, incrementCounter } from '../services/appAPI';
import { emitCountEventIncrement, countEventSubscribe, countEventUnsubscribe } from '@com.zooplus/f-shared';
interface State {
  error: string | null;
  status: 'idle' | 'pending' | 'success' | 'failed';
  count?: number;
}

/**
 *
 * Fetch Cart hook, status and error
 *
 */
export const useCounter = () => {
  const [{ error, status, count }, setState] = useState<State>({
    error: null,
    status: 'idle',
    count: 0,
  });

  const fetch = useCallback(() => {
    setState((prevState) => {
      return { ...prevState, error: null, status: 'pending' };
    });
    getCounter()
      .then((result) => {
        setState({ error: null, status: 'success', count: result });
      })
      .catch((err) => {
        setState((prevState) => {
          return { ...prevState, error: err.error, status: 'failed' };
        });
      });
  }, []);

  const increment = useCallback(() => {
    setState((prevState) => {
      return { ...prevState, error: null, status: 'pending' };
    });
    incrementCounter()
      .then((result) => {
        setState({ error: null, status: 'success', count: result });
        emitCountEventIncrement(result);
      })
      .catch((err) => {
        setState((prevState) => {
          return { ...prevState, error: err.error, status: 'failed' };
        });
      });
  }, []);

  const countEventIncrementHandler = (e: CustomEvent<{ count: number }>) => {
    setState((prevState) => {
      return { ...prevState, count: e.detail.count };
    });
  };

  const subscribe = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      countEventSubscribe(countEventIncrementHandler);
      return () => countEventUnsubscribe(countEventIncrementHandler);
    }, []);

  return { error, status, count, fetch, increment, subscribe };
};
