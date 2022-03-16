import { useContext, useEffect, useRef, useState } from "react"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'
import CogButton from "./CogButton"
import PauseButton from "./PauseButton"
import PlayButton from "./PlayButton"
import SettingsContext from "./SettingsContext"

const red = '#f54e4e' //* Colores definidos para utilizar dentro del componente
const green = '#4aec8c' //* Colores definidos para utilizar dentro del componente
const yellow = '#' //* Colores definidos para utilizar dentro del componente

const Timer = () => {

  const settingsInfo = useContext(SettingsContext) //* Llamado a los valores del contexto

  const [isPaused, setIsPaused] = useState(true) //* Estado de pausa o no para hacer correr el reloj 
  const [mode, setMode] = useState('break') //* Estado del modo actual, para saber si esta el reloj en modo enfoque o modo descanso
  const [secondsLeft, setSecondsLeft] = useState(0) //* Estado de los segundos faltantes

  const secondsLeftRef = useRef(secondsLeft) //* Referencias de los States
  const isPausedRef = useRef(isPaused) //* Referencias de los States
  const modeRef = useRef(mode) //* Referencias de los States

  //* Funcion que inicia el conteo de tiempo en enfoque
  
  const initTimer = () => {
    setSecondsLeft(settingsInfo.workMinutes * 60) 
  }

  //* Funcion que cambia el modo de trabajo constamente cada que el contador llegue a 0

  const switchMode = () => {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work'
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60
      
      setMode(nextMode)
      modeRef.current = nextMode

      setSecondsLeft(nextSeconds)
      secondsLeftRef.current = nextSeconds
    } 

  //* Función de conteo

  const tick = () => {
      secondsLeftRef.current--
      setSecondsLeft(secondsLeftRef.current)
  }

  //* UseEffect que se ejecuta cada vez que haces un nuevo ajuste al contexto

  useEffect(() => {

  initTimer() //* Ejecucion de la funcion que iniciar el contador

  //* Funcion que se ejecuta cada segundo, con condicional para revisar, si el estado de pausa o los segundos restantes cambia

  const interval = setInterval(() => {
      if(isPausedRef.current) { //* Si la referencia del estado de pausa es true, entonces que vuelva y ejecute la funcion hasta que no sea true
          return;
      }  
      if (secondsLeftRef.current === 0) { //* Si los segundos restantes llega a 0, que se ejecute la función switchMode() para cambiar el State de mode y secondsLeft
          return switchMode()
      }

      tick() //* Si nada de lo anterior se cumple entonces se ejecuta la funcion tick
    }, 1000) //* Y este intervalo se ejecuta cada 1s. 1000=1s, entre menos mas rapido correo el reloj

    return () => clearInterval(interval); //* Cancela una acción reiterativa(que se repite) que se inició mediante una llamada a SetInterval
  }, [settingsInfo])

  const totalSeconds = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60 //* Total de segundos calculados con los datos del contexto que son condicionales al modo en el que se este trabajando siendo multipiplicados para poder ser pasados a segundos. Ej: 25min * 60s = 1500s
  const percentage = Math.round(secondsLeft / totalSeconds * 100) //* Constante declarada para poder mostrar el porcentaje correspondiente en la barra de progeso. Se utiliza Math.round() para redondear en caso de dar un valor decimal. Ej: Math.round(44.52) = 45

  const minutes = Math.floor(secondsLeft / 60)
  let seconds = secondsLeft % 60;
  if(seconds < 10) seconds = '0'+seconds
  
  return (
    <div>
        {isPaused ? (<h1>En pausa</h1>) : mode === 'work' ? (<h1>¡Concentrate mi amor!</h1>) : <h1>Lo tas haciendo muy bien mi vida. Sigue así ❤</h1>}
        <CircularProgressbar 
        value={percentage} 
        text={minutes + ':' + seconds}
        styles={buildStyles({
            textColor: '#fff',
            pathColor: isPaused ? red : mode === 'work' ? red : green,
            tailColor:'rgba(255,255,255,0.2',
        })}/>
        <div className="container-btn">
            {isPaused 
            ? <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current = false}}/> 
            : <PauseButton onClick={() => {setIsPaused(true); isPausedRef.current = true}}/> }
        </div>
        <div className="container-cog">
            <CogButton onClick={() => settingsInfo.setSettings(true)}/>
        </div>
    </div>
  )
}

export default Timer