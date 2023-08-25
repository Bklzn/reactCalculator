import { useEffect, useRef, useState } from "react"

interface Props {
    children: string
}
const fontSize = (init: number) => {
    const elementRef = useRef(null)
    useEffect(() => {
        const element = elementRef.current as unknown as HTMLElement
        const handleResize = () => {
            let displayH = element.parentElement?.offsetHeight || 0
            element.style.fontSize = `${(displayH * 1.22 * init)}px`
            let displayW = element.parentElement?.offsetWidth || 0
            let spanW = element.offsetWidth
            let factor = 1
            
            if(spanW + 1 > displayW){
                factor = displayW / spanW
                element.style.fontSize = `${(displayH * 1.22 * init) * factor}px`
            }
        }
        if(element){
            handleResize()
            const obs = new MutationObserver(handleResize)
            obs.observe(element,{
                childList: true,
                subtree: true,
                characterData: true,
            })
            return () => {
                obs.disconnect()
            }
        }
    },[])

    return elementRef
}
const OperationDisplay = ({children}: Props) => {
    const elementRef = fontSize(.3)
    return (
        <div className="display operationDisplay"><span ref={elementRef}>{children}</span></div>
    )
}
const Display = ({children}: Props) => {
    const elementRef = fontSize(1)
    let dot = children.split('.')
    let string = Number.parseFloat(dot[0]).toLocaleString("en-US").split(',').join(' ') + (dot.length > 1?('.' + dot[1]):'')
    return (
        <div className="display"><span ref={elementRef}>{string}</span></div>
    )
}

export { Display, OperationDisplay }