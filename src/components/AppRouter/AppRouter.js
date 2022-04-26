import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import { MAIN_ROUTE } from '../../utils/consts';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from "firebase/firestore";
import firebase, { db } from '../../firebase/firebase';
import { loadUserDataResponce } from '../../store/actions/loadUserData';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserDataBaseResponce } from '../../store/actions/loadUserDataBase';

const AppRouter = () => {
    const { auth } = firebase;
    const [user] = useAuthState(auth());

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            const userData = {
                name: user.displayName,
                uid: user.uid,
                photoURL: user.photoURL,
            };
            // данные авторизованного пользователя из гугл аккаунта
            dispatch(loadUserDataResponce({ ...userData }));

            const getUserDataFirestore = async () => {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                dispatch(loadUserDataBaseResponce(docSnap.data()));
            }
            getUserDataFirestore();
        }
    });

    return user ?
        (
            <Switch>
                {privateRoutes.map(({ path, Component }) =>
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
