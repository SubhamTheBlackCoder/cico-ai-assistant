import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FiMic, FiSend } from "react-icons/fi";
import cicoGif from "../../../assets/cico.gif"; // Your GIF file

// Animations
const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Main Container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  overflow: hidden;
`;


const VideoBackground = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background-image: url(${cicoGif});
  background-size: contain;
  background-position: top center;
  background-repeat: no-repeat;
  z-index: -2;

  @media screen and (max-width: 768px) {
    top: 60px;
    height: calc(100vh - 60px);
    background-size: cover; 
    background-position: center;
  }
`;



const Heading = styled.h1`
  position: absolute;
  top: 40px;
  color: black;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 1px;
  animation: ${fadeIn} 1.2s ease-in;
  z-index: 10;

  @media screen and (max-width: 768px) {
    font-size: 22px;
    left: 20px;
    top: 30px;
  }
`;

// Input Section
const InputSection = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.7) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 15;
`;

const InputContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  animation: ${slideUp} 0.6s ease-out;
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: rgba(45, 45, 45, 0.95);
  border-radius: 50px;
  padding: 12px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
    transform: translateY(-2px);
    background: rgba(45, 45, 45, 0.98);
  }

  &:focus-within {
    box-shadow: 0 6px 30px rgba(74, 144, 226, 0.3);
    border-color: rgba(74, 144, 226, 0.5);
    background: rgba(45, 45, 45, 0.98);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
  font-weight: 300;
  padding: 8px 0;

  &::placeholder {
    color: #aaa;
    font-weight: 300;
  }

  &:focus::placeholder {
    color: #888;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &.mic-active {
    color: #4a90e2;
    background: rgba(74, 144, 226, 0.1);
  }

  &.send-button {
    color: #4a90e2;

    &:hover {
      background: rgba(74, 144, 226, 0.1);
    }
  }
`;

const MultilingualFoodAssistant = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => setMessage(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    }
  };

  const handleMicClick = () => {
    setIsListening(!isListening);
    console.log("Microphone clicked");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Container>
      <VideoBackground />
      <Heading>🍽️ Multilingual Food Ordering Assistant</Heading>

      <InputSection>
        <InputContainer>
          <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex" }}>
            <SearchContainer>
              <SearchInput
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <IconButton
                type="submit"
                className="send-button"
                disabled={!message.trim()}
                title="Send message"
              >
                <FiSend size={16} />
              </IconButton>
            </SearchContainer>
          </form>

          {/* Mic button outside input box */}
          <IconButton
            type="button"
            onClick={handleMicClick}
            className={isListening ? "mic-active" : ""}
            title="Voice input"
          >
            <FiMic size={22} />
          </IconButton>
        </InputContainer>
      </InputSection>
    </Container>
  );
};

export default MultilingualFoodAssistant;
