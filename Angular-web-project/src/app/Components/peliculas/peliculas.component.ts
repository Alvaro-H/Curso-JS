import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import {Pelicula} from '../../models/pelicula';
@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck {

  public titulo: string;
  public peliculas: Pelicula[];

  constructor() {
    this.titulo = "Componente peliculas";     
    this.peliculas = [
      //Crear objetos de película
      new Pelicula("Spiderman 3", 2010, 'https://images-na.ssl-images-amazon.com/images/I/51ZBcf1Xd9L._AC_.jpg'), 
      new Pelicula ("Vengadores Endgame", 2019, 'https://images-na.ssl-images-amazon.com/images/I/81ai6zx6eXL._AC_SY879_.jpg'),
      new Pelicula ("Batman vs Superman", 2020, 'https://images-na.ssl-images-amazon.com/images/I/51Zer3hwiYL._AC_.jpg')
      //Antiguo array
      // {year: 2010, title: "Spiderman 3", image: 'https://images-na.ssl-images-amazon.com/images/I/51ZBcf1Xd9L._AC_.jpg'},
      // {year: 2019,title: "Vengadores Endgame", image: 'https://images-na.ssl-images-amazon.com/images/I/81ai6zx6eXL._AC_SY879_.jpg'},
      // {year: 2020,title: "Batman vs Superman", image: 'https://images-na.ssl-images-amazon.com/images/I/51Zer3hwiYL._AC_.jpg'}
    ];
  }

  ngOnInit(): void {
    console.log(this.peliculas);
    console.log("Componente cargado!");
  }

  ngDoCheck(){
    console.log("DoCheck Lanzado!");
  }

  cambiarTitulo(){
    this.titulo = "Nuevo titulo!";
  }

  ngOnDestroy(){
    console.log("El componente se va a eliminar");
  }

}
