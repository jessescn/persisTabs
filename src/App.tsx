import { Box } from "@chakra-ui/react"
import React, { PropsWithChildren, useEffect, useState } from "react"
import { Container, Content } from "./components"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { TabFilters } from "./TabFilters"
import { TabList } from "./TabList"
import { Tab } from "./types/Tab"
import { DEV_MODE } from "./utils/constants"
import { getAttribute, loadOpenedTabs } from "./utils/tabs"

const WINDOW_HEIGHT = 600
const WINDOW_WIDTH = 300

const Wrapper = ({ children }: PropsWithChildren) => {
    return (
        <Box w="100vw" h="100vh" display="flex" alignItems="center" justifyContent="center">
            {children}
        </Box>
    )
}

function App() {
    const [tabs, setTabs] = useState<Tab[]>([])
    const [filteredTabs, setFilteredTabs] = useState<Tab[]>([])
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    useEffect(() => {
        const filteredTabsIds = getAttribute<Tab, number>(filteredTabs, "id").map(String)
        setSelectedIds(filteredTabsIds)
    }, [filteredTabs])

    useEffect(() => {
        loadOpenedTabs().then((chromeTabs) => {
            setTabs(chromeTabs)
            setFilteredTabs(chromeTabs)
        })
    }, [])

    const content = (
        <Container $height={WINDOW_HEIGHT} $width={WINDOW_WIDTH}>
            <Content boxShadow="dark-lg">
                <Header
                    tabs={filteredTabs.filter((tab) => selectedIds.includes(String(tab.id)))}
                />
                <TabFilters tabs={tabs} setTabs={setFilteredTabs} />
                <TabList
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    tabs={filteredTabs}
                />
            </Content>
            <Footer />
        </Container>
    )

    return DEV_MODE ? <Wrapper>{content}</Wrapper> : content
}

export default App
