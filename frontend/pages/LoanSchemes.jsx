import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LoanSchemeCard from '../components/LoanSchemeCard';
import { useNavigation } from '@react-navigation/native';
import loanSchemesData from '../assets/loanSchemes.json'; // Import the JSON file

const LoanSchemes = () => {
  const navigation = useNavigation();
  const [loanSchemes, setLoanSchemes] = useState([]);

  useEffect(() => {
    // Load the loan schemes from the JSON file
    setLoanSchemes(loanSchemesData);
  }, []);

  const handleCardTap = (scheme) => {
    navigation.navigate('LoanSchemeDetails', { scheme });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Farmers Loan Schemes</Text>
      <Text style={styles.subtitle}>Available Government Loan Programs for Farmers</Text>
      {loanSchemes.map((scheme, index) => (
        <LoanSchemeCard key={index} scheme={scheme} onSelect={() => handleCardTap(scheme)} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E88E5',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default LoanSchemes;
