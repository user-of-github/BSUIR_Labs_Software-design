import {StyleSheet} from 'react-native'


export const stylesBase = StyleSheet.create({
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

        backgroundColor: 'rgba(247, 241, 227, 0.5)'
    },

    premiumButtonPortrait: {
        width: '60%'
    },
    premiumButtonLandscape: {
        width: '40%'
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
})