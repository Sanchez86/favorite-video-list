import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import { MAIN_ROUTE } from '../../utils/consts';
import { LOGIN_ROUTE } from '../../utils/consts';


const AppRouter = () => {
  const user = false; // временное решение для авторизованных / не авторизованных пользователей

  return user ?
    (
        <Switch>
            {privateRoutes.map(({path, Component}) => 
                <Route key={Component}
                       path={path}
                       component={Component}
                       exact={true} /> 
            )}
            <Redirect to={MAIN_ROUTE} />
        </Switch>
    )
    :
    (
        <Switch>
            {publicRoutes.map(({path, Component}) => 
                <Route key={Component}
                       path={path}
                       component={Component}
                       exact={true} /> 
            )}
            <Redirect to={LOGIN_ROUTE} />
        </Switch>
    );

}

export default AppRouter;
 