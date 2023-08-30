import { BaseSyntheticEvent, useEffect, useRef, useState} from "react"
import Button from "../Button/Button"

interface Props {
    mainDisplay: string
    setMainDisplay: (args:string) => any
    setResetMainDisplay: (arg:boolean) => any
}

const Memory = ({mainDisplay, setMainDisplay, setResetMainDisplay}: Props) => {
    const [list, setList] = useState<number[]>([]);
    const [listShowed, setListShowed] = useState(false);
    let cover = document.createElement("span")
    cover.classList.add('cover')
    let clickHandler = () => {
        setListShowed(false)
        document.getElementById('Calculator')?.removeChild(cover)
    }

    useEffect(() => {
        let memoryBtns = document.querySelectorAll('.memory button') as NodeListOf<HTMLButtonElement>
        if(listShowed){
            cover.addEventListener('click', clickHandler)
            if ( !document.body.querySelector('.cover') ) document.getElementById('Calculator')?.appendChild(cover)
            memoryBtns.forEach((e, i) => {
                if( i !== memoryBtns.length - 1 ) e.disabled = true
            })
        }
        if(list.length === 0) {
            memoryBtns[0].disabled = true
            memoryBtns[1].disabled = true
            if (!listShowed) memoryBtns[memoryBtns.length - 1].disabled = true
        }
        return () => {
            cover.removeEventListener('click', clickHandler)
        }
    })

    const memoryButtons = () => {
        return (
            <div className="memory">
                <Button onClick={() => setList([])}>MC</Button>
                <Button onClick={() => memoryRead(0)}>MR</Button>
                <Button onClick={() => memoryOperation(0,'+')}>M+</Button>
                <Button onClick={() => memoryOperation(0,'-')}>M-</Button>
                <Button onClick={() => save()}>MS</Button>
                <Button onClick={() => setListShowed(!listShowed)}>Mv</Button>
            </div>
        )
    }
    const memoryDel = (id: number) => {
        let arr = [...list]
        arr.splice(id,1)
        setList(arr)
    }
    const memoryList = () => {
        return (
            <div className={`memoryBox ${listShowed?'showed': ''}`}>
                {list.length > 0
                    ?
                    <>
                        <div className="memoryList">
                            {list.map((e, v) => (
                                <div className="memoryElement" onClick={() => {memoryRead(v); clickHandler()}} key={v}>
                                    <span>{e}</span>
                                    <div className="memoryElement__buttons">
                                        <Button onClick={(e) => {e.stopPropagation(); memoryDel(v)}}>MC</Button>
                                        <Button onClick={(e) => {e.stopPropagation(); memoryOperation(v,'+')}}>M+</Button>
                                        <Button onClick={(e) => {e.stopPropagation(); memoryOperation(v,'-')}}>M-</Button>
                                    </div>
                                </div>
                            ))} 
                        </div>
                        <div className="delete">
                            <Button onClick={() => setList([])}>MC</Button>
                        </div>
                    </>
                    :
                    <div className="memoryList">Brak elementów zapisanych w pamięci</div>
                }
            </div>)
    }
    const memoryOperation = (id: number,v: string) => {
        let arr = [...list]
        let displayNumber = Number.parseFloat(mainDisplay)
        if (list.length < 1) {
            save() 
            return
        }
        switch(v){
            case '+':
                arr[id]+=displayNumber
                break;
            case '-':
                arr[id]-=displayNumber
                break;
            
        }
        setList(arr)
    }
    const memoryRead = (id: number) => {
        setMainDisplay(list[id].toString())
        setResetMainDisplay(true)
    }
    const save = () => {
        setList(v => [Number.parseFloat(mainDisplay), ...v])
        setResetMainDisplay(true)
    }
    return [memoryButtons, memoryList]
}

export default Memory