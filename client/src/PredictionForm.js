// PredictionForm.js
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Spinner } from '@chakra-ui/react';

const PredictionForm = ({ onSubmit, result }) => {
  const [sentence, setSentence] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setSentence(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(sentence);
    setLoading(false); // Reset loading state after receiving the result
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <FormControl>
        <FormLabel htmlFor="sentence">Enter a Sentence:</FormLabel>
        <Stack direction="row" spacing={4}>
          <Input
            type="text"
            id="sentence"
            placeholder="Enter your sentence..."
            value={sentence}
            onChange={handleInputChange}
          />
          <Button onClick={handleSubmit} colorScheme="teal" isLoading={loading}>
            {loading ? 'Loading...' : 'Predict'}
          </Button>
        </Stack>
      </FormControl>

      {result && (
        <Box mt={4}>
          <strong>Prediction Result:</strong> {result}
        </Box>
      )}
    </Box>
  );
};

export default PredictionForm;
