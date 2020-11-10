import {combineReducers} from 'redux';
import sprintReducer from './sprint/sprint.reducer';
// import cartReducer from '../redux/cart/cart.reducer';

// import {persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig ={
//     key: 'root',
//     storage,
//     whitelist: []
// }

const rootReducer = combineReducers({
    sprint: sprintReducer,
    // cart: cartReducer,
})

export default rootReducer
// export default persistReducer(persistConfig,rootReducer);