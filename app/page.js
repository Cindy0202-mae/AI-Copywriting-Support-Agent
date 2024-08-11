"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import RatingModal from "./components/Rating";
import React from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the AI Copywriting Support Agent, how can I assist you today?`,
    },
  ]);

  const [submitted, setSubmitted] = React.useState(false);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isModalopen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (submitted) {
      setMessages([
        {
          role: "assistant",
          content: `Hi! I'm the AI Copywriting Support Agent, how can I assist you today?`,
        },
      ]);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitted(false);
      }, 2000); // close modal after 2 secs
    }
  }, [submitted]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    console.log(isModalopen);
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
  };

  const sendMessage = async () => {
    if (message.trim() === "") return; // Prevent sending empty messages
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    const response = fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Int8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent the default behavior of Enter key (new line)
      sendMessage();
    }
  };

  const formatMessage = (content) => {
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {index > 0 && <br />}
        {line}
      </React.Fragment>
    ));
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor={darkMode ? "#404040" : "#e8f4f8"}
    >
      {/* Chat Container */}
      <Stack
        direction="column"
        width="100%"
        maxWidth="500px"
        height="calc(100vh - 56px)" // Adjust height to account for the banner
        borderRadius={2}
        overflow="hidden"
        bgcolor={darkMode ? "#333" : "white"}
        boxShadow={
          darkMode ? "0 4px 8px rgba(0,0,0,0.5)" : "0 4px 8px rgba(0,0,0,0.1)"
        }
        mt={2}
      >
        {/* Banner */}
        <Box
          width="100%"
          bgcolor={darkMode ? "#1e1e1e" : "#007BFF"}
          color={darkMode ? "#ffffff" : "white"}
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`1px solid ${darkMode ? "#444" : "#ddd"}`}
        >
          <Typography variant="h6" fontWeight="bold">
            AI Copywriting Support Agent
          </Typography>
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            sx={{
              color: darkMode ? "#fff" : "#000",
              backgroundColor: darkMode ? "#333" : "#fff",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: darkMode ? "#444" : "#f0f0f0",
              },
            }}
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* Messages */}
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          p={2}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant"
                    ? darkMode
                      ? "#555"
                      : "#007BFF" // Adjust color for dark mode
                    : darkMode
                    ? "#666"
                    : "#28a745" // Adjust color for dark mode
                }
                color="white"
                borderRadius={2}
                p={2}
                maxWidth="80%"
                boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                sx={{
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap", // Preserve whitespace and line breaks
                }}
              >
                {formatMessage(message.content)}
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Input and Button */}
        <Stack
          direction="row"
          spacing={2}
          padding={2}
          alignItems="center"
          bgcolor={darkMode ? "#424242" : "#f1f1f1"}
          borderTop={`1px solid ${darkMode ? "#666" : "#ddd"}`}
        >
          <TextField
            label="Type your message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            multiline
            minRows={1}
            maxRows={10} // Allow the text area to grow to a maximum of 10 rows
            variant="outlined"
            size="small"
            sx={{
              bgcolor: darkMode ? "#424242" : "white", // Background color for dark mode
              borderRadius: 1,
              "& .MuiInputLabel-root": {
                color: darkMode ? "#ffffff" : "black", // Label color for dark mode
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: darkMode ? "#666" : "#ccc", // Border color for dark mode
                },
                "&:hover fieldset": {
                  borderColor: darkMode ? "#ffffff" : "#007BFF", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: darkMode ? "#ffffff" : "#007BFF", // Border color when focused
                },
              },
              "& .MuiInputBase-input": {
                color: darkMode ? "#ffffff" : "black", // Input text color for dark mode
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            sx={{ borderRadius: 1 }}
          >
            Send
          </Button>
          {/* button enabled only when there is more than or equal to one user's input */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleModalOpen}
            sx={{ borderRadius: 1 }}
            // disabled={messages.length === 1}
            disabled={messages.length <= 1}
          >
            End
          </Button>
          <RatingModal isOpen={isModalopen} onClose={handleModalClose} submitted={submitted} setSubmitted={setSubmitted} />
        </Stack>
      </Stack>
    </Box>
  );
}
