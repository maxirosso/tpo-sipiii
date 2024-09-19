import React from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const TradeScreen = ({ route }) => {
  const { card } = route.params;

  const handleTradeRequest = () => {
    axios.post('http://localhost:5000/api/trade', { cardId: card.id })
      .then(response => alert('Trade request sent!'))
      .catch(error => console.error(error));
  };

  return (
    <View>
      <Text>Trading Card: {card.name}</Text>
      <Button title="Send Trade Request" onPress={handleTradeRequest} />
    </View>
  );
};

export default TradeScreen;
