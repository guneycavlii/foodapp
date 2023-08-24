import React from "react";
import {Text, StyleSheet, View, Image, TouchableOpacity} from "react-native";
import ResultsShow from "../screens/ResultsShow";


const ResultDetail = ({result}) => {

  console.log(result.id)

  return <View style={styles.viewStyle}>
    <Image height={150} width={200} style={styles.imageStyle} source={{uri: result.image_url}}></Image>
    <Text style={{fontWeight: "bold"}}>{result.name}</Text>
    <Text>{result.rating} Stars, {result.review_count} Reviews</Text>

    
  </View>
}

const styles  = StyleSheet.create({

  viewStyle: {
    marginRight:8,
    height: "auto",
    display: "flex",


  },
  imageStyle: {

    borderRadius: 5

  }

})

export default ResultDetail