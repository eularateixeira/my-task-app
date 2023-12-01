import { getDocs, collection, addDoc, getDoc, doc, deleteDoc, updateDoc, query, where } from 'firebase/firestore'


class TaskService {

    static listTasks = (firestore, callback) => {
        getDocs(collection(firestore, 'tasks'))
            .then(
                (snapshot) => {
                    const tasks = []
                    snapshot.forEach(
                        (document) => {

                            const id = document.id
                            const {
                                allowConclusionOnOtherDay,
                                description, done, hour, repeatDaily, title
                            } = document.data()
                            const task = {
                                id, allowConclusionOnOtherDay,
                                description, done, hour, repeatDaily, title
                            }

                            tasks.push(task)
                        }
                    )
                    callback(tasks)
                })
            .catch(error => console.log(error))
    }

    static listTODOTasks = (firestore, callback) => {
        getDocs(query(collection(firestore, 'tasks'), where('done', '==', false)))
            .then(
                (snapshot) => {
                    const tasks = []
                    snapshot.forEach(
                        (document) => {

                            const id = document.id
                            const {
                                allowConclusionOnOtherDay,
                                description, done, hour, repeatDaily, title
                            } = document.data()
                            const task = {
                                id, allowConclusionOnOtherDay,
                                description, done, hour, repeatDaily, title
                            }

                            tasks.push(task)
                        }
                    )
                    callback(tasks)
                }
            )
            .catch(error => console.log(error))
    }

    static listDONETasks = (firestore, callback) => {
        getDocs(query(collection(firestore, 'tasks'), where('done', '==', true)))
            .then(
                (snapshot) => {
                    const tasks = []
                    snapshot.forEach(
                        (document) => {

                            const id = document.id
                            const {
                                allowConclusionOnOtherDay,
                                description, done, hour, repeatDaily, title
                            } = document.data()
                            const task = {
                                id, allowConclusionOnOtherDay,
                                description, done, hour, repeatDaily, title
                            }

                            tasks.push(task)
                        }
                    )
                    callback(tasks)
                }
            )
            .catch(error => console.log(error))
    }

    static createTask = (firestore, task, callback) => {
        addDoc(collection(firestore, 'tasks'), task)
            .then(
                (docRef) => {
                    callback(docRef.id)
                }
            )
            .catch(error => console.log(error))
    }

    static updateTask = (firestore, task_id, title, description, callback) => {
        updateDoc(doc(firestore, 'tasks', task_id),
            {
                title,
                description
            })
            .then(
                () => {
                    callback(true)
                }
            )
            .catch(error => console.log(error))
    }

    static updateTaskDone = (firestore, task_id, _done, now, callback) => {
        updateDoc(doc(firestore, 'tasks', task_id),
            {
                done: _done,
                hour: now
            }
        )
            .then(
                () => {
                    callback(true)
                }
            )
            .catch(error => console.log(error))
    }

    static deleteTask = (firestore, task_id, callback) => {
        deleteDoc(doc(firestore, 'tasks', task_id))
            .then(
                () => {
                    console.log('deu bom')
                    callback(true)
                }
            )
            .catch(error => console.log(error))
    }

    static findTask = (firestore, task_id, callback) => {
        getDoc(doc(firestore, 'tasks', task_id))
            .then(
                (docSnap) => {
                    console.log(docSnap)
                    if (docSnap.exists()) {
                        console.log(docSnap.data())
                    }
                }
            )
            .catch(error => console.log(error))
    }

}


export default TaskService