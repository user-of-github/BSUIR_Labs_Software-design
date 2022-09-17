import {Dimensions, ScaledSize} from 'react-native'


export const isPortrait = (): boolean => {
    const dim: ScaledSize = Dimensions.get('screen')
    return dim.height >= dim.width
}