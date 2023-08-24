import {Display, OperationDisplay} from './components/Display/Display'
import Button from './components/Button/Button'
import { useState } from 'react'

function Calculator() {
  const [operationDisplay, setOperationDisplay] = useState('')
  const [mainDisplay, setMainDisplay] = useState('0')
  const [lastSign, setLastSign] = useState('')
  const [resetMainDisplay, setResetMainDisplay] = useState(true)
  const [resetOperationDisplay, setResetOperationDisplay] = useState(false)
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
    let a = Number.parseFloat(operationDisplay.slice(0,-1))
    let b = Number.parseFloat(mainDisplay)
    const calc = (a:number, b:number, o:string) =>{
      switch(o){
        case '+':
          return a + b;
        case '-':
          return a - b;
        case '*':
          return a * b;
        case '/':
          return a / b;
      }
    }
    if(resetMainDisplay) {
      setOperationDisplay((v) => v.slice(0, -1) + sign)
      setLastSign(sign)
      return
    }
    if (sign === '=') {
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
    setOperationDisplay((v) => v + sign)
    setLastSign(sign)
    setResetMainDisplay(true)
  }
  return (
    <>
      <OperationDisplay>{operationDisplay}</OperationDisplay>
      <Display>{mainDisplay}</Display>
      <div className="buttons">
        {[...Array(10)].map((e, i) =>
          <Button className='number' key={i} onClick={() => updateDisplay(i.toString())}>{i}</Button>)
        }
        <Button className='operation' key={'x'} onClick={() => operations("*")}>*</Button>
        <Button className='operation' key={'-'} onClick={() => operations("-")}>-</Button>
        <Button className='operation' key={'+'} onClick={() => operations("+")}>+</Button>
        <Button className='number' key={'toggleNegative'} onClick={() => updateDisplay('-')}>+/-</Button>
        <Button className='number' key={'dot'} onClick={() => updateDisplay('.')}>.</Button>
        <Button className='equal' key={'='} onClick={() => operations("=")}>=</Button>
      </div>
    </>
  )
}
export default Calculator
