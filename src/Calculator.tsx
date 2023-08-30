import {Display, OperationDisplay} from './components/Display/Display'
import Button from './components/Button/Button'
import { useState } from 'react'
import Memory from './components/memory/memory'

function Calculator() {
  const [operationDisplay, setOperationDisplay] = useState('')
  const [mainDisplay, setMainDisplay] = useState('0')
  const [lastSign, setLastSign] = useState('')
  const [resetMainDisplay, setResetMainDisplay] = useState(true)
  const [resetOperationDisplay, setResetOperationDisplay] = useState(false)
  const [MemoryButtons, MemoryList] = Memory({mainDisplay, setMainDisplay, setResetMainDisplay})
  const updateDisplay = (value: string) => {
    if (resetOperationDisplay) {
      setOperationDisplay('')
      setResetOperationDisplay(false)
    }
    switch(value){
      case '.':
        setMainDisplay((v) => v + '.')
        setResetMainDisplay(false)
        break;
      case '-':
        mainDisplay.charAt(0) === '-'?setMainDisplay((v) => v.substring(1)):setMainDisplay((v) => '-' + v)
        setResetMainDisplay(false)
        break;
      default:
        if (resetMainDisplay){
          setMainDisplay(value)
          setResetMainDisplay(false)
        } else {
          setMainDisplay((v) => value === '0' && v === '0'?v:v + value)
        }
        break;
    }
  };
  const operations = (sign: string) => {
    let a = Number.parseFloat(operationDisplay.slice(0,-1)) || 0
    let b = Number.parseFloat(mainDisplay)
    const calc = (a:number, b:number, o:string) =>{
      switch(o){
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '**':
          return a ** b;
        case '/':
          return a / b;
      }
    }
    if (sign === '=') {
      console.log(lastSign)
      if (lastSign){
        setOperationDisplay(`${a} ${lastSign} ${b} ${sign}`)
        setMainDisplay(String(calc(a,b,lastSign)))
      } else {
        setOperationDisplay(`${b} ${sign}`)
      }
      setLastSign('')
      setResetMainDisplay(true)
      setResetOperationDisplay(true)
      return
    }
    if (lastSign !== '') {
      setOperationDisplay(String(calc(a,b,lastSign)))
      setMainDisplay(String(calc(a,b,lastSign)))
    } else {
      setOperationDisplay(mainDisplay)
      setMainDisplay(mainDisplay)
    }
    setOperationDisplay((v) => v + ` ${sign}`)
    setLastSign(sign)
    setResetMainDisplay(true)
    setResetOperationDisplay(false)
  }
  const clear = () => {
    setOperationDisplay('')
    setMainDisplay('0')
    setLastSign('')
    setResetMainDisplay(true)
    setResetOperationDisplay(false)

  }
  const backspace = () => {
    if(resetMainDisplay) {
      setOperationDisplay('')
      setLastSign('')
      setResetOperationDisplay(false)
    } else {
      if (mainDisplay.length > 1){
        setMainDisplay(v => v.slice(0,-1))
      } else {
        setMainDisplay('0')
        setResetMainDisplay(true)
      }
    }
  }
  return (
    <>
      <OperationDisplay>{operationDisplay}</OperationDisplay>
      <Display>{mainDisplay}</Display>
      <MemoryButtons></MemoryButtons>
      <div className="buttons">
        <Button className='operation' key={'C'} onClick={() => clear()}>C</Button>
        <Button className='operation' key={'Del'} onClick={() => backspace()}>Del</Button>
        <Button className='operation' key={'x2'} onClick={() => operations('**')}>x<sup>y</sup></Button>
        <Button className='operation' key={'/'} onClick={() => operations('/')}>/</Button>
        <Button className='operation' key={'x'} onClick={() => operations("*")}>*</Button>
        <Button className='operation' key={'-'} onClick={() => operations("-")}>-</Button>
        <Button className='operation' key={'+'} onClick={() => operations("+")}>+</Button>
        {[...Array(10)].map((e, i) =>
          <Button className='number' key={i} onClick={() => updateDisplay(i.toString())}>{i}</Button>)
        }
        <Button className='number' key={'toggleNegative'} onClick={() => updateDisplay('-')}>+/-</Button>
        <Button className='number' key={'dot'} onClick={() => updateDisplay('.')}>.</Button>
        <Button className='equal' key={'='} onClick={() => operations("=")}>=</Button>
      </div>
      <MemoryList></MemoryList>
    </>
  )
}
export default Calculator
