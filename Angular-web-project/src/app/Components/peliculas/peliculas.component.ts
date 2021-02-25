import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck {

  public titulo: string;

  constructor() {
    this.titulo = "Componente peliculas";     
    console.log("CONSTRUCTOR LANZADO!");
  }

  ngOnInit(): void {
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
