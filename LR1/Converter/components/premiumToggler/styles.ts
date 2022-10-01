import {StyleSheet} from 'react-native'


export const stylesBase = StyleSheet.create({
    premiumButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 17,
        // borderColor: 'white',
        // borderWidth: 2,
        // borderStyle: 'solid',
        borderRadius: 100,
        width: 'auto',
        marginLeft: 'auto',
        backgroundColor: 'rgba(247, 241, 227, 0.5)',
        opacity: 1
    },

    premiumEnabled: {
      opacity: 0.30
    },

    premiumButtonPortrait: {
        //width: '60%'
    },
    premiumButtonLandscape: {
        //width: '40%'
    },

    premiumButtonImg: {
        width: 25,
        height: 25
    },

    premiumButtonTitle: {
        textTransform: 'uppercase',
        fontWeight: '100',
        fontSize: 15
    },
})