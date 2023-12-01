import { View, Button, Image, Text, FlatList, Switch, StyleSheet, Pressable, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Icon } from '@rneui/base';
import { firestore } from '../firebase/firebase_config';
import styles from '../MyStyles';
import TaskService from '../service/TaskService';
import CheckableListItem from '../CheckableListItem';

const HomeScreen = ({ route, navigation }) => {

    const [concluirTasks, setConcluirTasks] = useState(false)

    const [tasks, setTasks] = useState([])

    const [email, setEmail] = useState('')

    const [aux, setAux] = useState(false)

    useEffect(
        () => {
            if (typeof route.params !== 'undefined') {
                if (typeof route.params.email !== 'undefined') {
                    setEmail(route.params.email)
                }
            }

            // TaskService.listTasks(
            TaskService.listTODOTasks(
                firestore,
                (tasks) => {
                    setTasks(tasks)
                }
            )
        },
        [route]
    )

    const completeDay = () => {
        tasks.forEach(
            (task) => {
                const now = Date.now()
                TaskService.updateTaskDone(firestore, task.id, true, now,
                    () => {
                        navigation.navigate('Congrats')
                    })
            }
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.homeWelcomeContainer}>
                <Image
                    source={require('../../assets/user-icon.png')}
                    style={{ height: 80, width: 80 }}
                />
                <View style={styles.homeWelcomeTextContainer}>
                    <Text style={styles.homeWelcomeTitle}>Olá, {email}</Text>
                    <Text style={styles.homeWelcomeSubTitle}>Bem-vind@ de volta!</Text>
                </View>
            </View>
            <View style={styles.homeTasksContainer}>
                <Text style={[styles.homeWelcomeTitle, { color: '#6750A4', alignSelf: 'flex-start' }]} >
                    Hoje
                </Text>
                <FlatList
                    style={{ width: '90%' }}
                    data={tasks}
                    renderItem={
                        ({ item }) => {
                            return (
                                <View style={styles.container}>
                                    <CheckableListItem item={item} />
                                </View>
                            )
                        }
                    }
                    keyExtractor={item => item.id}
                />
                <View style={
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        padding: 10
                    }
                }>

                    <Pressable
                        style={[styles.button]}
                        onPress={() => navigation.navigate('CreateTask')}>
                        <Text style={styles.textStyle}>Cadastrar tarefa</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.button]}
                        onPress={() => completeDay()}>
                        <Text style={styles.textStyle}>Concluir o dia</Text>
                    </Pressable>

                </View>
            </View>
            <View style={styles.buttonsNavContainer}>
                <Pressable
                    onPress={() => navigation.navigate('Home')}
                    style={styles.buttonsNav}
                >
                    <Icon name='home' />
                    <Text>Inicio</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('History')}
                    style={styles.buttonsNav}
                >
                    <Icon name='history' />
                    <Text>Histórico</Text>
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.buttonsNav}
                >
                    <Icon name='person' />
                    <Text>Perfil</Text>
                </Pressable>
            </View>
        </View>
    );
}


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
        backgroundColor: '#6750A4'
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

export default HomeScreen;