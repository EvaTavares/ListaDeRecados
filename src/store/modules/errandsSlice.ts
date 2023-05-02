import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { RootState } from '../index';
import ErrandType from '../../types/ErrandType';

const adapter = createEntityAdapter<ErrandType>({
  selectId: item => item.id
});

export const { selectAll, selectById, selectTotal } = adapter.getSelectors((state: RootState) => state.errands);

const errandsSlice = createSlice({
  name: 'errands',
  initialState: adapter.getInitialState(),
  reducers: {
    addErrand: adapter.addOne,
    updateErrand: adapter.updateOne,
    removeErrand: adapter.removeOne,
    addAllErrands: adapter.setAll
  }
});

export const { addErrand, removeErrand, updateErrand, addAllErrands } = errandsSlice.actions;
export default errandsSlice.reducer;
