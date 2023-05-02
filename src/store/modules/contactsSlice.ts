import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface Errands {
  id: string;
  title: string;
  description: string;
}

export interface User {
  email: string;
  password: string;
  errands: Errands[];
}

const adapter = createEntityAdapter<User>({
  selectId: user => user.email
});

export const { selectAll, selectById, selectTotal } = adapter.getSelectors((state: RootState) => state.contacts);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: adapter.getInitialState(),
  reducers: {
    addContact: adapter.addOne,
    updateContact: adapter.updateOne
  }
});

export const { addContact, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;
