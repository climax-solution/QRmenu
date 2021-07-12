import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import contentReducer from "./content.reducer";

const reducers = combineReducers({
    auth: authReducer,
    content: contentReducer
})
export default reducers;
