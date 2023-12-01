import { getDocs, collection, addDoc, getDoc, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore'


class UserService {

    static createUser = (firestore, user, callback) => {
        addDoc(collection(firestore, 'user'), user)
            .then(
                (docRef) => {
                    callback(docRef.id)
                }
            )
            .catch(error => console.log(error))
    }

    static updateUser = (firestore, user_id, firstName, lastName, birthday, callback) => {
        updateDoc(doc(firestore, 'user', user_id),
            {
                firstName,
                lastName,
                birthday
            })
            .then(
                () => {
                    callback(true)
                }
            )
            .catch(error => console.log(error))
    }

    static getUser = (firestore, user_email, callback) => {
        getDocs(query(collection(firestore, 'user'), where('email', '==', user_email)))
            .then(
                (snapshot) => {
                    snapshot.forEach(
                        (document) => {
                            const id = document.id
                            const {firstName, lastName, birthday} = document.data()
                            console.log(document.id, " => ", document.data())
                            const user = {id, firstName, lastName, birthday}
                            callback(user)
                        }
                    )
                }
            )
            .catch(error => console.log(error))
    }

}

export default UserService