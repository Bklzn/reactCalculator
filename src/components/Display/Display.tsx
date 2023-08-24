interface Props {
    children: string
}
const OperationDisplay = ({children}: Props) => {
    return (
        <div className="display operationDisplay">{children}</div>
    )
}
const Display = ({children}: Props) => {
    let dot = children.split('.')
    let string = Number.parseFloat(dot[0]).toLocaleString("en-US").split(',').join(' ') + (dot.length > 1?('.' + dot[1]):'')
    return (
        <div className="display">{string}</div>
    )
}

export { Display, OperationDisplay }