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
    isDisabled?: boolean
}

export const FiltersTag = ({
    label,
    filters,
    setFilters,
    excludeLabel,
    isDisabled = false,
    ...tagProps
}: Props) => {
    const isExcluding = filters.includes(excludeLabel)
    const isIncluding = filters.includes(label)
    const hasAtLeastOne = isExcluding || isIncluding

    const onSelect = useCallback(() => {
        if (isDisabled) return

        let newFilters = filters

        if (!isExcluding && !isIncluding) {
            newFilters = [...newFilters, label]
        } else if (isIncluding) {
            newFilters = newFilters.filter((e) => e !== label)
            newFilters = [...newFilters, excludeLabel]
        } else {
            newFilters = newFilters.filter((e) => ![label, excludeLabel].includes(e))
        }

        setFilters(newFilters)
    }, [excludeLabel, filters, isDisabled, isExcluding, isIncluding, label, setFilters])

    const icon = isIncluding ? AiOutlinePlus : isExcluding ? AiOutlineMinus : null

    return (
        <ChakraTag
            _hover={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
            border={`1px solid ${colors.green700}`}
            color={hasAtLeastOne ? colors.white : colors.green700}
            bgColor={hasAtLeastOne ? colors.green700 : colors.white}
            onClick={onSelect}
            opacity={isDisabled ? 0.5 : 1}
            {...tagProps}
        >
            {icon && <ChakraTagLeftIcon color={colors.white} as={icon} />}
            <ChakraTagLabel>{label}</ChakraTagLabel>
        </ChakraTag>
    )
}
