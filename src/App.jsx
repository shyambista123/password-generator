import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setspecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("")


  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789";
    if(specialCharAllowed) str+="!@#$%^&*-_+=[](){}~`'\"";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass);
  },[length, numberAllowed, specialCharAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,40)
    window.navigator.clipboard.writeText(password)
  },[password]);

  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, specialCharAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md overflow-hidden mx-auto  shadow-md rounded-lg px-4 my-8 text-white bg-gray-700">
      <h1 className="text-white text-center my-3">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 text-black"
          placeholder="password"
          readOnly
          ref={passwordRef}
          />
          <button 
          className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0"
          onClick={copyPasswordToClipboard}
          >Copy</button>
        </div>
       <div className="flex text-sm gap-x-2 mb-4">
          <div className="flex items-center gap-x-1">
            <input 
            min={8}
            max={40}
            value={length}
            type="range" 
            className="cursor-pointer"
            onChange={e=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={()=>{
              setNumberAllowed((prev)=>!prev);
            }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            defaultChecked={specialCharAllowed}
            onChange={()=>{
              setspecialCharAllowed((prev)=>!prev);
            }}
            />
            <label>Spec Characters</label>
          </div>
       </div>
      </div>
    </>
  )
}

export default App
