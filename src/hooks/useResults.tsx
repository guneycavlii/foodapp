import {useEffect, useState} from "react";
import yelp from "../api/yelp";

export default () => {

  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const searchApi = async (searchTerm) => {
    setLoading(true)
    console.log("Hi there!")

    try {
      console.log("ASDASDASD",searchTerm)
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'san jose'
        }
      })
      setResults(response.data.businesses)
      setErrorMessage('')

    } catch (err) {
      console.log("ERROR ERROR")
      setErrorMessage('Something went wrong')
      setResults([])
    }

    setLoading(false); // turn off loading indicator

  }

  // Call searchApi when component is first rendered
  useEffect(() => {
    searchApi('burger');
  }, [])

  return [searchApi, results, errorMessage, loading];

}

