import React, { useEffect, useState } from "react"
import { Container, Content } from "./components"
import { Header } from "./Header"
import { TabFilters } from "./TabFilters"
import { TabList } from "./TabList"
import { Tab } from "./types/Tab"
import { getTabsAttribute, loadOpenedTabs } from "./utils/tabs"

const WINDOW_HEIGHT = 600
const WINDOW_WIDTH = 300

// const mock = [
//     {
//         id: 1,
//         incognito: true,
//         title: "teste",
//         highlighted: false,
//     },
//     {
//         id: 2,
//         incognito: false,
//         title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
//         highlighted: false,
//     },
// ]

function App() {
    const [tabs, setTabs] = useState<Tab[]>([])
    const [filteredTabs, setFilteredTabs] = useState<Tab[]>([])
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    useEffect(() => {
        const filteredTabsIds = getTabsAttribute(filteredTabs, "id") as number[]
        setSelectedIds((prev) => prev.filter((value) => filteredTabsIds.includes(Number(value))))
    }, [filteredTabs])

    useEffect(() => {
        loadOpenedTabs().then((values) => {
            setTabs(values)
            setFilteredTabs(values)
            const ids = getTabsAttribute(values, "id") as number[]
            setSelectedIds(ids.map(String))
        })
    }, [])

    return (
        // <Box w="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center">
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
        // </Box>
    )
}

export default App
