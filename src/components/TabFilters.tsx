import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Text,
} from "@chakra-ui/react"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { FiltersTag } from "."
import { IncognitoFeatureAlert } from "./IncognitoFeatureAlert"
import { useIsAllowedIncognitoAccess } from "../hooks"
import { colors } from "../style/colors"
import { FilterHandler, FilterOption, Tag } from "../types/Filters"
import { Tab } from "../types/Tab"

type Props = {
    tabs: Tab[]
    setTabs: (tabs: Tab[]) => void
}

export const TabFilters = ({ setTabs, tabs }: Props) => {
    const { isAllowedIncognitoAccess } = useIsAllowedIncognitoAccess()
    const [filters, setFilters] = useState<FilterOption[]>([])

    const handlers: Record<FilterOption, FilterHandler> = useMemo(
        () => ({
            incognito: (tabs) => tabs.filter((tab) => tab.incognito),
            "exclude-incognito": (tabs) => tabs.filter((tab) => !tab.incognito),
        }),
        []
    )

    const getFilteredTabs = useCallback(() => {
        return filters.reduce((current, filter) => {
            return handlers[filter](current)
        }, tabs)
    }, [filters, handlers, tabs])

    useEffect(() => {
        const newFilteredTabs = getFilteredTabs()
        setTabs(newFilteredTabs)
    }, [filters, getFilteredTabs, setTabs, tabs.length])

    const tags: Tag[] = [
        {
            label: "incognito",
            excludeLabel: "exclude-incognito",
            isDisabled: !isAllowedIncognitoAccess,
        },
    ]

    return (
        <Box>
            {!isAllowedIncognitoAccess && <IncognitoFeatureAlert />}
            <Accordion allowToggle defaultIndex={[0]}>
                <AccordionItem>
                    <AccordionButton paddingX={0}>
                        <AccordionIcon />
                        <Text fontSize={14} color={colors.green700} fontWeight={700}>
                            Filters
                        </Text>
                    </AccordionButton>
                    <AccordionPanel display="flex" gap={4}>
                        {tags.map((tag) => (
                            <FiltersTag
                                key={tag.label}
                                size="sm"
                                label={tag.label}
                                isDisabled={tag.isDisabled}
                                excludeLabel={tag.excludeLabel}
                                filters={filters}
                                setFilters={setFilters}
                            />
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}
