import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { FiMic, FiSend, FiMessageSquare, FiVideo, FiX } from "react-icons/fi";
import cicoVideo from "../../../assets/cico.mp4";
import cicoBackgroundImage from "../../../assets/bgstarc.jpg";
import useFoodAgent from "./useFoodAgent";
import { SiProbot } from "react-icons/si";
import { FcBiohazard, FcVideoCall } from "react-icons/fc";

const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(116, 185, 255, 0.2); }
  50% { box-shadow: 0 0 20px rgba(116, 185, 255, 0.4), 0 0 30px rgba(116, 185, 255, 0.2); }
  100% { box-shadow: 0 0 5px rgba(116, 185, 255, 0.2); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
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

const ImageBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$bgImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  transform: scale(1.4);
  transform-origin: center;
  background-attachment: fixed;
  z-index: -2;

  @media screen and (max-width: 768px) {
    top: 60px;
    height: calc(100vh - 60px);
    background-attachment: scroll;
    background-size: cover;
    transform: none;
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

const InputSection = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${(props) => (props.$isChatMode ? "5px" : "20px")};
  background: ${(props) =>
    props.$isChatMode
      ? "transparent"
      : "linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%)"};
  z-index: 15;

  @media screen and (max-width: 768px) {
    padding: ${(props) => (props.$isChatMode ? "15px" : "15px")};
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${(props) => (props.$isChatMode ? "1000px" : "900px")};
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
  background: ${(props) =>
    props.$isChatMode ? "#ffffff" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 25px;
  padding: 14px 22px;
  border: ${(props) =>
    props.$isChatMode
      ? "1px solid rgba(0, 0, 0, 0.12)"
      : "1px solid rgba(255, 255, 255, 0.18)"};
  box-shadow: ${(props) =>
    props.$isChatMode
      ? "0 4px 10px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
      : "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 0 rgba(255, 255, 255, 0.05)"};
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;

  ${(props) =>
    !props.$isChatMode &&
    `
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
      ${(props) =>
        !props.$isChatMode &&
        css`
          animation: ${glowAnimation} 2s ease-in-out infinite;
        `}
    }
  `}

  ${(props) =>
    props.$isChatMode &&
    `
    &:focus-within {
      background: #f8faff;
      border-color: rgba(100, 149, 237, 0.5);
      box-shadow: 0 0 10px rgba(100, 149, 237, 0.3);
    }
  `}

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
  color: ${(props) => (props.$isChatMode ? "#000000" : "#ffffff")};
  font-size: 16px;
  font-weight: 400;
  padding: 10px 0;
  letter-spacing: 0.3px;

  &::placeholder {
    color: ${(props) =>
      props.$isChatMode ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.6)"};
    font-weight: 300;
    font-style: italic;
    transition: all 0.3s ease;
  }

  ${(props) =>
    !props.$isChatMode &&
    `
    &:focus::placeholder {
      color: rgba(255, 255, 255, 0.4);
      transform: translateX(4px);
    }

    &::selection {
      background-color: rgba(116, 185, 255, 0.3);
    }
  `}
`;

const IconButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.$isChatMode ? "#f5f5f5" : "rgba(255, 255, 255, 0.08)"};
  backdrop-filter: ${(props) => (props.$isChatMode ? "none" : "blur(15px)")};
  border: ${(props) =>
    props.$isChatMode
      ? "1px solid rgba(0, 0, 0, 0.1)"
      : "1px solid rgba(255, 255, 255, 0.15)"};
  color: ${(props) =>
    props.$isChatMode ? "#000000" : "rgba(255, 255, 255, 0.8)"};
  cursor: pointer;
  padding: ${(props) => (props.$isChatMode ? "5px" : "12px")};
  border-radius: 50%;
  box-shadow: ${(props) =>
    props.$isChatMode
      ? "none"
      : "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"};
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    color: ${(props) => (props.$isChatMode ? "#000000" : "#ffffff")};
    background: ${(props) =>
      props.$isChatMode ? "#eaeaea" : "rgba(255, 255, 255, 0.15)"};
    border-color: ${(props) =>
      props.$isChatMode ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.25)"};
    transform: ${(props) =>
      props.$isChatMode ? "scale(1.05)" : "scale(1.05) translateY(-2px)"};
    box-shadow: ${(props) =>
      props.$isChatMode
        ? "none"
        : "0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)"};
  }

  &:active {
    transform: scale(0.98);
    ${(props) =>
      !props.$isChatMode &&
      css`
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
      `}
  }

  &.mic-active {
    color: #74b9ff;
    background: rgba(116, 185, 255, 0.15);
    border-color: rgba(116, 185, 255, 0.3);
    ${(props) =>
      !props.$isChatMode &&
      css`
        animation: ${glowAnimation} 1.5s ease-in-out infinite;
      `}
  }

  &.send-button {
    color: #74b9ff;

    &:hover {
      background: rgba(116, 185, 255, 0.15);
      border-color: rgba(116, 185, 255, 0.3);
    }
  }

  &.chat-button {
    color: ${(props) => (props.$isChatMode ? "#fd79a8" : "#00b894")};

    &:hover {
      background: ${(props) =>
        props.$isChatMode
          ? "rgba(253, 121, 168, 0.15)"
          : "rgba(0, 184, 148, 0.15)"};
      border-color: ${(props) =>
        props.$isChatMode
          ? "rgba(253, 121, 168, 0.3)"
          : "rgba(0, 184, 148, 0.3)"};
    }
  }

  &.ai-mode-button {
    color: #ff6b6b;

    &:hover {
      background: rgba(255, 107, 107, 0.15);
      border-color: rgba(255, 107, 107, 0.3);
      ${(props) =>
        !props.$isChatMode &&
        css`
          animation: ${glowAnimation} 1.5s ease-in-out infinite;
        `}
    }
  }

  @media screen and (max-width: 768px) {
    padding: ${(props) => (props.$isChatMode ? "10px" : "10px")};
  }
`;

const MessagesContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 70vh;
  overflow-y: auto;
  scrollbar-width: thin;
  ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const MessageBubble = styled.div`
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.$isUser ? "#DCF8C6" : "#FFFFFF")};
  color: ${(props) => (props.$isUser ? "#000" : "#333")};
  border-radius: 20px;
  padding: 12px 20px;
  margin: 6px 0;
  max-width: 75%;
  word-break: break-word;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  font-size: 0.95rem;
  line-height: 1.4;
  transition: all 0.2s ease-in-out;
  animation: ${slideFadeIn} 0.4s ease forwards;

  ${(props) =>
    props.$isUser &&
    `
    @media screen and (min-width: 769px) {
      margin-right: 90px;
    }
  `}

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 6px 0;
  flex-direction: ${(props) => (props.$isUser ? "row-reverse" : "row")};
`;

const RobotIcon = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-top: 15px;
  color: #007bff;

  ${(props) => props.$isUser && "margin-right: 0; margin-left: 10px;"}
`;

const SimpleMessageContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 18px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const SimpleMessage = styled.div`
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  background: ${(props) => (props.$isUser ? "#E0F2F1" : "#F3E5F5")};
  border-radius: 8px;
  padding: 8px 16px;
  margin: 4px 0;
  color: #000;
  max-width: 70%;
`;


const AIModeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  animation: ${slideFadeIn} 0.5s ease forwards;
`;

const AIModeVideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const CenterMicButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  bottom: 90px;
  position: absolute;
  background: ${(props) =>
    props.$isListening
      ? "rgba(255, 107, 107, 0.2)"
      : "rgba(255, 255, 255, 0.15)"};
  border: 3px solid
    ${(props) => (props.$isListening ? "#ff6b6b" : "rgba(255, 255, 255, 0.3)")};
  color: ${(props) => (props.$isListening ? "#ff6b6b" : "white")};
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  animation: ${(props) => (props.$isListening ? glowAnimation : pulseAnimation)}
    2s infinite;
  backdrop-filter: blur(10px);

  &:hover {
    transform: scale(2.1);
    background: ${(props) =>
      props.$isListening
        ? "rgba(255, 107, 107, 0.3)"
        : "rgba(255, 255, 255, 0.25)"};
  }

  svg {
    width: 50px;
    height: 50px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 80px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const FoodAssistant = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const [isAIMode, setIsAIMode] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { messages, loading, sendMessage } = useFoodAgent();

  const handleInputChange = (e) => setMessage(e.target.value);


  const handleMicClick = () => {
    setIsListening(true);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };


  const handleAIModeMicClick = () => {
    setIsListening(true);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
      setIsListening(false);

   
      if (transcript.trim()) {
        sendMessage(transcript);
        setMessage("");
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleToggleChatMode = () => {
    setIsChatMode(!isChatMode);
  };

  const handleAIModeToggle = () => {
    setIsAIMode(true);
  };

  const handleCloseAIMode = () => {
    setIsAIMode(false);
    setIsListening(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isAIMode) {
        handleCloseAIMode();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isAIMode]);

  //  AI Mode
  if (isAIMode) {
    return (
      <AIModeContainer>
        <AIModeVideoBackground
          autoPlay
          loop
          muted
          src={cicoVideo}
          type="video/mp4"
        />
        <CloseButton onClick={handleCloseAIMode} title="Exit AI Mode">
          <FiX />
        </CloseButton>

        <CenterMicButton
          onClick={handleAIModeMicClick}
          $isListening={isListening}
          title="Click and speak"
        >
          <FiMic />
        </CenterMicButton>
      </AIModeContainer>
    );
  }

  //  video mode main page (default)
  if (!isChatMode) {
    return (
      <Container>
        <VideoBackground autoPlay loop muted src={cicoVideo} type="video/mp4" />
        <HeadingContainer>
          <MainHeading>
            Food
            <GradientText>Service Assistant</GradientText>
          </MainHeading>

          <Description>
            Order food in any language. Get personalized recommendations and
            <HighlightText> seamless ordering experience</HighlightText> powered
            by Lisa AI.
          </Description>
        </HeadingContainer>

        <SimpleMessageContainer>
          {messages.slice(-6).map((msg, i) => (
            <SimpleMessage $isUser={msg.role === "user"} key={i}>
              {msg.content}
            </SimpleMessage>
          ))}
        </SimpleMessageContainer>

        <InputSection $isChatMode={isChatMode}>
          <InputContainer $isChatMode={isChatMode}>
            <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex" }}>
              <SearchContainer $isChatMode={isChatMode}>
                <SearchInput
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me anything..."
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  $isChatMode={isChatMode}
                />
                <IconButton
                  type="submit"
                  className="send-button"
                  disabled={!message.trim()}
                  title="Send message"
                  $isChatMode={isChatMode}
                >
                  <FiSend size={16} />
                </IconButton>
              </SearchContainer>
            </form>

            <IconButton
              type="button"
              className="chat-button"
              onClick={handleToggleChatMode}
              title="Switch to Chat Mode"
              $isChatMode={isChatMode}
            >
              <FiMessageSquare size={20} />
            </IconButton>

            <IconButton
              type="button"
              onClick={handleAIModeToggle}
              className="ai-mode-button"
              title="Activate AI Mode"
              $isChatMode={isChatMode}
            >
              <FcBiohazard size={20} />
            </IconButton>
          </InputContainer>
        </InputSection>
      </Container>
    );
  }

  //  chat mode page
  return (
    <Container>
      <ImageBackground $bgImage={cicoBackgroundImage} />

      <MessagesContainer>
        {messages.map((msg, i) => (
          <MessageWrapper key={i} $isUser={msg.role === "user"}>
            {msg.role !== "user" && (
              <RobotIcon>
                <SiProbot size={24} />
              </RobotIcon>
            )}
            <MessageBubble $isUser={msg.role === "user"}>
              {msg.content}
            </MessageBubble>
          </MessageWrapper>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputSection $isChatMode={isChatMode}>
        <InputContainer $isChatMode={isChatMode}>
          <form onSubmit={handleSubmit} style={{ flex: 1, display: "flex" }}>
            <SearchContainer $isChatMode={isChatMode}>
              <SearchInput
                ref={inputRef}
                type="text"
                placeholder="Ask me anything..."
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                $isChatMode={isChatMode}
              />
              <IconButton
                type="submit"
                className="send-button"
                disabled={!message.trim()}
                title="Send message"
                $isChatMode={isChatMode}
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
            $isChatMode={isChatMode}
          >
            <FiMic size={20} />
          </IconButton>

          <IconButton
            type="button"
            className="chat-button"
            onClick={handleToggleChatMode}
            title="Switch to Video Mode"
            $isChatMode={isChatMode}
          >
            <FcVideoCall size={20} />
          </IconButton>
        </InputContainer>
      </InputSection>
    </Container>
  );
};

export default FoodAssistant;