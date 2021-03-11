import { useCallback, useEffect, useState } from 'react';
import { countEventSubscribe, countEventUnsubscribe } from '@com.zooplus/f-shared';
import { setCounter, getCount, fetchCount, incrementCount } from '../store/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useThunkDispatch } from '../store/store';

interface State {
  error: string | null;
  status: 'idle' | 'pending' | 'success' | 'failed';
}

/**
 *
 * Fetch Cart hook, status and error
 *
 */
export const useCounter = () => {
  const [{ error, status }, setState] = useState<State>({
    error: null,
    status: 'idle',
  });

  const count = useSelector(getCount);

  const dispatch = useDispatch();
  const dispatchThunk = useThunkDispatch();

  const fetch = useCallback(async () => {
    setState({ error: null, status: 'pending' });
    try {
      await dispatchThunk(fetchCount());
      setState({ error: null, status: 'success' });
    } catch (err) {
      setState({ error: err.error, status: 'failed' });
    }
  }, [dispatchThunk]);

  const increment = useCallback(async () => {
    setState({ error: null, status: 'pending' });
    try {
      await dispatchThunk(incrementCount());
      setState({ error: null, status: 'success' });
    } catch (err) {
      setState({ error: err.error, status: 'failed' });
    }
  }, [dispatchThunk]);

  const countEventIncrementHandler = (e: CustomEvent<{ count: number }>) => {
    dispatch(setCounter(e.detail.count));
  };

  const subscribe = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      countEventSubscribe(countEventIncrementHandler);
      return () => countEventUnsubscribe(countEventIncrementHandler);
    }, []);

  return { error, status, count, fetch, increment, subscribe };
};
