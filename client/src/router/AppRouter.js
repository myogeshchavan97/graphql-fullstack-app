import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductsList from '../components/ProductsList';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import Header from '../components/Header';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route component={ProductsList} path="/" exact={true} />
          <Route component={EditProduct} path="/edit/:id" />
          <Route component={AddProduct} path="/add" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
