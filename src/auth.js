import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from "firebase/firestore";
import firebase, { db } from './firebase/firebase';
import { loadUserDataResponce } from './store/actions/loadUserData';
import { useDispatch } from 'react-redux';
import { loadUserDataBaseResponce } from './store/actions/loadUserDataBase';
import { loading } from './store/actions';
import transformFireBaseUserToEntity from './mappers/transformFireBaseUserToEntity';
import { createDocRef } from './store/actions';

const { auth } = firebase;

const useAuth = () => {
    const dispatch = useDispatch();
    const [user] = useAuthState(auth());

    useEffect(() => {
        if (user) {
            const userData = transformFireBaseUserToEntity(user);
            dispatch(loadUserDataResponce(userData));

            dispatch(createDocRef(user));

        } else {
            setTimeout(function () {
                dispatch(loading());
            }, 1000)
        }
    });

    return user;

}

export default useAuth;

