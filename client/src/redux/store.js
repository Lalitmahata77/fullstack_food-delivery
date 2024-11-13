import {configureStore} from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import {setupListeners} from "@reduxjs/toolkit/query/react"
import authReducer from "./features/auth/authApiSlice";
import favoritesReducer from "./features/favorites/favoriteSlice"
import cartSliceReducer from "./features/cart/cartSlice"
import shopReducer from "./features/shop/shopSlice"
const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authReducer,
        favorites: favoritesReducer,
        cart: cartSliceReducer,
        shop: shopReducer,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})
setupListeners(store.dispatch)
export default store