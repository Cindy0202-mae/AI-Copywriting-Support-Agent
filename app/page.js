"use client";
import { useState } from "react";
import { Box, Stack, TextField, Button, Modal, Typography } from "@mui/material";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Headstarter Support Agent, how can I assist you today?`,
    },
  ]);

  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      return reader.read().then(function proccessText({ done, value }) {
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
        return reader.read().then(proccessText);
      });
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent the default behavior of Enter key (new line)
      sendMessage();
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="#e8f4f8"
    >
      {/* Chat Container */}
      <Stack
        direction="column"
        width="100%"
        maxWidth="500px"
        height="calc(100vh - 56px)" // Adjust height to account for the banner
        borderRadius={2}
        overflow="hidden"
        bgcolor="white"
        boxShadow="0 4px 8px rgba(0,0,0,0.1)"
        mt={2}
      >
        {/* Banner */}
        <Box
          width="100%"
          bgcolor="#007BFF"
          color="white"
          p={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderBottom="1px solid #ddd"
        >
          <Typography variant="h6" fontWeight="bold">
            Headstarter Support Agent
          </Typography>
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
                    ? "#007BFF" // Blue for assistant
                    : "#28a745" // Green for user
                }
                color="white"
                borderRadius={16}
                p={2}
                maxWidth="80%"
                boxShadow="0 2px 4px rgba(0,0,0,0.1)"
              >
                {message.content}
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
          bgcolor="#f1f1f1"
          borderTop="1px solid #ddd"
        >
          <TextField
            label="Type your message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            multiline
            rows={1}
            variant="outlined"
            size="small"
            sx={{ bgcolor: "white", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            sx={{ borderRadius: 1 }}
          >
            Send
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{ borderRadius: 1 }}
          >
            End
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            display="flex"
            justifyContent="center"
            alignItems="center"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box
            width="30%"
            bgcolor="#007BFF"
            color="white"
            p={2}
            borderBottom="1px solid #ddd">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
          </Modal>
        </Stack>
      </Stack>
    </Box>
  );
}
