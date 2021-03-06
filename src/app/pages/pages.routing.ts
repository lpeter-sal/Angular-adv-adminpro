import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';


const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', component: DashboardComponent, data: { titulo: 'Dashboard' }},
            {path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
            {path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráficas' }},
            {path: 'account-settings', component: AccountSettingComponent, data: { titulo: 'Configuraciones' }},
            {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            {path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
            {path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},

            //Mantenimientos
            {path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' }},
            {path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' }},
            {path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos de aplicaciones' }}
        ]
    }
];

@NgModule({
  imports: [ 
    RouterModule.forChild( routes )
  ],
  exports: [ 
    RouterModule
  ]
})
export class PagesRoutingModule { }