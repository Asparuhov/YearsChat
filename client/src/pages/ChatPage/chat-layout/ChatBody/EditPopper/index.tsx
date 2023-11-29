import { Button, Paper, Popover, styled } from "@mui/material";
import { useChatContext } from "../../../../../ChatContext";
import React, { useEffect, useState } from "react";
import { Main } from "./EditParts/Main";
import { Edit } from "./EditParts/Edit";
import { Delete } from "./EditParts/Delete";

interface IEditPopperProps {
  open: boolean;
  handlePopoverClose: () => void;
  anchorEl: HTMLElement | null;
  messageId: string;
  message: string;
}

export const EditPopper: React.FC<IEditPopperProps> = ({
  open,
  handlePopoverClose,
  anchorEl,
  messageId,
  message,
}) => {
  const [editValue, setEditValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { messageList, setMessageList, socket, view, setView } =
    useChatContext();

  const roomId = localStorage.getItem("roomId");

  const resetView = () => {
    handlePopoverClose();
    setTimeout(() => {
      setView("default");
    }, 200);
  };

  const deleteMessage = async () => {
    await socket.emit("delete_message", { messageId, roomId });

    setMessageList((prevMessageList) => {
      const messageIndex = prevMessageList.findIndex(
        (msg) => msg.id === messageId
      );

      if (messageIndex !== -1) {
        const updatedMessageList = [
          ...prevMessageList.slice(0, messageIndex),
          ...prevMessageList.slice(messageIndex + 1),
        ];
        return updatedMessageList;
      } else {
        return prevMessageList;
      }
    });

    resetView();
  };

  const editMessage = async () => {
    await socket.emit("edit_message", {
      messageId,
      roomId,
      editedMessage: editValue,
    });

    setMessageList((prevMessageList) => {
      const messageIndex = prevMessageList.findIndex(
        (msg) => msg.id === messageId
      );

      if (messageIndex !== -1) {
        const updatedMessageList = [
          ...prevMessageList.slice(0, messageIndex),
          {
            ...prevMessageList[messageIndex],
            message: editValue,
          },
          ...prevMessageList.slice(messageIndex + 1),
        ];
        return updatedMessageList;
      } else {
        return prevMessageList;
      }
    });
    resetView();
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditValue(event.target.value);
  };

  useEffect(() => {
    const messageToUpdate = messageList.find((msg) => msg.id === messageId);

    if (messageToUpdate) {
      setEditValue(messageToUpdate.message);
    }
  }, [messageList, messageId]);

  const renderContent = () => {
    switch (view) {
      case "edit":
        return (
          <Edit
            editValue={editValue}
            handleEditInputChange={handleEditInputChange}
            error={error}
            message={message}
            setError={setError}
            editMessage={editMessage}
          />
        );
      case "delete":
        return <Delete deleteMessage={deleteMessage} />;
      default:
        return <Main />;
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
