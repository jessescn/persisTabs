import { Box, Icon, Link } from "@chakra-ui/react"
import React from "react"
import { BsGithub } from "react-icons/bs"

export const Footer = () => {
    return (
        <Box
            style={{
                position: "absolute",
                bottom: "12px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Link target="blank" href="https://github.com/jessescn/persisTabs">
                <Icon fontSize={24} as={BsGithub} color="#fff" />
            </Link>
        </Box>
    )
}
