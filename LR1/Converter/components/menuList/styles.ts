import {StyleSheet} from 'react-native'


export const stylesBase = StyleSheet.create({
    menuContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        /*borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,*/
    },
    menuContainerPortrait: {
        paddingTop: 50,
    },
    menuContainerLandscape: {
      paddingTop: 10
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        width: '100%'
    }
})

