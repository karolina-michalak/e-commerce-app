import { UserActiontypes } from "./user.types.js";

export const setCurrentUser = (user) => ({
  type: UserActiontypes.SET_CURRENT_USER,
  payload: user,
});
