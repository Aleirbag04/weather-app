import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Form from './src/components/Form';
import Content from './src/components/Content';

const images = {
  Clear: 'http://ayay.co.uk/mobiles/weather/strange/northern-lights.jpg',
  Clouds:
    'https://www.princeton.edu/sites/default/files/styles/full_2x/public/images/2018/01/clouds-19.jpg?itok=7jputHX1',
  Rain: 'https://i.pinimg.com/736x/54/59/d7/5459d741279e8d72661990f52774473f--cell-phone-wallpapers-gif-photos.jpg'
}

const App = () => {
    const [inputValue, setInputValue] = useState('');
    const [temp, setTemp] = useState('');
    const [weather, setWeather] = useState('');

//    console.log(inputValue);

    const fetchData = () => {
        fetchCityData(inputValue);
    }

    const fetchCityData = async inputValue => {
        const url = `https://api.openweathermap.org/data/2.5/weather?&q=${inputValue}&appid=fd954255a440dc00c32c4a926fcddc85&units=metric`;

        const apiCall = await fetch(url);

        const response = await apiCall.json();

        console.log(response);

        setTemp(response.main.temp);
        setWeather(response.weather[0].main);

    }


  return (
    <View style={styles.container}>
    <Image style={styles.image} source={{uri:images[weather]}} />
      <Form
      onChangeText={text => setInputValue(text)}
      onSubmit={fetchData}
      />
      <Content
        temp={temp}
        city={inputValue}
        weather={weather}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    image: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    }
});

export default App;