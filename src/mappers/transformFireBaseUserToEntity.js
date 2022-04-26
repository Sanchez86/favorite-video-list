export default function (user) {
    return {
        name: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
    }
};
