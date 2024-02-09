import { useState, useRef } from 'react'
import { FaFileUpload } from 'react-icons/fa'
import Link from 'next/link'

export function ButtonRound(props) {
  return (
    <button onClick={props.onCustomClick} className={`
      rounded-full p-4 flex items-center justify-center text-xl   
      ${props._class}
      ${props.color ?? 'bg-tile'}
      ${props.border ?? 'border-2'}
      ${props.borderColor ?? 'border-gray-300'}
      ${props.textColor ?? 'text-gray-200'}
      ${props.width ?? 'w-[70px]'} 
      ${props.height ?? 'h-[70px]'} 
    `}>
      {props.children}
    </button>
  )
}

export function Button(props) {
  const linkWrapper = (link, children) => {
    return (
      <Link href={link} className="">
        {children}
      </Link>
    )
  }

  const button = (
    <button onClick={props.onClick} type={props.type ?? 'button'} className={`
      rounded block font-semibold text-sm hover:scale-105
      ${props._class}
      ${props.width ?? 'min-w-[150px]'} 
      ${props.height ?? 'min-h-[40px]'} 
      ${props.color ?? 'bg-secondary'} 
      ${props.textColor ?? 'text-white'} 
    `}>{props.children ?? 'submit'}</button>
  )

  if (props.link) {
    return linkWrapper(props.link, button)
  }

  return button
}

export function ButtonUpload(props) {
  let previews = []

  // if component should use single file selection init var previews as array | in other case use previews from properties  
  if (!props.single && Array.isArray(props.previews)) {
    previews = props.previews
  } else if (props.single && props.previews) {
    previews = [props.previews]
  }

  const handleClear = props.clear
  const realUploadInput = useRef(null)
  const dragAndDrop = useRef(null)

  const clickRealUploadInput = (e) => {
    realUploadInput.current.click()
  }

  const renderPreviews = () => {
    if (previews.length === 0) {
      return null
    }

    return previews.map((preview, index) => (
      <div className="relative rounded mb-2 " key={index} onClick={(e) => handleClear(e, index)}>
        <img src={preview} className="object-contain max-h-[220px]" />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-rose-400/10 hover:cursor-default"></div>
      </div>
    ))
  }

  /*  document.addEventListener('drop', (e) => {
     if (e.target != dragAndDrop.current) {
       console.log('on drag zone')
       return
     }
     e.preventDefault()
   })  */

  // Files upload from "Click" event
  const changeFiles = (e) => {
    props.handle(realUploadInput.current.files)
  }

  // Files upload from "Drop" event
  const dropFiles = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    props.handle(files)
    console.log('drop')
  }

  const dragEnter = (e) => {
    e.preventDefault()
    setHover(true)
    console.log('d enter')
  }

  const dragOver = (e) => {
    e.preventDefault()
    setHover(false)
    console.log('d over')
  }

  const [isHover, setHover] = useState(false)

  return (
    <>
      <div className={`bg-inherit p-4 w-full ${props.error && 'border-red'} border border-dashed rounded hover:cursor-pointer ${isHover ? 'border-inputFocus text-inputFocus' : 'border-input text-input'}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={clickRealUploadInput}
        onDrop={dropFiles}
        onDragEnter={dragEnter}
        onDragLeave={dragOver}
        ref={dragAndDrop}
      >
        <div className={`flex items-center justify-between mb-4`}>
          <label className="pr-4 font-bolder text-right font-medium cursor-pointer">{props.children ?? 'Загрузка файлов'}</label>
          {previews.length > 0 &&
            <div onClick={clickRealUploadInput} className={`flex items-center p-5 h-[20px] text-lg font-bolder bg-white hover:bg-gray-200 rounded text-black hover:cursor-pointer`}>
              <FaFileUpload />
            </div>
          }
        </div>
        {previews.length === 0 &&
          <div className={`flex w-full items-center justify-center text-7xl mb-4 ${isHover ? 'text-inputFocus' : 'text-input'}`}>
            <FaFileUpload />
          </div>
        }
        <div className="columns-3 gap-2">
          {renderPreviews()}
        </div>

        <input type="file" onChange={changeFiles} ref={realUploadInput} multiple hidden />
      </div>
      {props.error && <div className="text-sm text-red w-full block text-left">{props.error}</div>}
    </>
  )
}

export function Input(props) {
  const inputClass = `
    mt-1 text-md shadow-[inset_2px_1px_5px_rgba(0,0,0,0.6)] border-input text-inputFocus outline-none p-2 px-4 rounded focus:bg-inputFocus focus:text-black 
    ${props.bg ?? 'bg-inputBack'}
    ${props.error ? 'border-2 border-red' : ''}
    ${props.width ?? 'w-full'}
    ${props.resize ?? props.resize}
  `

  let input = null

  if (props.type == 'textarea') {
    input = <textarea onChange={(e) => { props.handle(e.target.value) }} value={props.children} className={`${inputClass} ${props.height ?? 'h-44'}`} placeholder={props.placeholder} res/>
  } else {
    input = <input onChange={(e) => { props.handle(e.target.value) }} value={props.children} type={props.pass == true ? 'password' : 'text'} className={`${inputClass}`} autoComplete='off' placeholder={props.placeholder} />
  }

  return (
    <>
      {props.label && <label className={`text-gray-300 ${props.error && 'text-red'}`}>{props.label}</label>}
      {input}
      {props.error && <div className="text-sm text-red w-full block text-left">{props.error}</div>}
    </>
  )
}

export function InputInline(props) {
  const inputClass = `mt-1 w-full bg-inherit border border-input text-inputFocus outline-none p-2 px-4 rounded focus:bg-inputFocus focus:text-black
    ${props.error && 'border-2 border-red'}`

  return (
    <div>
      <div className="flex items-center">
        {props.children && <label className={`text-gray-300 ${props.error && 'text-red'} text-xl mr-4`}>{props.children}</label>}
        <input
          value={props.value}
          placeholder={props.placeholder ?? ''}
          onChange={e => props.handle(e.target.value)}
          type={props.pass == true ? 'password' : 'text'}
          className={`${inputClass}`}
          autoComplete="off"
        />
      </div>
      {props.error && <div className="text-sm text-red w-full block text-left">{props.error}</div>}
    </div>
  )
}

export function Label(props) {
  return (
    <div className="flex mb-2 border-b-2 border-gray-500 pb-4 items-center">
      <div>
        <div className="text-2xl font-bolder">{props.children}</div>
        <div className="text-md text-gray-400">{props.help}</div>
      </div>
      {props.button &&
        <div className="ml-auto space-x-2">
          {/* <Button width="w-40" color="bg-primary" type="submit">сохранить</Button> */}
          {props.button}
        </div>
      }
    </div>
  )
}

export function Switch(props) {
  return (
    <div>
      <div className="mb-2">Публичный просмотр</div>
      <label className="switch">
        <input type="checkbox" onChange={props.onChange} checked={props.checked} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export function Select(props) {

  return (
    <div className="inline">
      {props.children && <label className="text-gray-300 block">{props.children}</label>}
      <select className="min-w-[100px] rounded bg-inherit p-1 border border-input text-sm">
        {props.options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
