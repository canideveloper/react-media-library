export interface FileLibraryPagerProps {
    page: number,
    itemsPerPage: number,
    pagerCallback: (number: number) => void,
    offsetDisplay?: number,
    total: number,
    last_page?: number
}

