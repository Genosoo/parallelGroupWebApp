import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

// Styled Accordion components
export const StyledAccordion = styled(Accordion)`
  margin-bottom: 20px;
  &.MuiAccordion-root {
    background-color: #fff; /* Set background color to black */
    border-radius: 20px;

    &::before {
      content: none; /* Remove the :before pseudo-element */
    }

    &.MuiAccordion-root:first-of-type {
      border-radius: 20px; /* Styles for the first expanded Accordion component */
    }
  }
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  border-radius: 20px;
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
`;

export const StyledTypo = styled(Typography)`
  height: 70px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #298bd9;
  font-family: "Manrope", sans-serif !important; /* Apply Manrope font */
`;

export const StyleCircleNumber = styled.div`
  background: #298ad947;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #001529;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;
