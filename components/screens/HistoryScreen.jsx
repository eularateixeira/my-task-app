import { View, Pressable, Text, FlatList } from 'react-native'
import { useState, useEffect } from 'react';
import { Icon } from '@rneui/base';
import styles from '../MyStyles'
import TaskService from '../service/TaskService';
import { firestore } from '../firebase/firebase_config';
import CheckableDoneListItem from '../CheckableDoneListItem';



const HistoryScreen = ({ route, navigation }) => {

    const [tasks, setTasks] = useState([])


    useEffect(
        () => {

            TaskService.listDONETasks(
                firestore,
                (tasks) => {
                    setTasks(tasks)
                }
            )
        },
        [route]
    )

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.homeWelcomeContainer}></View>
            <View style={styles.homeTasksContainer}>
                <Text style={styles.header}>Tarefas concluídas:</Text>
                <FlatList
                    style={{ width: '90%' }}
                    data={tasks}
                    renderItem={
                        ({ item }) => {
                            return (
                                <View style={styles.container}>
                                    <CheckableDoneListItem item={item} />
                                </View>
                            )
                        }
                    }
                    keyExtractor={item => item.id}
                />

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
    )
}

export default HistoryScreen