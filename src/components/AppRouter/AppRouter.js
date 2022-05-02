import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import { MAIN_ROUTE } from '../../utils/consts';
import { LOGIN_ROUTE } from '../../utils/consts';
import Main from "../Main";
import Edit from '../Edit';

const AppRouter = ({ user }) => {

    return user ?
        (
            <Switch>
                <Route
                    path={'/main'}
                    component={Main}
                    exact={true} >

                </Route>
                <Route
                    path={'/edit/:id'}
                    component={Edit}  >
                </Route>

                <Redirect to={MAIN_ROUTE} />
            </Switch>
        )
        :
        (
            <Switch>
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path}
                        path={path}
                        component={Component}
                        exact={true} />
                )}
                <Redirect to={LOGIN_ROUTE} />
            </Switch>
        );

}

export default AppRouter;
