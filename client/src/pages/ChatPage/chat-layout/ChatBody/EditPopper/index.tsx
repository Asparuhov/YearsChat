import {
  Box,
  Button,
  Paper,
  Popover,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useMessageContext } from "../../../../../MessagesContext";
import React, { useState } from "react";

interface IEditPopperProps {
  open: boolean;
  handlePopoverClose: () => void;
  anchorEl: HTMLElement | null;
  messageId: string;
  message: string;
}

type ViewTypes = "edit" | "delete" | "default";

export const EditPopper: React.FC<IEditPopperProps> = ({
  open,
  handlePopoverClose,
  anchorEl,
  messageId,
  message,
}) => {
  const [currentView, setCurrentView] = useState<ViewTypes>("default");
  const { messageList, setMessageList } = useMessageContext();

  const switchView = (type: ViewTypes) => {
    setCurrentView(type);
  };

  const resetView = () => {
    handlePopoverClose();
    setTimeout(() => {
      switchView("default");
    }, 200);
  };

  const deleteMessage = () => {
    const messageIndex = messageList.findIndex((msg) => msg.id === messageId);

    if (messageIndex !== -1) {
      const updatedMessageList = [
        ...messageList.slice(0, messageIndex),
        ...messageList.slice(messageIndex + 1),
      ];

      setMessageList(updatedMessageList);

      handlePopoverClose();
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case "edit":
        return (
          <Box p={2} display="flex" flexDirection="column">
            <TextField
              label="Edit Message"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 1 }}
            />
            <Box p={2} display="flex" justifyContent="space-between" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => switchView("default")}
                sx={{ width: "calc(50% - 4px)" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  console.log("Edit clicked");
                  handlePopoverClose();
                }}
                sx={{ width: "calc(50% - 4px)" }}
              >
                Save
              </Button>
            </Box>
          </Box>
        );
      case "delete":
        return (
          <Box p={2} display="flex" flexDirection="column">
            <Typography variant="body1">
              Are you sure you want to delete?
            </Typography>
            <Button
              variant="contained"
              onClick={() => switchView("default")}
              sx={{ marginBottom: 2, marginTop: 2 }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={deleteMessage}>
              Confirm
            </Button>
          </Box>
        );
      default:
        return (
          <Box p={2} display="flex" flexDirection="column">
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => switchView("edit")}
            >
              Edit
            </StyledButton>
            <StyledButton
              variant="contained"
              color="secondary"
              style={{ background: "red" }}
              onClick={() => switchView("delete")}
            >
              Delete
            </StyledButton>
          </Box>
        );
    }
  };

  return (
    <Popover
      open={open}
      onClose={resetView}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Paper>{renderContent()}</Paper>
    </Popover>
  );
};

const StyledButton = styled(Button)({
  marginTop: 10,
  width: 100,
});
