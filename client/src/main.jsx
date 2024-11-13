import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom"
import Login from "./pages/auth/Login.jsx"
import Register from './pages/auth/Register.jsx'
import store from './redux/store.js'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import AdminProductUpdate from './pages/Admin/ProductUpdate.jsx'
import Favorites from './pages/products/Favorites.jsx'
import Home from './Home.jsx'
import ProductDetails from './pages/products/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Shop from './pages/Shop.jsx'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Shipping from './pages/order/Shipping.jsx'
import PlaceOrder from './pages/order/PlaceOrder.jsx'
import Order from './pages/order/Order.jsx'
import OrderList from './pages/Admin/OrderList.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path="/favorite" element={<Favorites />} />
    <Route index={true} path="/" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/shop" element={<Shop />} />

    
<Route path='' element={<PrivateRoute/>}>
< Route path='/profile' element={<Profile/>}/>
<Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
    </Route>


    <Route path='/admin' element={<AdminRoute/>}>
    <Route path="userlist" element={<UserList />} />
    <Route path="categorylist" element={<CategoryList />} />
    <Route path="productlist" element={<ProductList />} />
    <Route path="allproductslist" element={<AllProducts />} />
    <Route path="productlist/:pageNumber" element={<ProductList />} />
    <Route path="product/update/:_id" element={<AdminProductUpdate />} />
    <Route path="orderlist" element={<OrderList />} />
    <Route path="dashboard" element={<AdminDashboard />} />

    </Route>
</Route>

  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store} >
     <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>,
)
