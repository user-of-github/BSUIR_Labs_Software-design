import {styles} from '../style'
import {TextInput} from 'react-native'
import React from 'react'


interface InputBaseProps {
    value: string
}

const areEqual = (prev: InputBaseProps, next: InputBaseProps): boolean => prev.value === next.value


export const InputBase = React.memo((props: InputBaseProps): JSX.Element => {

    return (
        <TextInput style={styles.inputBase}
                   caretHidden={true}
                   editable={false}
                   contextMenuHidden={true}
                   showSoftInputOnFocus={false}
                   value={props.value}
                   scrollEnabled={true}
        />
    )
}, areEqual)