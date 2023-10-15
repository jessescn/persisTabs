import { useEffect, useState } from "react"
import { Tab } from "../types/Tab"
import { loadOpenedTabs } from "../utils/tabs"

export const useChromeTabs = () => {
    const [chromeTabs, setChromeTabs] = useState<Tab[]>([])

    useEffect(() => {
        loadOpenedTabs().then((tabs) => {
            setChromeTabs(tabs)
        })
    }, [])

    return { chromeTabs }
}
