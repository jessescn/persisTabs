import { DEV_MODE } from "./constants"
import { Tab } from "../types/Tab"

const mockTabs: Tab[] = [
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
        id: 3,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 4,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 5,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 6,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 7,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 8,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 9,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 10,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
    {
        id: 11,
        incognito: false,
        title: "Command not found with new Hyper install 2.1.0 · Issue #3349 · vercel/hyper",
        highlighted: false,
    },
]

const openMultipleTabsByUrls = async (urls: string[]) => {
    const promises: Promise<void>[] = []

    urls.forEach((url) => {
        const promise = new Promise<void>((resolve, reject) => {
            const config = { url }
            chrome.tabs
                .create(config)
                .then(() => resolve())
                .catch((error) => reject(error))
        })
        promises.push(promise)
    })

    await Promise.all(promises)
}

const loadOpenedTabs = async () => {
    if (DEV_MODE || !chrome?.tabs) return mockTabs

    return chrome.tabs.query({})
}

const getTabsAttribute = (tabs: Tab[], attribute: keyof Tab) => {
    return tabs.reduce((current, tab) => {
        if (tab[attribute]) {
            return [...current, tab[attribute]]
        }

        return current
    }, [] as any[])
}

const sortTabsByUrl = (tab1: Tab, tab2: Tab) => {
    if (!tab1.url) return 1

    if (!tab2.url) return -1

    return tab1.url.localeCompare(tab2.url)
}

export { openMultipleTabsByUrls, loadOpenedTabs, getTabsAttribute, sortTabsByUrl }
