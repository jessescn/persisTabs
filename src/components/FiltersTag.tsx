/* eslint-disable indent */
import {
    Tag as ChakraTag,
    TagLeftIcon as ChakraTagLeftIcon,
    TagLabel as ChakraTagLabel,
    TagProps,
} from "@chakra-ui/react"
import React, { useCallback } from "react"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { colors } from "../style/colors"

type Props = TagProps & {
    label: string
    excludeLabel: string
    filters: string[]
    setFilters: (values: any) => void
}

export const FiltersTag = ({ label, filters, setFilters, excludeLabel, ...props }: Props) => {
    const hasAtLeastOne = filters.includes(excludeLabel) || filters.includes(label)

    const getNewFilters = useCallback(() => {
        const isExcluding = filters.includes(excludeLabel)
        const isIncluding = filters.includes(label)

        let newFilters = filters

        if (!isExcluding && !isIncluding) {
            newFilters = [...newFilters, label]
        } else if (isIncluding) {
            newFilters = newFilters.filter((e) => e !== label)
            newFilters = [...newFilters, excludeLabel]
        } else {
            newFilters = newFilters.filter((e) => ![label, excludeLabel].includes(e))
        }

        return newFilters
    }, [excludeLabel, filters, label])

    const onSelect = useCallback(() => {
        setFilters(getNewFilters())
    }, [getNewFilters, setFilters])

    const icon = filters.includes(label)
        ? AiOutlinePlus
        : filters.includes(excludeLabel)
        ? AiOutlineMinus
        : null

    return (
        <ChakraTag
            _hover={{ cursor: "pointer" }}
            border={`1px solid ${colors.green700}`}
            color={hasAtLeastOne ? colors.white : colors.green700}
            bgColor={hasAtLeastOne ? colors.green700 : colors.white}
            onClick={onSelect}
            {...props}
        >
            {icon && <ChakraTagLeftIcon color={colors.white} as={icon} />}
            <ChakraTagLabel>{label}</ChakraTagLabel>
        </ChakraTag>
    )
}