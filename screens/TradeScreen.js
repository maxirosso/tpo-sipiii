// TradeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TradeScreen = ({ route, navigation }) => {
  const { card } = route.params;
  const [targetUserId, setTargetUserId] = useState('');

  const handleTrade = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      await axios.post('http://192.168.100.36:5000/api/trade', { cardId: card._id, targetUserId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Trade successful!');
      navigation.goBack();
    } catch (error) {
      alert('Trade failed: ' + error.response.data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cardName}>{card.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Target User ID"
        value={targetUserId}
        onChangeText={setTargetUserId}
      />
      <Button title="Trade" onPress={handleTrade} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardName: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default TradeScreen;
