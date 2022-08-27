import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { NavBar } from './NavBar';
import "./routes";

//*Screens
import Screens from '@screens';

//*Routes
import { routes } from './routes';


//*Stack
const RootStack = () => {
  return (
      <>
        <NavBar/>
        <Routes>
          {/* <Route exact path='/articles/:categoryId/add' element={<PrivateRoute/>}>
            <Route exact path='/articles/:categoryId/add' element={<ArticleEditScreen/>}/>
          </Route> */}

          <Route exact path={routes.PROFILE} element={<Screens.Profile/>}/>

          <Route exact path={routes.QR_SCAN} element={<Screens.QRScan />}/>

          <Route exact path={routes.SETTINGS} element={<Screens.Settings />}/>
          <Route exact path={routes.PERMISSION.PERMISSION} element={<Screens.Permission.Permission />}/>
          <Route exact path={routes.PERMISSION.USERDETAIL} element={<Screens.Permission.UserDetail />}/>
          <Route exact path={routes.PERMISSION.ADDUSER} element={<Screens.Permission.AddUser />}/>
          <Route exact path={routes.PRODUCT.EXCHANGE} element={<Screens.Product.Exchange />}/>

          <Route exact path={routes.PRODUCT.CATEGORY.OWNED} element={<Screens.Product.Category.List />}/>
          <Route exact path={routes.PRODUCT.CATEGORY.LIST} element={<Screens.Product.Category.List />}/>
          <Route exact path={routes.PRODUCT.CREATE} element={<Screens.Product.NFT.Create />}/>
          <Route exact path={routes.PRODUCT.INFORMATION.ITEM} element={<Screens.Product.Market />}/>
          <Route exact path={routes.PRODUCT.MARKET} element={<Screens.Product.Market />}/>

          <Route exact path={routes.PRODUCT.INFORMATION.ITEM} element={<Screens.Home />}/>
          <Route exact path={routes.HOME} element={<Screens.Home />}/>
        </Routes>
      </>
    )
}

export default RootStack;