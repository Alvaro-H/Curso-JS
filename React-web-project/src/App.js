import logo from './assets/images/logo.svg';
import './assets/css/App.css';

//Importar componentes
import MiComponente from './components/MiComponente';

function HolaMundo(nombre, edad){
  //Multiples lineas se escriben dentro de <div>
  var presentacion = (
    <div>
      <h2>Hola, soy {nombre}</h2>
      <h3>Tengo (edad) años.</h3>
    </div>
  ); 

  return presentacion;
}

function App() {
  var nombre = "Alvaro Huerta"

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hola soy Álvaro Huerta.
        </p>
        {HolaMundo(nombre, 27)}
        <section className="components">
          <MiComponente/>

        </section>
      </header>
    </div>
  );
}

export default App;
