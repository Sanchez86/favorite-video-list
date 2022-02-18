import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import { MAIN_ROUTE } from '../../utils/consts';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/firebase';


const AppRouter = () => {

  const {auth} = firebase;
  const [user] = useAuthState(auth());

//   console.log('auth', auth());
//   console.log('user', user);

  return user ?
    (
        <Switch>
            {privateRoutes.map(({path, Component}) => 
                <Route key={path}
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
 