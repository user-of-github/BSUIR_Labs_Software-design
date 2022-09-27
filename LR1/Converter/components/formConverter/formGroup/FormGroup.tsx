import React from 'react'
import {Image, Pressable, Text, TextInput, TouchableOpacity, Vibration, View} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import SelectDropdown from 'react-native-select-dropdown'

import {stylesBase} from './styles'
import {Theme} from '../../../types/Theme'

import CopyForLight from '../../../assets/copy-dark.png'
import CopyForDark from '../../../assets/copy-light.png'
import {createAlert} from '../../../utils/createAlert'


interface FormGroupProps {
    titles: Array<string>
    value: string
    theme: Theme
    premium: boolean
    isBaseInput: boolean
    pasteHandler?: () => void
    onUnitChange: (newUnit: string) => void
}

const areEqual = (prevProps: FormGroupProps, nextProps: FormGroupProps): boolean =>
    prevProps.value === nextProps.value &&
    prevProps.premium === nextProps.premium &&
    prevProps.isBaseInput === nextProps.isBaseInput &&
    prevProps.theme === nextProps.theme &&
    prevProps.onUnitChange === nextProps.onUnitChange


const Selector = React.memo((props: { titles: Array<string>, onChange: any }): JSX.Element => (
    <SelectDropdown buttonStyle={{width: '21%', borderRadius: 10, padding: 0, backgroundColor: 'white'}} buttonTextStyle={{fontSize: 15}}
                    data={props.titles}
                    defaultButtonText={props.titles[0]}
                    onSelect={(selectedItem, _) => props.onChange(selectedItem)}
                    buttonTextAfterSelection={(selectedItem, _) => selectedItem}
                    rowTextForSelection={(item, _) => item}
    />
))

export const FormGroup = React.memo((props: FormGroupProps): JSX.Element => {
    const copyButtonClickHandler = (): void => {
        Vibration.vibrate(40)

        props.value !== '' && Clipboard.setStringAsync(props.value) && createAlert('Value copied to clipboard')
    }

    const longPressHandler = (): void => {
        Vibration.vibrate(50)
        props.pasteHandler && props.pasteHandler()
    }


    return (
        <View style={stylesBase.formGroup}>
            <View style={stylesBase.inputRow}>
                <Selector titles={props.titles} onChange={props.onUnitChange}/>

                {
                    !props.isBaseInput
                        ?
                        <TextInput style={[stylesBase.inputBase, stylesBase.inputNotInPressable]}
                                   caretHidden={true}
                                   editable={false}
                                   contextMenuHidden={true}
                                   showSoftInputOnFocus={false}
                                   value={props.value}
                        />
                        :
                        <Pressable style={stylesBase.pressable} onLongPress={() => longPressHandler()}>
                            <TextInput style={[stylesBase.inputBase, stylesBase.inputInPressable]}
                                       caretHidden={true}
                                       editable={false}
                                       contextMenuHidden={true}
                                       showSoftInputOnFocus={false}
                                       value={props.value}
                            />
                        </Pressable>
                }
                {
                    props.premium
                    &&
                    <TouchableOpacity
                        onPress={() => copyButtonClickHandler()}>
                        <Image source={props.theme === Theme.LIGHT ? CopyForLight : CopyForDark}
                               style={stylesBase.copyIcon}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}, areEqual)