import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Checkbox,
    CheckboxGroup,
    Text,
} from "@chakra-ui/react"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { colors } from "./style/colors"
import { Tab } from "./types/Tab"

type FilterOption = "onlyIncognito"

type FilterHandler = (tabs: Tab[]) => Tab[]

type Props = {
    tabs: Tab[]
    setFilteredTabs: (tabs: Tab[]) => void
}

export const TabFilters = ({ setFilteredTabs, tabs }: Props) => {
    const [filters, setFilters] = useState<FilterOption[]>([])

    const handlers: Record<FilterOption, FilterHandler> = useMemo(
        () => ({
            onlyIncognito: (tabs) => tabs.filter((tab) => tab.incognito),
        }),
        []
    )

    const getFilteredTabsWithHandlers = useCallback(() => {
        return filters.reduce((current, filter) => {
            const handler = handlers[filter]

            return handler(current)
        }, tabs)
    }, [filters, handlers, tabs])

    useEffect(() => {
        const newFilteredTabs = getFilteredTabsWithHandlers()
        setFilteredTabs(newFilteredTabs)
    }, [filters, getFilteredTabsWithHandlers, setFilteredTabs, tabs.length])

    return (
        <Accordion allowToggle defaultIndex={[0]}>
            <AccordionItem>
                <AccordionButton paddingX={0}>
                    <AccordionIcon />
                    <Text fontSize={14} color={colors.green700} fontWeight={700}>
                        Filters
                    </Text>
                </AccordionButton>
                <AccordionPanel display="flex" gap={4}>
                    <CheckboxGroup
                        value={filters}
                        onChange={(e) => setFilters(e as FilterOption[])}
                    >
                        <Checkbox
                            borderColor={colors.green700}
                            size="sm"
                            value="onlyIncognito"
                            _checked={{
                                "& .chakra-checkbox__control": {
                                    borderColor: colors.green700,
                                    background: colors.green700,
                                },
                            }}
                        >
                            <Text fontWeight={700} fontSize={12}>
                                Incognito
                            </Text>
                        </Checkbox>
                        {/* <Checkbox
                            borderColor={colors.green700}
                            size="sm"
                            value="onlyIncognito"
                            _checked={{
                                "& .chakra-checkbox__control": {
                                    borderColor: colors.green700,
                                    background: colors.green700,
                                },
                            }}
                        >
                            <Text fontWeight={700} fontSize={12}>
                                Incognito
                            </Text>
                        </Checkbox> */}
                    </CheckboxGroup>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}
