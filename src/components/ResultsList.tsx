import React from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import ResultDetail from "./ResultDetail";
import {Divider} from "react-native-paper";
import {withNavigation} from "react-navigation";

const ResultsList = ({title, results, navigation}) => {

if (!results.length){
  return null
}

  return <View style={{  borderBottomWidth: 2,
    borderBottomColor: "gray", paddingBottom: 8}}>
    <Text style={styles.title}>{title}</Text>
    {/*<Text>Results: {results.length}</Text>*/}
    <FlatList showsHorizontalScrollIndicator={false} horizontal data={results} keyExtractor={(result) => result.id} renderItem={({item}) => {
      return <TouchableOpacity onPress={()=> navigation.navigate('ResultsShow',{id: item.id})} delayPressIn={40} >
        <ResultDetail result={item}/>
      </TouchableOpacity>
    }}/>

  </View>

}

const styles = StyleSheet.create(
  {
    text: {
      fontWeight: "bold"
    },
    title: {

      paddingBottom: 12,
      fontSize: 18,
      fontWeight: "bold"
    }
  }
)

export default withNavigation(ResultsList)