import {StyleSheet} from 'react-native'
import {DARK_COLOR, LIGHT_COLOR} from '../../utils/styleConstants'


export const stylesBase = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        /*borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,*/
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        width: '100%'
    },
    selectItem: {
        width: 150,
        height: 150,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 10,
        borderRadius: 25,
        marginBottom: 10
    },
    selectItemIcon: {
        width: 75,
        height: 75,

        /*borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,*/
    },

    selectItemTitle: {
        fontSize: 20,
        marginTop: 15,
        fontWeight: '900'
    },

    premiumButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 10,
        // borderColor: 'white',
        // borderWidth: 2,
        // borderStyle: 'solid',
        borderRadius: 12,
        width: '60%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },

    premiumButtonImg: {
        width: 15,
        height: 15,
        marginRight: 10
    },

    premiumButtonTitle: {
        textTransform: 'uppercase',
        fontWeight: '100',
        fontSize: 15
    },

    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})


export const stylesLightTheme = StyleSheet.create({
    selectItem: {backgroundColor: DARK_COLOR},
    selectItemTitle: {color: LIGHT_COLOR}
})

export const stylesDarkTheme = StyleSheet.create({
    selectItem: {backgroundColor: LIGHT_COLOR},
    selectItemTitle: {color: DARK_COLOR}
})