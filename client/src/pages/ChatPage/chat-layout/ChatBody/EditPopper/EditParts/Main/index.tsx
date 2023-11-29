import { Box, Button, styled } from "@mui/material";
import { useChatContext } from "../../../../../../../ChatContext";

export const Main = () => {
  const { setView } = useChatContext();

  return (
    <Box p={2} display="flex" flexDirection="column">
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => setView("edit")}
      >
        Edit
      </StyledButton>
      <StyledButton
        variant="contained"
        color="secondary"
        style={{ background: "red" }}
        onClick={() => setView("delete")}
      >
        Delete
      </StyledButton>
    </Box>
  );
};

const StyledButton = styled(Button)({
  marginTop: 10,
  width: 100,
});
