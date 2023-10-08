import { Box, Icon, Link } from "@chakra-ui/react"
import React, { PropsWithChildren, useEffect, useState } from "react"
import { BsGithub } from "react-icons/bs"
import { Container, Content } from "./components"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { TabFilters } from "./TabFilters"
import { TabList } from "./TabList"
import { Tab } from "./types/Tab"
import { DEV_MODE } from "./utils/constants"
import { getTabsAttribute, loadOpenedTabs, sortTabsByUrl } from "./utils/tabs"

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
        const filteredTabsIds = getTabsAttribute(filteredTabs, "id") as number[]
        setSelectedIds((prev) => prev.filter((value) => filteredTabsIds.includes(Number(value))))
    }, [filteredTabs])

    useEffect(() => {
        loadOpenedTabs().then((values) => {
            values.sort(sortTabsByUrl)
            setTabs(values)
            setFilteredTabs(values)
            const ids = getTabsAttribute(values, "id") as number[]
            setSelectedIds(ids.map(String))
        })
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
            <Footer />
        </Container>
    )

    return DEV_MODE ? <Wrapper>{content}</Wrapper> : content
}

export default App
