import {styles} from '../style'
import {TextInput} from 'react-native'
import React from 'react'


interface InputBaseProps {
    value: string
}

const areEqual = (prev: InputBaseProps, next: InputBaseProps): boolean => prev.value === next.value


export const InputBase = React.memo((props: InputBaseProps): JSX.Element => {
    const [selection, setSelection] = React.useState({start: 0, end: 0})
    return (
        <TextInput style={styles.inputBase}
                   caretHidden={true}
                   editable={true}
                   contextMenuHidden={true}
                   showSoftInputOnFocus={false}
                   value={props.value}
                   scrollEnabled={true}
                   selection={selection}
                   onSelectionChange={({ nativeEvent: { selection } }) => setSelection({start: selection.start, end: selection.start})}
        />
    )
}, areEqual)