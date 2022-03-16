import react from 'react'

const SettingsContext = react.createContext({}); //* Aqui se esta creando el valor por defecto del contexto, en este caso un objeto vacio

/* 

//*  Context provee una forma de pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel.

//* En una aplicación típica de React, los datos se pasan de arriba hacia abajo (de padre a hijo) a través de props, pero esta forma puede resultar incómoda para ciertos tipos de props (por ejemplo, localización, el tema de la interfaz) que son necesarias para muchos componentes dentro de una aplicación. Context proporciona una forma de compartir valores como estos entre componentes sin tener que pasar explícitamente una prop a través de cada nivel del árbol.

*/

export default SettingsContext