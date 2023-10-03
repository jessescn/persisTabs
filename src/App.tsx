import { Box, Icon, IconButton } from "@chakra-ui/react"
import React, { PropsWithChildren, useEffect, useState } from "react"
import { BsGithub } from "react-icons/bs"
import { Container, Content } from "./components"
import { Header } from "./Header"
import { TabFilters } from "./TabFilters"
import { TabList } from "./TabList"
import { Tab } from "./types/Tab"
import { getTabsAttribute, loadOpenedTabs } from "./utils/tabs"

const WINDOW_HEIGHT = 600
const WINDOW_WIDTH = 300

const mock = [
    {
        id: 1,
        incognito: true,
        title: "teste",
        highlighted: false,
    },
    {
        id: 2,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 2,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 2,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 2,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 2,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 2,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 2,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 2,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 2,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 2,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
]

const Wrapper = ({ children }: PropsWithChildren) => {
    return (
        <Box w="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center">
            {children}
        </Box>
    )
}

const DEV_MODE = process.env.NODE_ENV === "development"

function App() {
    const [tabs, setTabs] = useState<Tab[]>([])
    const [filteredTabs, setFilteredTabs] = useState<Tab[]>([])
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    useEffect(() => {
        const filteredTabsIds = getTabsAttribute(filteredTabs, "id") as number[]
        setSelectedIds((prev) => prev.filter((value) => filteredTabsIds.includes(Number(value))))
    }, [filteredTabs])

    useEffect(() => {
        if (DEV_MODE) {
            setTabs(mock)
            setFilteredTabs(mock)
        } else {
            loadOpenedTabs().then((values) => {
                setTabs(values)
                setFilteredTabs(values)
                const ids = getTabsAttribute(values, "id") as number[]
                setSelectedIds(ids.map(String))
            })
        }
    }, [])

    const content = (
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
            <Box
                style={{
                    position: "absolute",
                    bottom: "12px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <IconButton
                    aria-label="github icon link"
                    variant="unstyled"
                    onClick={() => (window.location.href = "https://github.com")}
                    icon={<Icon fontSize={24} as={BsGithub} color="#fff" />}
                />
            </Box>
        </Container>
    )

    return DEV_MODE ? <Wrapper>{content}</Wrapper> : content
}

export default App
