import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth
} from "firebase/auth";

class AuthService {

    static signUp = (auth, email, password, callback) => {
        createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
            .then((userCredential) => {
                callback(userCredential)
            })
            .catch(error => console.log(error))
    }

    static signIn = (auth, email, password, callback) => {
        signInWithEmailAndPassword(
            auth,
            email,
            password
        )
            .then((userCredential) => {
                callback(userCredential)
            })
            .catch(error => console.log(error))
            // .catch(error => callback())
    }

    static getCurrentUser = (callback) => {
        const user = getAuth().currentUser
        if (user !== null){
            callback(user.email)
        }
        
    }
}

export default AuthService