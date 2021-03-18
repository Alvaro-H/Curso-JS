import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  public nombre: string = "";
  public apellidos: string = "";

  //Constructor de la variable que coge la info de la URL
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(){
    //Toma la informacion de la URL y la muestra
    this._route.params.subscribe((params: Params) =>{
      this.nombre = params.nombre;
      this.apellidos = params.apellidos;
    });

  }

  redireccion(){
    //Url con parametros
    this._router.navigate(['/pagina-de-pruebas', 'Alvaro', 'Huerta']);
  }
}
