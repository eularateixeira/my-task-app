import { Alert, StyleSheet, Text, Pressable, View, TextInput, Switch } from 'react-native';
import { useState } from 'react';
import styles from '../MyStyles';
import { auth, firestore } from '../firebase/firebase_config';
import AuthService from '../service/AuthService';
import UserService from '../service/UserService';


const CreateUserScreen = ({ navigation }) => {

    // nome sobrenome email aniverario

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [passw, setPassw] = useState("")
    const [passw2, setPassw2] = useState("")
    const [birthday, setBirthday] = useState('')

    const error = () => { 
        Alert.alert(
            'Aviso',
            'Não foi possível criar o usuário, verifique suas credenciais e tente novamente',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]
        );
    }

    const createUser = () => {

        if (passw == "" || passw2 == ""){
            error()
            return
        }
        if (passw != passw2){
            error()
            return
        }

        const newUser = { firstName, lastName, email, birthday }

        AuthService.signUp(auth, email, passw,
            () => {

            }
        )
        UserService.createUser(
            firestore,
            newUser,
            (id) => {
                navigation.navigate('Login')
                Alert.alert(
                    'Aviso',
                    'Usuário criado com id ' + { id },
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

                <Text style={styles.header}>Cadastrar novo usuário</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Primeiro Nome'
                    value={firstName}
                    onChangeText={firstName => setFirstName(firstName)}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Ultimo Nome'
                    value={lastName}
                    onChangeText={lastName => setLastName(lastName)}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Aniversário'
                    value={birthday}
                    onChangeText={birthday => setBirthday(birthday)}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={email}
                    onChangeText={email => setEmail(email)}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    secureTextEntry={true}
                    value={passw}
                    onChangeText={passw => setPassw(passw)}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Repita a senha'
                    secureTextEntry={true}
                    value={passw2}
                    onChangeText={passw2 => setPassw2(passw2)}
                />

                <Pressable
                    style={[styles.button, { width: '90%' }]}
                    onPress={createUser}>
                    <Text style={styles.textStyle}>Cadastrar usuário</Text>
                </Pressable>
            </View>
        </View>
    );
};


export default CreateUserScreen