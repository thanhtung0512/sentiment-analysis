// PredictionResult.js
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const PredictionResult = ({ results }) => {
  return (
    <Box mt={8}>
      <Heading mb={4}>Prediction Results</Heading>
      <Text>Linear Classifier: {results.linear_classifier}</Text>
      <Text>Naive Bayes: {results.naive_bayes}</Text>
      <Text>SVM: {results.svm}</Text>
      <Text>LSTM: {results.lstm}</Text>
    </Box>
  );
};

export default PredictionResult;
