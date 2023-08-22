import Display from './components/Display/Display'
import Button from './components/Button/Button'
import { useState } from 'react'

function Calculator() {
  const [DisplayValue, setDisplayValue] = useState('')
  const updateDisplay = (value: string) => setDisplayValue((v) => v + value);
  return (
    <>
      <Display>{Number.parseFloat(DisplayValue) || 0}</Display>
      <div className="buttons">
        {[...Array(10)].map((e, i) =>
          <Button className='number' key={i} onClick={() => updateDisplay(i.toString())}>{i}</Button>)
        }
        <Button className='number' key={'toggleNegative'} onClick={() => console.log("toggle")}>+/-</Button>
        <Button className='number' key={'dot'} onClick={() => updateDisplay('.')}>.</Button>
      </div>
    </>
  )
}
export default Calculator
