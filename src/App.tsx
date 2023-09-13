import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Checkbox,
    CheckboxGroup,
    Heading,
    Icon,
    IconButton,
    Text,
} from "@chakra-ui/react"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { BsIncognito } from "react-icons/bs"
import { MdCloudDownload, MdCloudUpload } from "react-icons/md"
import { Container, Content } from "./components"
import { colors } from "./style/colors"
import { Tab } from "./types/Tab"
import { downloadFile, readFileAsync } from "./utils/file"
import { getTabsAttribute, loadOpenedTabs, openMultipleTabsByUrls } from "./utils/tabs"

type Filter = {
    incognitoOnly?: boolean
}

const WINDOW_HEIGHT = 600
const WINDOW_WIDTH = 300

type HeaderProps = {
    tabs: Tab[]
}

const Header = ({ tabs }: HeaderProps) => {
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

type FilterOption = "onlyIncognito"

type FilterHandler = (tabs: Tab[]) => Tab[]

type TabFilterProps = {
    tabs: Tab[]
    setFilteredTabs: (tabs: Tab[]) => void
}

const TabFilters = ({ setFilteredTabs, tabs }: TabFilterProps) => {
    const [filters, setFilters] = useState<FilterOption[]>([])

    const handlers: Record<FilterOption, FilterHandler> = useMemo(
        () => ({
            onlyIncognito: (tabs) => tabs.filter((tab) => tab.incognito),
        }),
        []
    )

    const getFilteredTabsWithHandlers = useCallback(() => {
        let filteredTabs = tabs

        filters.forEach((filter) => {
            const handler = handlers[filter]

            filteredTabs = handler(filteredTabs)
        })

        setFilteredTabs(filteredTabs)
    }, [filters, handlers, setFilteredTabs, tabs])

    useEffect(() => {
        if (tabs.length) {
            getFilteredTabsWithHandlers()
        }
    }, [filters, getFilteredTabsWithHandlers, tabs.length])

    return (
        <Box>
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton paddingX={0}>
                        <AccordionIcon />
                        <Text fontSize={14} color={colors.green700} fontWeight={700}>
                            Filters
                        </Text>
                    </AccordionButton>
                    <AccordionPanel display="flex">
                        <CheckboxGroup
                            value={filters}
                            onChange={(e) => setFilters(e as FilterOption[])}
                        >
                            <Checkbox size="sm" value="onlyIncognito">
                                <Text fontWeight={700} fontSize={12}>
                                    Incognito
                                </Text>
                            </Checkbox>
                        </CheckboxGroup>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}

type TabListProps = {
    tabs: Tab[]
    selectedIds: string[]
    setSelectedIds: (ids: string[]) => void
}

const TabList = ({ tabs, selectedIds, setSelectedIds }: TabListProps) => {
    return (
        <Box>
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
                    <AccordionPanel maxH="400px" overflowY="auto">
                        <CheckboxGroup onChange={setSelectedIds} value={selectedIds}>
                            {tabs.map((tab) => (
                                <Checkbox size="sm" w="100%" key={tab.id} value={String(tab.id)}>
                                    <Box className="flex" alignItems="center">
                                        <Text fontWeight={700} fontSize={12}>
                                            {tab.title}
                                        </Text>
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
        </Box>
    )
}

function App() {
    const [tabs, setTabs] = useState<Tab[]>([
        {
            id: 1,
            incognito: true,
            title: "teste",
            highlighted: false,
        },
        {
            id: 2,
            incognito: false,
            title: "teste 2",
            highlighted: false,
        },
    ])
    const [filteredTabs, setFilteredTabs] = useState<Tab[]>([
        {
            id: 1,
            incognito: false,
            title: "teste",
            highlighted: false,
        },
        {
            id: 2,
            incognito: false,
            title: "teste 2",
            highlighted: false,
        },
    ])
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    useEffect(() => {
        const filteredTabsIds = getTabsAttribute(filteredTabs, "id") as number[]
        setSelectedIds((prev) => prev.filter((value) => filteredTabsIds.includes(Number(value))))
    }, [filteredTabs])

    useEffect(() => {
        loadOpenedTabs().then((values) => {
            setTabs(values)
            setFilteredTabs(values)
            const ids = getTabsAttribute(values, "id") as string[]
            setSelectedIds(ids)
        })
    }, [])

    return (
        <Box w="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center">
            <Container $height={WINDOW_HEIGHT} $width={WINDOW_WIDTH}>
                <Content boxShadow="dark-lg">
                    <Header tabs={filteredTabs} />
                    <TabFilters tabs={tabs} setFilteredTabs={setFilteredTabs} />
                    <TabList
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        tabs={filteredTabs}
                    />
                </Content>
            </Container>
        </Box>
    )
}

export default App
