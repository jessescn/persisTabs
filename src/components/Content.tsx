import { Box } from "@chakra-ui/react"
import styled from "styled-components"
import { colors } from "../style/colors"

export const Content = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 28px;
    background-color: ${colors.white};
    padding: 0.5rem 1rem;
    border-radius: 0 0 15px 15px;
`
