import { combineReducers } from '@reduxjs/toolkit';

import contacts from './contactsSlice';
import errands from './errandsSlice';
import loggedUser from './loggedUser';

export default combineReducers({
  contacts,
  errands,
  loggedUser
});
