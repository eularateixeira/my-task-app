import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, Switch } from 'react-native';
import styles from '../MyStyles';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase_config';
import TaskService from '../service/TaskService';
import { Icon } from '@rneui/base';

const ViewTaskModal = ({ modalVisible, setModalVisible, _title, _description, _id }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [id, setId] = useState("")

    useEffect(
        () => {
            setTitle(_title)
            setDescription(_description)
            setId(_id)
        },
        []
    )

    const updateTask = (task_id, title, description) => {

        TaskService.updateTask(
            firestore,
            task_id,
            title, 
            description,
            (res) => {
                if (res) {
                    console.log('Tarefa atualizada')
                    setModalVisible(!modalVisible)
                }
            }
        )
    }

    const deleteTask = (task_id) => {
        console.log(task_id)
        TaskService.deleteTask(
            firestore,
            task_id,
            (res) => {
                if (res) {
                    console.log('Tarefa deletada')
                    setModalVisible(!modalVisible)
                }
            }
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <View style={styles1.centeredView}>
                <View style={[styles1.modalView]}>

                    <View style={[,
                        {
                            width: '70%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 5,
                            alignItems: 'center',
                        }
                    ]
                    }>
                        <Text style={styles.header}>Editar tarefa</Text>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Icon name='close' />
                        </Pressable>
                    </View>
                    <View style={[{ width: 300, justifyContent: 'center', alignItems: 'center' }]}>

                        <TextInput
                            style={styles.input}
                            placeholder='Título da tarefa'
                            value={title}
                            onChangeText={title => setTitle(title)}
                        />

                        <TextInput
                            style={[styles.input, { height: 120, alignItems: 'flex-start' }]}
                            placeholder='Descrição'
                            value={description}
                            onChangeText={description => setDescription(description)}
                            numberOfLines={10}
                            multiline={true}
                        />
                    </View>
                    <View style={
                        {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10
                        }
                    }>

                        <Pressable
                            style={[styles.button]}
                            onPress={() => deleteTask(id)}>
                            <Icon name='delete' color={'white'} />
                        </Pressable>

                        <Pressable
                            style={[styles.button]}
                            onPress={() => updateTask(id, title, description)}>
                            <Text style={styles1.textStyle}>Atualizar tarefa</Text>
                        </Pressable>

                    </View>
                </View>


            </View>
        </Modal>
    );
};

const styles1 = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ViewTaskModal;