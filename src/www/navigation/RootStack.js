import React from 'react';
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
          <Route exact path={routes.SETTINGS} element={<Screens.Settings />}/>

          <Route exact path={routes.PRODUCT.CATEGORY.PRODUCT_INFORMATION} element={<Screens.Product.Category.List />}/>
          <Route exact path={routes.PRODUCT.CATEGORY.LIST} element={<Screens.Product.Category.List />}/>
          <Route exact path={routes.PRODUCT.INFORMATION.ITEM} element={<Screens.Product.Market />}/>
          <Route exact path={routes.PRODUCT.MARKET} element={<Screens.Product.Market />}/>

          <Route exact path={routes.PRODUCT.INFORMATION.TICKET} element={<Screens.Home />}/>
          <Route exact path={routes.HOME} element={<Screens.Home />}/>
        </Routes>
      </>
    )
}

export default RootStack;