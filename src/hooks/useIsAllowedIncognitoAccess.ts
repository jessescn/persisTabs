import { useEffect, useState } from "react"
import { getIsAllowedIncognitoAccess } from "../utils/chromeApi"

export const useIsAllowedIncognitoAccess = () => {
    const [isAllowedIncognitoAccess, setIsAllowedIncognitoAccess] = useState(true)

    useEffect(() => {
        getIsAllowedIncognitoAccess().then((isAllowed) => {
            setIsAllowedIncognitoAccess(isAllowed)
        })
    }, [])

    return { isAllowedIncognitoAccess }
}
