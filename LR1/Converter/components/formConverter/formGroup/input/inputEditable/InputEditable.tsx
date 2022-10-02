import {styles} from '../style'
import {Pressable, TextInput, Vibration} from 'react-native'
import React from 'react'
import {showMessage} from 'react-native-flash-message'


interface InputEditableProps {
    pasteHandler: () => void
    //onCursorPositionChange: (newPosition: number) => void
    value: string
}

const areEqual = (prev: InputEditableProps, next: InputEditableProps): boolean => prev.value === next.value


export const InputEditable = React.memo((props: InputEditableProps): JSX.Element => {
    const longPressHandler = (): void => {
        Vibration.vibrate(50)
        showMessage({message: 'kek'})
        props.pasteHandler && props.pasteHandler()
    }

    return (
            <TextInput style={[styles.inputBase, styles.inputNotInPressable]}
                       caretHidden={false}
                       selectTextOnFocus={false}
                       isTVSelectable={false}
                       pointerEvents={'none'}
                       contextMenuHidden={true}
                       showSoftInputOnFocus={false}
                       value={props.value}
                       scrollEnabled={true}
            />
    )
}, areEqual)