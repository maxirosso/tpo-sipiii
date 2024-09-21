import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, Image, View, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardListScreen = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the fetchCards function
  const fetchCards = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://192.168.100.36:5000/api/cards', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCards(response.data);
    } catch (err) {
      setError('Error fetching cards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards(); // Call fetchCards on component mount
  }, []);

  const handleAddRandomCards = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.post('http://192.168.100.36:5000/api/add-random-cards', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if the response indicates success
      if (response.status === 201) {
        fetchCards(); // Refresh cards after adding
        alert('Random cards added successfully!'); // Notify the user
      } else {
        setError('Unexpected response from the server.'); // Handle unexpected response
      }
    } catch (err) {
      console.error('Error adding random cards:', err); // Log error details
      setError('Error adding random cards. Please try again.');
    }
  };

  const initiateTrade = (card) => {
    navigation.navigate('Trade', { card });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Button title="Add Random Cards" onPress={handleAddRandomCards} />
      {cards.length === 0 ? (
        <Text style={styles.errorText}>No cards found.</Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => initiateTrade(item)}>
              <View style={styles.cardContent}>
                {item.imageUrl ? (
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                ) : (
                  <View style={styles.imagePlaceholder} />
                )}
                <Text style={styles.cardName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    marginRight: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  cardName: {
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CardListScreen;
