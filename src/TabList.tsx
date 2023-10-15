import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Icon,
    Image,
    Text,
    Tooltip,
} from "@chakra-ui/react"
import React, { useCallback } from "react"
import { BsIncognito } from "react-icons/bs"
import { colors } from "./style/colors"
import { Tab } from "./types/Tab"
import { getAttribute } from "./utils/tabs"

type Props = {
    tabs: Tab[]
    selectedIds: string[]
    setSelectedIds: (ids: string[]) => void
}

export const TabList = ({ tabs, selectedIds, setSelectedIds }: Props) => {
    const isAllTabsSelected = tabs.length === selectedIds.length

    const handleSelectAll = useCallback(() => {
        const everyTabIds = getAttribute<Tab, number>(tabs, "id").map(String)

        setSelectedIds(everyTabIds)
    }, [setSelectedIds, tabs])

    const handleDeselectAll = useCallback(() => {
        setSelectedIds([])
    }, [setSelectedIds])

    const buttonLabel = isAllTabsSelected ? "deselect all" : "select all"

    return (
        <>
            <Button
                size="xs"
                _hover={{ bgColor: colors.green700, color: colors.white }}
                bgColor={colors.green700}
                color={colors.white}
                onClick={isAllTabsSelected ? handleDeselectAll : handleSelectAll}
            >
                {buttonLabel}
            </Button>
            <Accordion allowToggle defaultIndex={[0]}>
                <AccordionItem>
                    <AccordionButton
                        paddingX={0}
                        className="flex"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Box className="flex">
                            <AccordionIcon />
                            <Text fontSize={14} color={colors.green700} fontWeight={700}>
                                Tabs
                            </Text>
                        </Box>
                        <Text fontSize={14} color={colors.green700} fontWeight={700}>
                            {`${selectedIds.length} selected`}
                        </Text>
                    </AccordionButton>
                    <AccordionPanel maxH="200px" overflowY="auto">
                        <CheckboxGroup onChange={setSelectedIds} value={selectedIds}>
                            {tabs.map((tab) => (
                                <Checkbox
                                    borderColor={colors.green700}
                                    size="sm"
                                    w="100%"
                                    key={tab.id}
                                    value={String(tab.id)}
                                    _checked={{
                                        "& .chakra-checkbox__control": {
                                            borderColor: colors.green700,
                                            background: colors.green700,
                                        },
                                    }}
                                >
                                    <Box className="flex" alignItems="center">
                                        <Image
                                            boxSize="15px"
                                            marginRight="6px"
                                            src={tab.favIconUrl}
                                            alt="tab icon"
                                            fallbackSrc="https://via.placeholder.com/15"
                                        />
                                        <Tooltip label={tab.title}>
                                            <Text
                                                color={colors.green700}
                                                fontWeight={700}
                                                fontSize={12}
                                                noOfLines={1}
                                            >
                                                {tab.title}
                                            </Text>
                                        </Tooltip>
                                        {tab.incognito && (
                                            <Icon
                                                as={BsIncognito}
                                                marginLeft="8px"
                                                fontSize="12px"
                                            />
                                        )}
                                    </Box>
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    )
}
