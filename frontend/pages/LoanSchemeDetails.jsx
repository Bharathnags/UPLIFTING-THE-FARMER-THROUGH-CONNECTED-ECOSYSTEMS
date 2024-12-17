import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';

const LoanSchemeDetails = ({ route, navigation }) => {
  const { scheme } = route.params;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.name}>{scheme.name}</Text>
        
        <Text style={styles.label}>Purpose</Text>
        <Text style={styles.text}>{scheme.purpose}</Text>
        
        <Text style={styles.label}>Eligibility</Text>
        <Text style={styles.text}>{scheme.eligibility || "Not specified"}</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Maximum Amount</Text>
          <Text style={styles.cardText}>{scheme.loan_amount || "Not specified"}</Text>
        </View>
        
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Repayment Period</Text>
            <Text style={styles.gridText}>{scheme.repayment_period || "Not specified"}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Security</Text>
            <Text style={styles.gridText}>{scheme.security || "Not specified"}</Text>
          </View>
        </View>
        
        <Button 
          title="Go Back" 
          color="#1E88E5" 
          onPress={() => navigation.goBack()} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#43A047',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
  },
  grid: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  gridItem: {
    flex: 1,
    marginRight: 10,
  },
  gridLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E88E5',
    marginBottom: 10,
  },
  gridText: {
    fontSize: 16,
    color: '#333',
  },
});

export default LoanSchemeDetails;
