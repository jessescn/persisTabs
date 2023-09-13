import { Tab } from "../types/Tab"

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
    if (!chrome?.tabs) return []

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

export { openMultipleTabsByUrls, loadOpenedTabs, getTabsAttribute }
