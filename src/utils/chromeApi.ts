const getIsAllowedIncognitoAccess = async () => {
    if (!chrome?.extension) return true

    return chrome.extension.isAllowedIncognitoAccess()
}

const getChromeExtensionId = () => {
    if (!chrome?.runtime) return

    return chrome.runtime.id
}

export { getIsAllowedIncognitoAccess, getChromeExtensionId }
