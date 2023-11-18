import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  extendTheme,
  ChakraProvider,
  CSSReset,
  Text,
  Stack,
} from "@chakra-ui/react";
function getMajoritySentiment(results) {
  // Count occurrences of each sentiment
  const sentimentCount = results.reduce((count, result) => {
    count[result] = (count[result] || 0) + 1;
    return count;
  }, {});

  // Find the sentiment with the highest count
  let majoritySentiment = "";
  let maxCount = 0;
  Object.entries(sentimentCount).forEach(([sentiment, count]) => {
    if (count > maxCount) {
      maxCount = count;
      majoritySentiment = sentiment;
    }
  });

  return majoritySentiment;
}
const theme = extendTheme();

const sentimentColors = {
  "buồn bã": "gray",
  "ngạc nhiên": "orange",
  "hạnh phúc": "green",
  "sợ hãi": "red",
  "phẫn nộ": "black",
  "thông tin": "teal.500",
  // Add more sentiments and their colors as needed
};

function App() {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const analyzeSentence = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/predict?string=${encodeURIComponent(sentence)}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setResult(data);
      setHistory([...history, { sentence, sentiment: data.linear_classifier }]);
      onOpen();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const majoritySentiment = getMajoritySentiment(
    history.map((entry) => entry.sentiment)
  );
  const sentences = [
    "Thông tin rất hữu ích, cảm ơn bạn đã chia sẻ!",
    "Mình nghĩ đây là một ý kiến hay, có thể thảo luận thêm về vấn đề này không?",
    "fan liverpool cũng không thích điều này",
    "treo đầu dê bán thịt chó .",
    "nghe cái giọng thấy ghê .",
    "nửa đêm nửa hôm sợ rớt hồn ra ngoài :))",
    "Sao mọi người lại thích thảo luận vấn đề này, tôi thấy nó chẳng có ý nghĩa gì cả.",
    "Thật không thể chấp nhận được, quảng cáo giả mạo làm ảnh hưởng đến nhiều người!",
    "kỳ sea games sau chắc không có bộ môn liên minh huyền thoại quá",
    "Bạn có vấn đề à? Sao lại nói những điều tiêu cực vậy?",
    // Add more sentences as needed
  ];
  const generateSentence = () => {
    // List of possible sentences

    // Randomly select a sentence
    const randomIndex = Math.floor(Math.random() * sentences.length);
    const randomSentence = sentences[randomIndex];

    // Set the randomly generated sentence
    setSentence(randomSentence);
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="90vh"
      >
        <Text fontSize="50" fontWeight="bold" color="black" mb={4}>
          Vietnamese Sentiment Analysis
        </Text>
        <Text fontSize="20" fontWeight="regular" color="black" mb={4}>
          It works well with user comments on social media platforms such as
          Facebook, VOZ.vn... or product reviews.
        </Text>
        <Text fontSize="20" fontWeight="regular" color="black" mb={4}>
          I used Linear Classifier, LSTM, Naive Bayes, SVM for this project.
          Feel free to give it a try!
        </Text>
        <Input
          placeholder="Enter a sentence"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          width="50%"
          borderColor="black"
          focusBorderColor="black"
          borderWidth="2px"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              analyzeSentence();
            }
          }}
        />
        <Stack direction="row" spacing={4} mb={10} mt="10px">
          <Button
            onClick={generateSentence}
            borderColor="black"
            borderWidth="1px"
          >
            Generate Sentence
          </Button>
          <Button
            onClick={analyzeSentence}
            isLoading={isLoading}
            loadingText="Analyzing..."
            borderColor="black"
            borderWidth="1px"
          >
            {isLoading ? <Spinner /> : "Analyze"}
          </Button>
        </Stack>
        {/* ... (existing code) */}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            rounded="md"
            boxShadow="md"
            border="1px"
            borderColor="black"
          >
            <ModalHeader>Analysis Result</ModalHeader>
            <ModalBody>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Method</Th>
                    <Th>Result</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {result &&
                    Object.entries(result).map(([method, value]) => (
                      <Tr key={method}>
                        <Td>{method}</Td>
                        <Td
                          color={sentimentColors[value]}
                          fontSize="l"
                          fontWeight="bold"
                        >
                          {value}
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </ModalBody>
          </ModalContent>
        </Modal>

        {history.length > 0 && (
          <Box
            mt={4}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            overflowY="auto"
            maxHeight="500px"
          >
            <Text fontSize="lg" fontWeight="bold" color="black" mb={2}>
              Prediction History:
            </Text>
            <Table variant="simple" boxShadow="md" borderColor="black">
              <Thead>
                <Tr>
                  <Th>Sentence</Th>
                  <Th>Sentiment</Th>
                </Tr>
              </Thead>
              <Tbody>
                {history.map((entry, index) => (
                  <Tr
                    key={index}
                    borderBottom={`4px solid ${
                      sentimentColors[entry.sentiment]
                    }`}
                  >
                    <Td>{entry.sentence}</Td>
                    <Td
                      color={sentimentColors[entry.sentiment]}
                      fontSize="l"
                      fontWeight="bold"
                    >
                      {entry.sentiment}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
      <Box
        p={4}
        borderTop="1px solid black"
        color="black"
        fontSize="sm"
        textAlign="center"
        fontWeight="bold"
        mt={12}
      >
        © 2023 Course: Modern Problems in Information Technology - Group: Nguyen
        Vu Thanh Tung, Cao Thanh Trung, Nguyen Ngoc Hiep
      </Box>
    </ChakraProvider>
  );
}

export default App;
