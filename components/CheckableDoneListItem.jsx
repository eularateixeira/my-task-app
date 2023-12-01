import { useEffect, useState } from 'react'
import { View, Switch, Text, Pressable, Alert } from 'react-native'
import styles from './MyStyles'
import { Icon } from '@rneui/base';
import ViewTaskModal from './modals/ViewTaskModal';
import TaskService from './service/TaskService';
import { firestore } from './firebase/firebase_config';


const CheckableDoneListItem = ({ item }) => {

    const [check, setCheck] = useState(item.done)
    const [visible, setVisible] = useState(false)

    useEffect(
        () => {
            const now = Date.now()
            done(check, now)
        },
        [check]
    )

    const done = (check, now) => {
        TaskService.updateTaskDone(firestore, item.id, check, now,
            () => {
                // console.log('')
            }
        )
    }

    return (
        <View style={styles.taskContainer}>
            <Switch
                value={check}
                onValueChange={() => setCheck(!check)}
            />
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                <Text>{item.title}</Text>
                <Text>Feito em {Date(item.date).toString()}</Text>
            </View>
            <Pressable
                style={{ width: '10%' }}
                onPress={() => {
                    // Alert.alert('pressed', '' + item.id)
                    setVisible(!visible)
                }}
            >
                <Icon name='chevron-right' />
            </Pressable>
            <ViewTaskModal
                modalVisible={visible}
                setModalVisible={setVisible}
                _description={item.description}
                _title={item.title}
                _id={item.id}
            />
        </View>
    )
}

export default CheckableDoneListItem