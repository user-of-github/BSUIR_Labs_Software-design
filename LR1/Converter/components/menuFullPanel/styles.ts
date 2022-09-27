import {StyleSheet} from 'react-native'


export const stylesBase = StyleSheet.create({
    menuContainer: {
        display: 'flex',
        width: '100%',
        //height: '100%',
        justifyContent: 'space-between',
        // borderColor: 'black',
        // borderStyle: 'solid',
        // borderWidth: 1,
        borderTopLeftRadius: 33,
        borderTopRightRadius: 33,
        paddingHorizontal: 20,
        paddingBottom: 30,

        marginTop: 'auto',
        height: '95%'
    },
    menuContainerLight: {
        backgroundColor: 'white'
    },
    menuContainerDark: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        // borderColor: 'black',
        // borderStyle: 'solid',
        // borderWidth: 1,
        paddingTop: 30
    }
})

