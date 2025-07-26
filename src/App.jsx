import React, { useState } from 'react'; // Importamos React y el hook useState
import './App.css'; // Importamos los estilos globales para App

function App() {
  const PATRON_PHONE = [1,2,3,4,5,6,7,8,9,0]; // Patrón de teléfono genérico
  const PATRON_NUMERICO = '61852312';
  const [patronIngresado, setPatronIngresado] = useState(''); 
  // patronIngresado es un estado que guarda el patrón que el usuario ingresa
  const [patronCorrecto, setPatronCorrecto] = useState(false);
  // patronCorrecto es un estado que indica si el patrón ingresado es correcto o no
  const [showHeartAnimation, setShowHearAnimation] = useState(false);
  // showHeartAnimation es un estado que indica si se debe mostrar la animación del corazón
  const [fadeOutHeart, setFadeOutHeart] = useState(false);
  // fadeOutHeart es un estado que indica si se debe ocultar el corazón después de la animación
  const [fadeOutEntryContent, setFadeOutEntryContent] = useState(false);
  // fadeOutEntryContent es un estado que indica si se debe ocultar el contenido de entrada después de la animación
  //funcion para manejar los clicks de los numeros 
  const handleNumeroClick = (numero) => {
    console.log(typeof numero); // Log para depuración
    console.log(`Número presionado: ${numero}`); // Log para depuración
    // 1. Evitar que el usuario siga escribiendo una vez que el patrón tiene la longitud esperada
    if (patronIngresado.length < PATRON_NUMERICO.length) {
      const nuevoPatron = patronIngresado + numero; // Concatena el nuevo número
      setPatronIngresado(nuevoPatron); // Actualiza el estado con el nuevo patrón
      
      // 2. Comprobar si el patrón ingresado es el correcto
      if (nuevoPatron === PATRON_NUMERICO) {
        // Inicia la animación de desvanecimiento del contenido de entrada
        setFadeOutEntryContent(true); 
        setTimeout(() => {
          setShowHearAnimation(true); // Muestra la animación del corazón después de un breve retraso
          setTimeout(() => {
            setFadeOutHeart(true); // Desvanece el corazón después de un breve retraso
            setTimeout(() => {
              setPatronCorrecto(true); // Si coincide, ¡actualiza el estado a correcto!
              setShowHearAnimation(false); // Oculta la animación del corazón
              setFadeOutHeart(false); // Resetea el estado de desvanecimiento del corazón
              setFadeOutEntryContent(false); // Resetea el estado de desvanec
          }, 500);
        },1500); // Espera 1.5 segundos antes de mostrar la animación del corazón
      },300); // Espera 0.3 segundos antes de iniciar la animación de desvanecimiento del contenido de entrada
    }
  }
};

  // Función para reiniciar el patrón (útil para cuando el usuario se equivoca o quiere reintentar)
  const handleReiniciarPatron = () => {
    setPatronIngresado(''); 
    setPatronCorrecto(false); 
     // Asegurarse de reiniciar también los estados de animación
    setShowHeartAnimation(false); 
    setFadeOutHeart(false);
    setFadeOutEntryContent(false);
  };


  // Aquí irá toda nuestra lógica y JSX
return (
    <div className="app-container">
      {/* Renderizado condicional principal */}
      {patronCorrecto ? ( 
        // Si patronCorrecto es TRUE, muestra la Interfaz Secreta
        <div className="interfaz-secreta fade-in-animation">
          <h2>RATILLA DE MI VIDA </h2>
          <p><strong>TE AMO MUCHO MI AMOR.</strong>  amo como me motivas crees en mi, sos el amor de mi vida vamos a ser familia
            amo tu sonrisa de picara , amo tu cara que pones cuando te emocionas.  amo lo estricta que sos, amo como comples tus metas 
            <strong>mi vida pedorrilla</strong>
          </p>
          <button onClick={handleReiniciarPatron}>Te amo</button>
        </div>
      ) : ( 
        // Si patronCorrecto es FALSE, muestra la interfaz de Entrada del Patrón o el Corazón
        <>
          {/* Interfaz de Entrada del Patrón */}
          {/* Se oculta con fadeOutEntryContent */}
          <div className={`patron-entry-container ${fadeOutEntryContent ? 'fade-out-quick-animation' : ''}`}>
            <h3>Ingresa tu numero de telefono mi amorchin ratilla</h3>
            <p className="instruccion"><strong>Patrón:</strong> {patronIngresado}</p>

            <div className="teclado">
              {PATRON_PHONE.map((numero) => (
                <button
                  key={numero} 
                  onClick={() => handleNumeroClick(numero.toString())} 
                >
                  {numero}
                </button>
              ))}
              <button onClick={handleReiniciarPatron} className="reiniciar-btn">Reiniciar</button>
            </div>

            {patronIngresado.length === PATRON_NUMERICO.length && patronIngresado !== PATRON_NUMERICO && (
              <p className="error-mensaje">Patrón incorrecto. Intenta de nuevo.</p>
            )}
          </div>

          {/* ✨ NUEVO: Contenedor para el corazón palpitante */}
          {showHeartAnimation && ( // Solo muestra este div si showHeartAnimation es true
            <div className={`heart-animation-container ${fadeOutHeart ? 'fade-out-heart-animation' : 'fade-in-heart-animation'}`}>
              <span className="heart-icon">❤️</span> {/* El emoji de corazón */}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;