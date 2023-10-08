import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Text,
} from "@chakra-ui/react"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { FiltersTag } from "./components"
import { colors } from "./style/colors"
import { FilterHandler, FilterOption, Tag } from "./types/Filters"
import { Tab } from "./types/Tab"

type Props = {
    tabs: Tab[]
    setFilteredTabs: (tabs: Tab[]) => void
}

export const TabFilters = ({ setFilteredTabs, tabs }: Props) => {
    const [filters, setFilters] = useState<FilterOption[]>([])

    const handlers: Record<FilterOption, FilterHandler> = useMemo(
        () => ({
            incognito: (tabs) => tabs.filter((tab) => tab.incognito),
            "exclude-incognito": (tabs) => tabs.filter((tab) => !tab.incognito),
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

    const tags: Tag[] = [
        {
            label: "incognito",
            excludeLabel: "exclude-incognito",
        },
    ]

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
                    {tags.map((tag) => (
                        <FiltersTag
                            key={tag.label}
                            size="sm"
                            label={tag.label}
                            excludeLabel={tag.excludeLabel}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    ))}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}
