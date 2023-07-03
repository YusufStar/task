import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionBox = motion(Box);

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1685124762520-e7ddb57c9ce7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=750&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODQyMTE3OQ&ixlib=rb-4.0.3&q=80&w=1920",
    "https://plus.unsplash.com/premium_photo-1685798807393-0d843f6b6a3a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=750&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODQyMTIwMg&ixlib=rb-4.0.3&q=80&w=1920",
    "https://images.unsplash.com/photo-1686577062316-b9ee37158cbe?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=750&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4ODQyMTIxMw&ixlib=rb-4.0.3&q=80&w=1920"
  ]

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Flex direction="column" alignItems="center">
      <MotionBox
        width="600px"
        height="400px"
        borderRadius="md"
        overflow="hidden"
        boxShadow="md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src={images[currentIndex]}
          alt="Slider Image"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </MotionBox>
      <Flex mt={4}>
        <Box
          bg={currentIndex === 0 ? "gray.500" : "gray.200"}
          width="8px"
          height="8px"
          borderRadius="full"
          mr={1}
          cursor="pointer"
          onClick={() => setCurrentIndex(0)}
        />
        <Box
          bg={currentIndex === 1 ? "gray.500" : "gray.200"}
          width="8px"
          height="8px"
          borderRadius="full"
          mr={1}
          cursor="pointer"
          onClick={() => setCurrentIndex(1)}
        />
        <Box
          bg={currentIndex === 2 ? "gray.500" : "gray.200"}
          width="8px"
          height="8px"
          borderRadius="full"
          cursor="pointer"
          onClick={() => setCurrentIndex(2)}
        />
      </Flex>
      <Text mt={4} fontWeight="bold" fontSize="lg">
        Image {currentIndex + 1}
      </Text>
      <Flex mt={2}>
        <Box
          bg="gray.200"
          px={4}
          py={2}
          borderRadius="md"
          cursor="pointer"
          onClick={handlePrevious}
          _hover={{ bg: "gray.300" }}
        >
          Previous
        </Box>
        <Box
          bg="gray.200"
          px={4}
          py={2}
          borderRadius="md"
          cursor="pointer"
          onClick={handleNext}
          ml={2}
          _hover={{ bg: "gray.300" }}
        >
          Next
        </Box>
      </Flex>
    </Flex>
  );
};

export default ImageSlider;
