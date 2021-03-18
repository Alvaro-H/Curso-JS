//Importar los modulos de router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importamos componentes con página exclusiva
import { HomeComponent } from './Components/home/home.component';
import { BlogComponent } from './Components/blog/blog.component';
import { FormularioComponent } from './Components/formulario/formulario.component';
import { PeliculasComponent } from './Components/peliculas/peliculas.component';
import { PaginaComponent } from './Components/pagina/pagina.component';
import { ErrorComponent } from './Components/error/error.component';

//Array de rutas, configuracion de rutas
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'formulario', component: FormularioComponent},
    {path: 'peliculas', component: PeliculasComponent},
    //Parametro opcional
    //{path: 'pagina-de-pruebas', component: PaginaComponent},
    //Parametro obligatorio
    //{path: 'pagina-de-pruebas/:nombre', component: PaginaComponent},
    //{path: 'pagina-de-pruebas/:nombre/:apellidos', component: PaginaComponent},
    //Varios parametros obligatorios
    {path: 'pagina-de-pruebas', component: PaginaComponent},
    {path: '**', component: ErrorComponent}
];

// Exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);