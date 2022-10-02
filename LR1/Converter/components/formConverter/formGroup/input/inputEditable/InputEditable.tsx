import {styles} from '../style'
import {TextInput} from 'react-native'
import React from 'react'


interface InputEditableProps {
    pasteHandler: () => void
    onCursorPositionChange: (newPosition: number) => void
    value: string
    cursorPosition: number
}

const areEqual = (prev: InputEditableProps, next: InputEditableProps): boolean => true


export const InputEditable = (props: InputEditableProps): JSX.Element => {

    const handleSelectionChange = ({ nativeEvent: { selection } }): void => {
        console.log(selection)
        props.onCursorPositionChange(selection.end)
    }


    return (
            <TextInput style={[styles.inputBase, styles.inputNotInPressable]}
                       caretHidden={false}
                       editable={true}
                       selectTextOnFocus={false}
                       isTVSelectable={false}
                       pointerEvents={'box-only'}
                       contextMenuHidden={true}
                       showSoftInputOnFocus={false}
                       value={props.value}
                       scrollEnabled={true}
                       selection={{start: props.cursorPosition, end: props.cursorPosition}}
                       onSelectionChange={handleSelectionChange}
            />
    )
}