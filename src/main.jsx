import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import ClientPrivateRoute from './components/ClientPrivateRoute.jsx';
import VendorPrivateRoute from './components/VendorPrivateRoute.jsx';
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AddItem from './screens/AddItem.jsx';
import UpdateGuest from './screens/UpdateGuest.jsx';
import ManageGuest from './screens/ManageGuest.jsx';
import AddGuest from './screens/AddGuest.jsx';
import ItemSelection from './screens/ItemSelection.jsx';
import ManageUser from './screens/ManageUser.jsx';
import UpdateUser from './screens/UpdateUser.jsx';
import UpdateItem from './screens/UpdateItem.jsx';
import Inventory from './screens/Inventory.jsx';
import VendorSelection from './screens/VendorSelection.jsx';
import ManageVendorDisplay from './screens/ManageVendorDisplay.jsx';
import AddVendorDisplay from './screens/AddVendorDisplay.jsx';
import UpdateVendorDisplay from './screens/UpdateVendorDisplay.jsx';
import UpdateVendorSelect from './screens/UpdateVendorSelect.jsx';
import ClientDashboard from './screens/ClientDashboard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      
      <Route path='' element={<ClientPrivateRoute />}>
        <Route path='/update-guest/:id' element={<UpdateGuest />} />
        <Route path='/get-guests' element={<ManageGuest />} />
        <Route path="/add-guests" element={<AddGuest />} />
        <Route path="/item-selection/:vendorID" element={<ItemSelection />} />
        <Route path="/vendor-selection" element={<VendorSelection  />} />
        <Route path='/update-vendor-select/:vendorID/:clientID' element={<UpdateVendorSelect/>} />
        <Route path='/client-dashboard' element={<ClientDashboard />} />
      </Route>
      
      <Route path='' element={<VendorPrivateRoute />}>
        <Route path='/get-items' element={<Inventory/>} />
        <Route path='/add-item' element={<AddItem />} />
        <Route path='/update-item/:id' element={<UpdateItem />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path="/add-display-items" element={<AddVendorDisplay/>} />
        <Route path="/get-display-items" element={<ManageVendorDisplay/>} />
        <Route path="/update-display-item/:id" element={<UpdateVendorDisplay/>} />
      </Route>

      <Route path='' element={<AdminPrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path="/manage-users" element={<ManageUser />} />
        <Route path='/update-user/:id' element={<UpdateUser />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);