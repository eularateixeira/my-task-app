import { View, Pressable, Text, Image, TextInput } from 'react-native'
import styles from '../MyStyles'
import { Icon } from '@rneui/base';
import { useEffect, useState } from 'react';
import AuthService from '../service/AuthService';
import UserService from '../service/UserService';
import { firestore } from '../firebase/firebase_config'


const ProfileScreen = ({route, navigation }) => {

    const [completeName, setCompleteName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState("")

    useEffect(
        () => {
            // qual o usuario logado pra pegar o email
            AuthService.getCurrentUser(
                (email) => {
                    setEmail(email)
                }
            )

            // com o email, seta o nome completo e a data de nascimento
            UserService.getUser(firestore, email,
                ({ id, firstName, lastName, birthday }) => {
                

                    setId(id)
                    const _name = firstName + " " + lastName
                    setCompleteName(_name)
                    setBirthday(Date(birthday).toString())
                    
                }
            )
        },
        [route]
    )

    const updateName = () => {
        const names = completeName.split(' ')
        UserService.updateUser(firestore, id, names[0], names[names.length-1], birthday,
            (res) => {
                if (res){
                    console.log('Usuario atualizado')
                }
            }
        )
    }

    return (
        <View style={{ flex: 1 }}>
            
            
            <View style={[styles.homeTasksContainer, { flex: 10, justifyContent: 'center' }]}>

                <Image
                    source={require('../../assets/user-icon.png')}
                    style={{ height: 120, width: 120 }}
                />
                <Text style={[styles.subtitle, { alignSelf: 'flex-start', paddingLeft: 30, marginTop: 15 }]}>Nome</Text>
                <TextInput
                    style={[styles.input, { marginTop: 0 }]}
                    value={completeName}
                    onChangeText={completeName => setCompleteName(completeName)}
                />

                <Text style={[styles.subtitle, { alignSelf: 'flex-start', paddingLeft: 30, marginTop: 30 }]}>Data de nascimento</Text>
                <TextInput
                    style={[styles.input, { marginTop: 0 }]}
                    value={birthday}
                    onChangeText={birthday => setBirthday(birthday)}
                />

                <Pressable
                    onPress={updateName}
                    style={[styles.button, { width: '90%', marginTop: 30 }]}
                >
                    <Text style={[styles.textStyle]}>Salvar alterações</Text>
                </Pressable>

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

export default ProfileScreen