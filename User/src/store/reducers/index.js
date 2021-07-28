import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import contentReducer from "./content.reducer";
import packageReducer from "./package.reducer";

const reducers = combineReducers({
    auth: authReducer,
    content: contentReducer,
    drink: packageReducer,
})
export default reducers;
