import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCounter, incrementCounter } from '../services/appAPI';
import { emitCountEventIncrement } from '@com.zooplus/f-shared';
import { RootState } from './store';

interface CounterStoreState {
  count: number;
  isLoading: boolean;
}

const initialState: CounterStoreState = {
  count: 0,
  isLoading: true,
};

// Selectors
export const getCount = (state: RootState) => state.counter.count;

// Thunks
export const fetchCount = createAsyncThunk<{ count: number }, void, { state: RootState }>(
  'counter/fetchCount',
  async (_, { rejectWithValue }) => {
    try {
      const count = await getCounter();
      emitCountEventIncrement(count);
      return { count };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const incrementCount = createAsyncThunk('counter/incrementCount', async (_, thunkApi) => {
  try {
    const count = await incrementCounter();
    emitCountEventIncrement(count);
    return { count };
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const userInfosSlice = createSlice({
  name: 'userInfos',
  initialState,
  reducers: {
    setCounter: (state, action: PayloadAction<number>) => {
      if (state.isLoading === false) {
        state.count = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementCount.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(incrementCount.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(incrementCount.fulfilled, (state, action) => {
        state.count = action.payload.count;
        state.isLoading = false;
      });

    builder
      .addCase(fetchCount.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCount.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchCount.fulfilled, (state, action) => {
        state.count = action.payload.count;
        state.isLoading = false;
      });
  },
});

export const { setCounter } = userInfosSlice.actions;

export default userInfosSlice.reducer;
