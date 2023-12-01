import { Alert, StyleSheet, Text, Pressable, View, TextInput, Switch } from 'react-native';
import { useState } from 'react';
import styles from '../MyStyles';
import { firestore } from '../firebase/firebase_config';
import TaskService from '../service/TaskService';


const CreateTaskScreen = ({ navigation }) => {

    const [title, setTitle] = useState("")
    const [hour, setHour] = useState(new Date())
    const [description, setDescription] = useState("")

    const [dailyRepeat, setDailyRepeat] = useState(false);
    const toggleSwitchDailyRepeat = () => setDailyRepeat(previousState => !previousState);

    const [allowConclusionOnOtherDay, setAllowConclusionOnOtherDay] = useState(false);
    const toggleSwitchAllowConclusionOnOtherDay = () => setAllowConclusionOnOtherDay(previousState => !previousState);

    const createTask = () => {
        const done = false

        // TODO: fix hour
        const newTask = { title, hour: Date.now(), description, dailyRepeat, allowConclusionOnOtherDay, done }
        // const newTask = { title, hour, description, dailyRepeat, allowConclusionOnOtherDay, done }

        TaskService.createTask(
            firestore,
            newTask,
            (id) => {
                console.log(id)
                navigation.navigate('Home', { refresh: true })
                Alert.alert(
                    'Aviso',
                    'Tarefa criada com id ' + { id },
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]
                );
            }
        )
    }

    return (
        <View style={{ flex: 1, }}>
            <View style={styles.container}>


                <Text style={styles.header}>Cadastrar tarefa</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Título da tarefa'
                    value={title}
                    onChangeText={title => setTitle(title)}
                />
                {/* <TextInput
                    style={styles.input}
                    placeholder='Horário'
                    value={hour}
                    onChangeText={hour => setHour(hour)}
                /> */}
                <TextInput
                    style={[styles.input, { height: 120, alignItems: 'flex-start' }]}
                    placeholder='Descrição'
                    value={description}
                    onChangeText={description => setDescription(description)}
                    numberOfLines={10}
                    multiline={true}
                />

                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={dailyRepeat ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={toggleSwitchDailyRepeat}
                        value={dailyRepeat}
                    />
                    <Text>Tarefa se repete diáriamente.</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={allowConclusionOnOtherDay ? '#f5dd4b' : '#f4f3f4'}
                        onValueChange={toggleSwitchAllowConclusionOnOtherDay}
                        value={allowConclusionOnOtherDay}
                    />
                    <Text>Permitir conclusão na data seguinte.</Text>
                </View> */}


                <Pressable
                    style={[styles.button, { width: '90%' }]}
                    onPress={createTask}>
                    <Text style={styles.textStyle}>Cadastrar tarefa</Text>
                </Pressable>
            </View>
        </View>
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

export default CreateTaskScreen;