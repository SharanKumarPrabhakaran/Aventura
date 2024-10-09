import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slices/cart-slice';
import userReducer from './slices/user-slice';


const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
