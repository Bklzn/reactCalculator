interface Props {
    children: number
}
const Display = ({children}: Props) => {
    return (
        <div className="display">{children.toLocaleString("en-US").split(',').join(' ')}</div>
    )
}

export default Display