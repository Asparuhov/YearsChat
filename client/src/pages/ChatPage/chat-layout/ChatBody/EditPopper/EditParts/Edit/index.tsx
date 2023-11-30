import { Box, Button, TextField, Typography } from "@mui/material";
import { useChatContext } from "../../../../../../../contexts/chat/ChatContext";

interface IEditProps {
  editValue: string;
  handleEditInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  message: string;
  setError: (error: string) => void;
  editMessage: () => void;
}

export const Edit: React.FC<IEditProps> = ({
  editValue,
  handleEditInputChange,
  error,
  message,
  setError,
  editMessage,
}) => {
  const { setView } = useChatContext();

  return (
    <Box p={2} display="flex" flexDirection="column">
      <TextField
        label="Edit Message"
        variant="outlined"
        fullWidth
        value={editValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleEditInputChange(event)
        }
        sx={{ marginBottom: 1 }}
      />
      {error !== "" && (
        <Typography variant="body2" color="error" align="center">
          {error}
        </Typography>
      )}
      <Box p={2} display="flex" justifyContent="space-between" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setView("default")}
          sx={{ width: "calc(50% - 4px)" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (editValue === message) {
              setError("Message must be different");
            } else if (editValue === "") {
              setError("Can't be empty");
            } else {
              editMessage();
            }
          }}
          sx={{ width: "calc(50% - 4px)" }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};
