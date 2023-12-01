import { View, Text, TextInput, Image, Pressable, Alert } from "react-native";
import { useState } from "react";

import AuthService from "../service/AuthService";
import styles from "../MyStyles";
import { auth } from "../firebase/firebase_config";

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [passw, setPassw] = useState("")

    // const [createUser, setCreateUser] = useState(false)

    const buttonAction = () => {
        //Fazendo Login
        AuthService.signIn(
            auth,
            email,
            passw,
            (userCredential) => {
                console.log(userCredential)
                if (userCredential.user.uid != null) {
                    navigation.navigate('Home', { email: userCredential.user.email })
                }
                else {
                    Alert.alert('Login ou senha inválidos.')
                }

            }
        )
    }

    return (
        <View style={[styles.container]}>
            <View
                style={
                    [
                        styles.container,
                        {
                            backgroundColor: '#6750A4',
                            width: '100%',
                        }
                    ]
                }>
                <Image
                    source={require('../../assets/login_icon.png')}
                    style={
                        {
                            height: 120,
                            width: 120,
                            position: "absolute",
                            bottom: -55,
                        }
                    }
                />
            </View>
            <View style={[styles.container, { width: '90%', flex: 3 }]}>
                <Text style={[styles.header, styles.textStyle2]}>Boas-vindas!</Text>
                <Text style={[styles.subtitle, { marginBottom: 50 }]}>Por favor, informe seu usuário e senha para começar.</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Usuário'
                    onChangeText={email => setEmail(email)}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder='Senha'
                    onChangeText={passw => setPassw(passw)}
                    value={passw}
                />

                <Pressable
                    style={[styles.button, { width: '90%' }]}
                    onPress={buttonAction}
                >
                    <Text style={styles.textStyle}>Entrar</Text>
                </Pressable>

                <Pressable
                    style={[{ width: '90%' }]}
                    onPress={() => navigation.navigate('CreateUser')}
                >
                    <Text style={styles.textStyle2}>Cadastre-se</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default LoginScreen