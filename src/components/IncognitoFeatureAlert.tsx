import { Box, Icon, Text } from "@chakra-ui/react"
import React from "react"

import { AiOutlineWarning } from "react-icons/ai"
import { colors } from "../style/colors"
import { getChromeExtensionId } from "../utils/chromeApi"
import { openMultipleTabsByUrls } from "../utils/tabs"

export const IncognitoFeatureAlert = () => {
    const openExtensionsTab = async () => {
        const extensionId = getChromeExtensionId()
        const url = `chrome://extensions/?id=${extensionId}`

        await openMultipleTabsByUrls([url])
    }

    return (
        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon color={colors.error} as={AiOutlineWarning} />
            <Text fontSize={10} color={colors.error}>
                {`Enable incognito navigation to use incognito features. click on "Allow in
                        Incognito" in `}
                <Text
                    onClick={openExtensionsTab}
                    as="span"
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                    extension page
                </Text>
            </Text>
        </Box>
    )
}
