import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: '#6750A4'
    },
    subtitle: {
        fontSize: 16
    },
    input: {
        width:'90%',
        borderColor: "#49454F",
        borderWidth: 2,
        borderRadius: 4,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    button: {
        margin: 10,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor:'#6750A4'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textStyle2: {
        color: '#6750A4',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    homeWelcomeContainer: {
        flexDirection: 'row',
        flex: 2,
        backgroundColor: '#6750A4',
        justifyContent: 'flex-start',
        alignItems: "center",
        padding: 20,
        width: '100%'
    },
    homeWelcomeTextContainer: {
        paddingLeft: 20
    },
    homeWelcomeTitle: {
        color: "#D0BCFF",
        fontSize: 20,
        // fontFamily: 'roboto',
        fontWeight: 'bold'
    },
    homeWelcomeSubTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        // fontFamily: 'roboto',
        fontWeight: 'bold'
    },
    homeTasksContainer: {
        flex: 8,
        backgroundColor: '#FFFFFF',
        width: '100%',
        alignItems: 'center',
        padding: 10
    },
    buttonsNavContainer: {
        flex: 1.5,
        backgroundColor: '#E8DEF8',
        flexDirection: 'row'
    },
    congrats: {
        flex: 10,
        backgroundColor: "#6750A4",
        width: '100%',
        alignItems:'center',
        justifyContent:'center'
    },
    buttonsNav: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    taskContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: "#49454F",
        borderWidth: 2,
        borderRadius: 4,
        paddingHorizontal: 20
    }


})

export default styles