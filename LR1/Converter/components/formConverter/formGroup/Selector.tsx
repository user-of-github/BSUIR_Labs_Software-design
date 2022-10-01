import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'


interface SelectorProps {
    titles: Array<string>
    onChange: any
    selected: string
}

const areEqual = (prev: SelectorProps, next: SelectorProps): boolean => prev.selected === next.selected

export const Selector = React.memo((props: SelectorProps): JSX.Element => {
    return (
        <SelectDropdown buttonStyle={{width: '21%', borderRadius: 10, padding: 0, backgroundColor: 'white'}}
                        buttonTextStyle={{fontSize: 15}}
                        data={props.titles}
                        defaultButtonText={props.selected}
                        defaultValue={props.selected}
                        onSelect={(selectedItem, _) => props.onChange(selectedItem)}
                        buttonTextAfterSelection={(selectedItem, _) => selectedItem}
                        rowTextForSelection={(item, _) => item}
        />
    )
}, areEqual)