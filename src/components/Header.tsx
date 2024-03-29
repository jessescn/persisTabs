import { Box, Heading, Icon, IconButton, Input, Text, Tooltip } from "@chakra-ui/react"
import React, { useCallback, useRef, useState } from "react"
import { MdCloudDownload, MdCloudUpload } from "react-icons/md"
import { colors } from "../style/colors"
import { Tab } from "../types/Tab"
import { DEV_MODE } from "../utils/constants"
import { downloadFile, readFileAsync } from "../utils/file"
import { getAttribute, openMultipleTabsByUrls } from "../utils/tabs"

type Props = {
    tabs: Tab[]
}

export const Header = ({ tabs }: Props) => {
    const [filename, setFilename] = useState("tabs")
    const inputRef = useRef<HTMLInputElement>(null)

    const tabUrls = getAttribute<Tab, string>(tabs, "url")

    const handleDownload = useCallback(async () => {
        if (!filename) {
            return
        }

        const content = tabUrls.join("\n")
        downloadFile(content, filename)
    }, [tabUrls, filename])

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return

        const promises = Array.from(event.target.files).map(async (file) => {
            const content = await readFileAsync(file as unknown as Blob)
            const urls = content.split("\n")
            await openMultipleTabsByUrls(urls)
        })

        await Promise.all(promises)
    }

    const triggerInput = () => {
        inputRef.current?.click()
    }

    return (
        <>
            <Box className="flex" justifyContent="space-between" alignItems="center">
                <Heading fontSize={24} color={colors.green700}>
                    PersisTabs
                    {DEV_MODE && (
                        <Text fontSize={8} fontWeight="bold" color={colors.green700}>
                            on DEVELOPMENT MODE
                        </Text>
                    )}
                </Heading>
                <Box className="flex" gap="12px">
                    <Tooltip label="Download tabs">
                        <IconButton
                            bgColor={colors.green700}
                            color={colors.white}
                            _hover={{ bgColor: colors.green700 }}
                            boxShadow="dark-lg"
                            aria-label="download icon button"
                            onClick={handleDownload}
                            isDisabled={!tabUrls.length || !filename}
                            icon={<Icon as={MdCloudDownload} />}
                        />
                    </Tooltip>
                    <Tooltip label="Import tabs">
                        <IconButton
                            bgColor={colors.green700}
                            color={colors.white}
                            _hover={{ bgColor: colors.green700 }}
                            boxShadow="dark-lg"
                            aria-label="upload icon button"
                            onClick={triggerInput}
                            icon={<Icon as={MdCloudUpload} />}
                        />
                    </Tooltip>
                    <input onChange={handleImport} ref={inputRef} id="import-input" type="file" />
                </Box>
            </Box>
            <Box>
                <Box
                    style={{
                        display: "flex",
                        alignItems: "end",
                    }}
                >
                    <Input
                        size="sm"
                        value={filename}
                        isInvalid={!filename}
                        onChange={(e) => setFilename(e.target.value)}
                        placeholder="Set filename"
                        sx={{
                            fontStyle: "italic",
                            borderBottom: `1px solid ${colors.green700}`,
                            _hover: {
                                boxShadow: "none",
                            },
                            _focus: {
                                boxShadow: "none",
                            },
                            _invalid: {
                                border: "none",
                                borderBottom: `1px solid ${colors.error}`,
                            },
                        }}
                    />
                    <Text fontSize={14} fontWeight="bold">
                        .csv
                    </Text>
                </Box>
                {!filename && (
                    <Text
                        style={{
                            fontSize: "10px",
                            color: colors.error,
                            paddingLeft: "12px",
                            paddingTop: "4px",
                            fontWeight: "700",
                        }}
                    >
                        please enter a valid filename
                    </Text>
                )}
            </Box>
        </>
    )
}
