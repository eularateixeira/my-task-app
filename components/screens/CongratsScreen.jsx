import { View, Pressable, Text, Image } from 'react-native'
import styles from '../MyStyles'
import { Icon } from '@rneui/base';
import { useEffect, useState } from 'react';

const CongratsScreen = ({ navigation }) => {

    // const [url, setUrl] = useState('')

    // const fetchRandomImg = () => {
    //     fetch('https://picsum.photos/200')
    //     .then( 
    //         (res) => {
    //             setUrl(res)
    //         }
    //     )
    //     .catch(error => console.log(error1))
    // }

    // useEffect(
    //     () => {
    //         () => fetchRandomImg()
    //     }, 
    //     []
    // )

    return (
        <View style={styles.container}>

            <View style={styles.congrats}>
                <Image
                    source={require('../../assets/congrats-icon.png')}
                    // source={{ uri: {url} }}
                    style={{ height: 120, width: 120 }}
                />
                <Text style={styles.homeWelcomeTitle}>Parabéns!</Text>
                <Text style={[styles.textStyle, { width: '80%' }]}>Você concluiu todos os seus objetivos para hoje. Aproveite o descanso, você merece!</Text>
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

export default CongratsScreen