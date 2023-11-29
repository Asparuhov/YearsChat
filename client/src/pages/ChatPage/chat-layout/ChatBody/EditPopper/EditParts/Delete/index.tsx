import { Box, Button, Typography } from "@mui/material";
import { useChatContext } from "../../../../../../../ChatContext";
import React from "react";

interface IDeleteProps {
  deleteMessage: () => void;
}

export const Delete: React.FC<IDeleteProps> = ({ deleteMessage }) => {
  const { setView } = useChatContext();

  return (
    <Box p={2} display="flex" flexDirection="column">
      <Typography variant="body1">Are you sure you want to delete?</Typography>
      <Button
        variant="contained"
        onClick={() => setView("default")}
        sx={{ marginBottom: 2, marginTop: 2 }}
      >
        Cancel
      </Button>
      <Button variant="contained" color="error" onClick={deleteMessage}>
        Confirm
      </Button>
    </Box>
  );
};
