import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllow, setnumberAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [Password, setPassword] = useState("")

  // Useref hooks
  const PasswordRef = useRef(null)

  const passwordGenarator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllow){
      str+="0123456789"
    }
    if(charAllow){
      str+="!@#$%^&*()_+={}[]~"
    }
    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)  
    }
    setPassword(pass)

  } , [length , numberAllow , charAllow ,
  setPassword])

  const copypass = useCallback(()=>{
    PasswordRef.current?.select()
    // PasswordRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(Password)},[Password])

  useEffect(()=>{passwordGenarator()}, [length,numberAllow,charAllow,passwordGenarator])

  

  return (
    <>
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  text-orange-500
   bg-gray-700">Passwords
   <div className='flex- shadow rounded-lg overflow-hidden mb-4'>
    <input type="text"
    value={Password}
    className=''
    placeholder=' Enter Your Password'
    readOnly
    ref={PasswordRef}
    />
    <button
    onClick={copypass}>Copy</button>

   </div>

   <div>
    <div>
      <input type="range" min={8} max={20} value={length} 
      className='cursor-pointer'
      onChange={(e)=>{setlength(e.target.value)}} />
      <label>Length: {length}</label>
    </div>
    <div>
      <input type="checkbox"
      defaultChecked = {numberAllow}
      id='numberInput'
      onChange={() =>{ 
        setnumberAllow((prev)=> !prev);
      } } />
      <label htmlFor="numberInput">Number</label>

      <input type="checkbox"
      defaultChecked = {charAllow}
      id='numberInput'
      onChange={() =>{ 
        setcharAllow((prev)=> !prev);
      } } />
      <label htmlFor="numberInput">Character</label>
    </div>
   </div>
   </div>


      
    </>
  )
}

export default App
