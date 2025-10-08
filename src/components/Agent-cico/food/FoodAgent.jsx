import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  FiMic,
  FiSend,
  FiPlay,
  FiPause,
  FiMessageSquare,
} from "react-icons/fi";
import cicoVideo from "../../../assets/cico.mp4";

const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(116, 185, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(116, 185, 255, 0.4), 0 0 30px rgba(116, 185, 255, 0.2); }
  100% { box-shadow: 0 0 5px rgba(116, 185, 255, 0.2); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center -10%;
  z-index: -2;

  @media screen and (max-width: 768px) {
    top: 60px;
    height: calc(100vh - 60px);
    object-fit: cover;
  }
`;
const OImage = styled.img`
  display: inline-block;
  width: 3.5em;
  height: 1em;
  vertical-align: middle;
  margin: 0 0.08em;
  opacity: 0;
  transform: scale(0.8) translateY(-4px);
  animation: scaleIn 0.6s ease forwards;
  animation-delay: 0.8s;

  @keyframes scaleIn {
    to {
      opacity: 1;
      transform: scale(1) translateY(-5px);
    }
  }
`;

const InputSection = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 15;

  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
  gap: 12px;
  animation: ${slideUp} 0.6s ease-out;

  @media screen and (max-width: 768px) {
    flex-direction: row;
    gap: 8px;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 25px;
  padding: 14px 22px;

  -webkit-backdrop-filter: blur(25px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    transition: left 0.5s;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 0 rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  &:focus-within {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(116, 185, 255, 0.6);
    box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.1),
      0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.25);
    animation: ${glowAnimation} 2s ease-in-out infinite;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 12px 18px;
    border-radius: 20px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  padding: 10px 0;
  letter-spacing: 0.3px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 300;
    font-style: italic;
    transition: all 0.3s ease;
  }

  &:focus::placeholder {
    color: rgba(255, 255, 255, 0.4);
    transform: translateX(4px);
  }

  &::selection {
    background-color: rgba(116, 185, 255, 0.3);
  }
`;

const HeadingContainer = styled.div`
  margin-bottom: 32px;
`;

const MainHeading = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: white;
  line-height: 1.1;
  text-align: left;
  letter-spacing: -0.025em;
  margin-bottom: 16px;

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 180px;
  }

  @media screen and (min-width: 1024px) {
    font-size: 2rem;
  }

  @media screen and (min-width: 1280px) {
    font-size: 4rem;
    margin-top: 200px;
  }
`;

const GradientText = styled.span`
  display: block;
  background: linear-gradient(to right, #60a5fa, #a78bfa, #3b82f6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 512px;
  line-height: 1.6;
  font-weight: 300;
  text-align: left;

  @media screen and (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const HighlightText = styled.span`
  color: #60a5fa;
  font-weight: 500;
`;

const IconButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.25);
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  &.mic-active {
    color: #74b9ff;
    background: rgba(116, 185, 255, 0.15);
    border-color: rgba(116, 185, 255, 0.3);
    animation: ${glowAnimation} 1.5s ease-in-out infinite;
  }

  &.send-button {
    color: #74b9ff;

    &:hover {
      background: rgba(116, 185, 255, 0.15);
      border-color: rgba(116, 185, 255, 0.3);
    }
  }

  &.play-button {
    color: #00b894;

    &:hover {
      background: rgba(0, 184, 148, 0.15);
      border-color: rgba(0, 184, 148, 0.3);
    }
  }

  &.pause-button {
    color: #fd79a8;

    &:hover {
      background: rgba(253, 121, 168, 0.15);
      border-color: rgba(253, 121, 168, 0.3);
    }
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`;

const FoodAssistant = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

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

  const handleToggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Container>
      <VideoBackground
        ref={videoRef}
        autoPlay
        loop
        src={cicoVideo}
        type="video/mp4"
      />
      <HeadingContainer>
        <MainHeading>
          F{/**<OImage src="/zerotxt1.svg" alt="O" /> */}ood
          <GradientText>Service Assistant</GradientText>
        </MainHeading>

        <Description>
          Order food in any language. Get personalized recommendations and
          <HighlightText> seamless ordering experience</HighlightText> powered
          by Lisa AI.
        </Description>
      </HeadingContainer>

      <InputSection>
        <InputContainer>
          <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex" }}>
            <SearchContainer>
              <SearchInput
                ref={inputRef}
                type="text"
                placeholder="Ask me anything in any language..."
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

          <IconButton
            type="button"
            onClick={handleMicClick}
            className={isListening ? "mic-active" : ""}
            title="Voice input"
          >
            <FiMic size={20} />
          </IconButton>

          <IconButton
            type="button"
            className={isPlaying ? "pause-button" : "play-button"}
            onClick={handleToggleVideo}
            aria-pressed={isPlaying}
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
          </IconButton>
        </InputContainer>
      </InputSection>
    </Container>
  );
};

export default FoodAssistant;
