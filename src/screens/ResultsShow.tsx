import React from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from "react-native";
import yelp from "../api/yelp";

const ResultsList = ({ navigation}) => {
const id = navigation.getParam('id')

  const [result, setResult] = React.useState(null)

  const getResults = async (id) => {
    const response = await yelp.get(`/${id}`)
    setResult(response.data)
  }


  React.useEffect(() => {
      getResults(id)
    }
    , [])

  if(!result){
    return null
  }

  console.log(result)

  return <View style={styles.viewStyle}>
    <View >
      <Image blurRadius={4} source={{uri: result.image_url}} style={{width:"100%", height:"100%",position: "absolute", resizeMode: "cover", backgroundColor: 'rgba(0, 0, 0, 0.8)'}}/>
      <View style={{padding:16}}>
        <Text style={{fontWeight: "bold", fontSize: 48,color: 'white'}}>{result.name}</Text>
        <Text style={{ fontSize: 24,color: 'white'}}>Address: {result.city} {result.country} {result.state}</Text>
        <Text style={{ fontSize: 24,color: 'white'}}>Phone: {result.phone}</Text>
      </View>

    </View>

    <FlatList horizontal showsHorizontalScrollIndicator={false} keyExtractor={photo=> photo} data={result.photos} renderItem={({item}) => {
      return <Image source={{uri: item}} style={styles.imageStyle}/>
    }}/>

  </View>

}

const styles = StyleSheet.create({
  viewStyle: {

  },
  imageStyle: {
    margin: 16,
    height: 200,
    width: 300,
    borderRadius: 5,

  }
})

export default ResultsList