import { Tab } from "./Tab"

export type FilterOption = "incognito" | "exclude-incognito"

export type FilterHandler = (tabs: Tab[]) => Tab[]

export interface Tag {
    label: FilterOption
    excludeLabel: FilterOption
}
