import { Box } from "@chakra-ui/react"
import styled from "styled-components"
import { colors } from "../style/colors"

export const Container = styled(Box)<{ $width: number; $height: number }>`
    width: ${(props) => props.$width}px;
    height: ${(props) => props.$height}px;
    background-color: ${colors.green700};
`
