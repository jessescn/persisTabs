import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Checkbox,
    CheckboxGroup,
    Icon,
    Image,
    Text,
} from "@chakra-ui/react"
import React from "react"
import { BsIncognito } from "react-icons/bs"
import { colors } from "./style/colors"
import { Tab } from "./types/Tab"

type Props = {
    tabs: Tab[]
    selectedIds: string[]
    setSelectedIds: (ids: string[]) => void
}

export const TabList = ({ tabs, selectedIds, setSelectedIds }: Props) => {
    return (
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
                <AccordionPanel maxH="250px" overflowY="auto">
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
                                    <Text
                                        color={colors.green700}
                                        fontWeight={700}
                                        fontSize={12}
                                        noOfLines={2}
                                    >
                                        {tab.title}
                                    </Text>
                                    {tab.incognito && (
                                        <Icon as={BsIncognito} marginLeft="8px" fontSize="12px" />
                                    )}
                                </Box>
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}
