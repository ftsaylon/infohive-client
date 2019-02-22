export const columnSort = (table, attribute) => {
    this.props[table].sort((a, b) => a[attribute].localeCompare(b[attribute]))
    // https://github.com/clauderic/react-tiny-virtual-list/issues/34
    this.forceUpdate()
}