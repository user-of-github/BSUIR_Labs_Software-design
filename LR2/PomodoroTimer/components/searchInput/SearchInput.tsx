import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

interface SearchInputProps {
  onChange: (newValue: string) => void
}


export const SearchInput = React.memo((props: SearchInputProps): JSX.Element => (
  <TextInput editable={true}
             onChangeText={props.onChange}
             style={styles.input}
             placeholder="Search timer by name"
  />
), (): boolean => true)


const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '900',
    borderRadius: 5
  }
})
