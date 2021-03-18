import React, {Component} from 'react';

class MiComponente extends Component{

    render(){
        let receta = {
            nombre: "Pizza",
            ingredientes: ['Tomate', 'Queso', 'Jamon York'],
            calorias: 400
        };
        return(
            //Se puede hacer dentro de un div o de un React.Fragment
            <div className="mi-componente">
                <h1>{'Nombre: ' + receta.nombre}</h1>
                <h2>{'Calorias: ' + receta.calorias}</h2>
                <ol>
                    {
                        //Es lo mismo que un for each
                        receta.ingredientes.map((ingrediente, i) => {
                            return (
                                //key sirve para identificar los elementos que se tienen que actualizar dinamicamente
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            )
                        })
                    }
                </ol>
                <hr/>
            </div>

        );
    }

}

export default MiComponente;