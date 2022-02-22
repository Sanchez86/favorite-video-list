import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import { MAIN_ROUTE } from '../../utils/consts';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/firebase';
import { loadUserDataResponce } from '../../store/actions/loadUserData';
import { useDispatch } from 'react-redux';

const AppRouter = () => {
    console.log('AppRouter');
    const {auth} = firebase;
    const [user] = useAuthState(auth());

    const dispatch = useDispatch();

    useEffect(() => {
        if(user){
            const userData = {
                name: user.displayName,
                uid: user.uid,
                photoURL: user.photoURL,
            };
            
            dispatch(loadUserDataResponce({...userData}));
        }
    });
    

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
 