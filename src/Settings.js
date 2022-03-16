import { useContext } from "react"
import ReactSlider from "react-slider"
import BackButton from "./BackButton"
import SettingsContext from "./SettingsContext"
import './slider.css'

const Settings = () => {

    const settingsInfo = useContext(SettingsContext) //* De esta manera traemos los valores declarados en la App.js para poder utilizarlos en este componente

  return (
      <>
      <div>Ajustes</div>
      <label>Enfoque: {settingsInfo.workMinutes}:00 min</label> {/* //* Destructuracion de los values del contexto */ }
      <ReactSlider //* Componente de la dependencia react-slider para hacer una simulacion de una barra de progreso, para asi poder hacer una seleccion mas dinamica y rapida de los minutos
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={settingsInfo.workMinutes} //* Destructuracion de los values del contexto
        onChange={newMinutes => settingsInfo.setWorkMinutes(newMinutes)} //* Llamado a una funcion declara en el contexto
        min={1}
        max={60}
      />
      <label>Descanso: {settingsInfo.breakMinutes}:00 min</label> {/* //* Destructuracion de los values del contexto */ }
      <ReactSlider 
        className="slider green"
        thumbClassName="thumb"
        trackClassName="track"
        value={settingsInfo.breakMinutes} //* Destructuracion de los values del contexto
        onChange={newMinutes => settingsInfo.setBreakMinutes(newMinutes)} //* Llamado a una funcion declara en el contexto
        min={1}
        max={15}
      />
      <BackButton //* Llamado a una funcion declara en el contexto
        onClick={() => settingsInfo.setSettings(false)}  /> 
      </>
    )
}

export default Settings