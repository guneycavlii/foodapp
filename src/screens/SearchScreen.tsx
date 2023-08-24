import React, {useRef, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const scrollViewRef = useRef(null);

  const handleScrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  };

  const [term, setTerm] = useState('');
  const [searchApi, results, errorMessage, loading] = useResults();

  const [scrollY, setScrollY] = useState(new Animated.Value(0));


  //zIndex kullanarak SearchBarın UX uygun konumlandırılmasını sağladım.

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false}
  );

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [100, 200], // Scroll değerine göre aralık
    outputRange: [0, -100], // Yatay kaydırma değerine göre dönüşüm
    extrapolate: 'clamp',
  });

  const searchBarOpacity = scrollY.interpolate({
    inputRange: [100, 200], // Scroll değerine göre aralık
    outputRange: [1, 0], // Yatay kaydırma değerine göre dönüşüm
    extrapolate: 'clamp',
  });

  const filterResultsByPrice = (price) => {
    return results.filter(results => {
      return results.price === price;
    });
  };


  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{opacity: searchBarOpacity, transform: [{translateY: searchBarTranslateY}], zIndex: 1}}>
        <SearchBar term={term} onTermChange={setTerm} onTermSubmit={() => searchApi(term)}/>
      </Animated.View>
      {loading ? <View style={{flex:1,justifyContent: "center", alignItems: "center"}}><ActivityIndicator size="large" color="#0000ff"/></View> : (<ScrollView
        ref={scrollViewRef}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContent}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Animasyonun daha akıcı olması için
      >
        <View style={{paddingTop: 64, zIndex: 2}}>

          <ResultsList results={filterResultsByPrice('$')} title="Cost Effective"></ResultsList>
          <ResultsList results={filterResultsByPrice('$$')} title="Big Pricier"></ResultsList>
          <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender"></ResultsList>

        </View>
      </ScrollView>)}

      <TouchableOpacity onPress={handleScrollToTop}>
        <Text>Scroll to Top</Text>
      </TouchableOpacity>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
  },
  scrollViewContent: {
    position: "relative",
    paddingLeft: 8,
  },
});

export default SearchScreen;