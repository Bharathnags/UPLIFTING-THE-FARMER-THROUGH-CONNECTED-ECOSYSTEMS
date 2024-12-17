import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LoanSchemeCard = ({ scheme, onSelect }) => {
  const truncatedDescription = scheme.purpose.length > 150 ? scheme.purpose.substring(0, 150) + '...' : scheme.purpose;

  return (
    <TouchableOpacity style={styles.card} onPress={onSelect}>
      <Text style={styles.name}>{scheme.name}</Text>
      <Text style={styles.description}>{truncatedDescription}</Text>
      <View style={styles.details}>
        {scheme.loan_amount && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Amount:</Text>
            <Text style={styles.amount}>{scheme.loan_amount}</Text>
          </View>
        )}
        {scheme.interest_rate && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Interest</Text>
            <Text style={styles.interest}>{scheme.interest_rate}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailItem: {
    flex: 1,
    marginRight: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#757575',
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#43A047',
  },
  interest: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E88E5',
  },
});

export default LoanSchemeCard;
