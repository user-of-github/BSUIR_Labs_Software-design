import {styles} from '../style'
import {Pressable, TextInput, Vibration} from 'react-native'
import React from 'react'


interface InputEditableProps {
    pasteHandler: () => void
    value: string
}

const areEqual = (prev: InputEditableProps, next: InputEditableProps): boolean => prev.value === next.value


export const InputEditable = React.memo((props: InputEditableProps): JSX.Element => {
    const longPressHandler = (): void => {
        Vibration.vibrate(50)
        props.pasteHandler && props.pasteHandler()
    }

    return (
        <Pressable style={styles.pressable} onLongPress={() => longPressHandler()}>
            <TextInput style={[styles.inputBase, styles.inputInPressable]}
                       caretHidden={true}
                       selectTextOnFocus={false}
                       isTVSelectable={false}
                       pointerEvents={'none'}
                       contextMenuHidden={true}
                       showSoftInputOnFocus={false}
                       value={props.value}
            />
        </Pressable>
    )
}, areEqual)