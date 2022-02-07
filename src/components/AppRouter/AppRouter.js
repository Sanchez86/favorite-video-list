import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import Login from '../Login';
import Main from '../Main';

const AppRouter = () => {
  const user = false; // временное решение для авторизованных / не авторизованных пользователей

  return user ?
    (
        <>
        1
        <Main />
        <Switch>
            {privateRoutes.map(({path, Component}) => 
               <Route path={path} component={Component} exact={true} /> 
            )}
            <Redirect to={Main} />
        </Switch>
        </>
    )
    :
    (
        <>
        2
        <Login />
        <Switch>
            {publicRoutes.map(({path, Component}) => 
               <Route path={path} component={Component} exact={true} /> 
            )}
            <Redirect to={Login} />
        </Switch>
        </>
    );

}

export default AppRouter;
