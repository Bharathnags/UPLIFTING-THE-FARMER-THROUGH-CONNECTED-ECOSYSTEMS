import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const WeatherScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const API_KEY = 'a0aca8a89948154a4182dcecc780b513';

  const fetchWeatherData = async () => {
    if (!city) {
      Alert.alert('Input Required', 'Please enter a city name');
      return;
    }
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const dailyData = forecastResponse.data.list.filter((_, index) => index % 8 === 0);
      setForecastData(dailyData);
    } catch (error) {
      Alert.alert('Error', 'City not found. Please try again.');
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Weather Dashboard</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchWeatherData}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {weatherData && (
        <>
          <View style={styles.card}>
            <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
            <Text style={styles.status}>{weatherData.weather[0].main}</Text>
          </View>
          <Text style={styles.details}>
            Humidity: {weatherData.main.humidity}%      Wind: {weatherData.wind.speed} km/h
          </Text>

          <Text style={styles.forecastHeader}>5-Days Forecast</Text>
          {forecastData.map((day, index) => (
            <View key={index} style={styles.forecastCard}>
              <Text style={styles.forecastText}>
                {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}
              </Text>
              <Text style={styles.forecastText}>{day.main.temp}°C</Text>
              <Text style={styles.forecastText}>{day.weather[0].main}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3E8EDE',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#3E8EDE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    width: '90%',
    backgroundColor: '#5DADE2',
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  status: {
    fontSize: 24,
    color: '#fff',
    marginTop: 5,
  },
  details: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  forecastHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  forecastCard: {
    width: '90%',
    backgroundColor: '#EAEDED',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  forecastText: {
    fontSize: 16,
    color: '#333',
  },
});

export default WeatherScreen;
