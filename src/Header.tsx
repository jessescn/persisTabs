import { Box, Heading, Icon, IconButton } from "@chakra-ui/react"
import React, { useCallback, useMemo, useRef } from "react"
import { MdCloudDownload, MdCloudUpload } from "react-icons/md"
import { colors } from "./style/colors"
import { Tab } from "./types/Tab"
import { downloadFile, readFileAsync } from "./utils/file"
import { getTabsAttribute, openMultipleTabsByUrls } from "./utils/tabs"

type Props = {
    tabs: Tab[]
}

export const Header = ({ tabs }: Props) => {
    const urls = useMemo(() => {
        return getTabsAttribute(tabs, "url") as string[]
    }, [tabs])

    const inputRef = useRef<HTMLInputElement>(null)

    const handleDownload = useCallback(async () => {
        const content = urls.join("\n")
        downloadFile(content)
    }, [urls])

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return

        for (const file in event.target.files) {
            const content = await readFileAsync(file as unknown as Blob)
            const urls = content.split("\n")
            await openMultipleTabsByUrls(urls)
        }
    }

    const triggerInput = () => {
        inputRef.current?.click()
    }

    return (
        <Box className="flex" justifyContent="space-between" alignItems="center">
            <Heading fontSize={24} color={colors.green700}>
                PersisTabs
            </Heading>
            <Box className="flex" gap="12px">
                <IconButton
                    bgColor={colors.green700}
                    color={colors.white}
                    _hover={{ bgColor: colors.green700 }}
                    boxShadow="xl"
                    aria-label="download icon button"
                    onClick={handleDownload}
                    isDisabled={!urls.length}
                    icon={<Icon as={MdCloudDownload} />}
                />
                <IconButton
                    bgColor={colors.green700}
                    color={colors.white}
                    _hover={{ bgColor: colors.green700 }}
                    boxShadow="xl"
                    aria-label="upload icon button"
                    onClick={triggerInput}
                    icon={<Icon as={MdCloudUpload} />}
                />
                <input onChange={handleImport} ref={inputRef} id="import-input" type="file" />
            </Box>
        </Box>
    )
}
