import React from "react";
import {View, Text, StyleSheet, TextInput} from "react-native";
import { Feather } from '@expo/vector-icons';

const SearchBar = ({term, onTermChange, onTermSubmit}) => {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" size={24} color="white" />
      <TextInput onChangeText={onTermChange} value={term} onEndEditing={onTermSubmit} placeholder="Search" placeholderTextColor="white" style={styles.inputStyle}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    position: "absolute",
    top:0,
    zIndex: 1,
    gap: 10,
    backgroundColor: 'rgba(110,110,110,0.87)',
    padding: 12,
    marginHorizontal: 8,
    marginTop:8,
    marginBottom: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',

  },
  inputStyle: {
    flex: 1,
    color: 'white',


  }
});

export default SearchBar;