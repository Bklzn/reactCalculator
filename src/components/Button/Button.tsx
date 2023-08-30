import { ReactNode } from "react"

interface Props{
    children: ReactNode,
    className?: string,
    onClick: (...args: any) => void
}

const Button = ({children, className, onClick}: Props) => {
    return <button className={className} onClick={onClick}>{children}</button>
}
export default Button