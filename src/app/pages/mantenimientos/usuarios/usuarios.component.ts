import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';

import { Usuario } from '../../../models/usuario.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {


  public totalUsuarios: number = 0;
  public usuarios: Usuario [] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs!: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;


  constructor( private usuarioService: UsuarioService,
               private busquedaService: BusquedasService,
               private modalImagenService: ModalImagenService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
     this.cargarUsuarios();

     this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(
          delay(100))
        .subscribe( img =>this.cargarUsuarios());
    
  }

  cargarUsuarios() {
    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe( ({total, usuarios}) => {
        this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
      });
  }

  cambiarPagina( valor: number ){
    this. desde += valor;

    if( this.desde < 0){
      this.desde = 0;
    } else if( this.desde > this.totalUsuarios){
      this.desde -= valor; 
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {

    if(termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar( 'usuarios', termino )
        .subscribe( resp => {
          this.usuarios = resp;
        });

  }

  eliminarUsuario( usuario: Usuario) {

    if( usuario.uid === this.usuarioService.usuario.uid){
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }
   
    Swal.fire({
      title: '¿Estas seguro de borrar usuario?',
      text: `Estas apunto de borrar a ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.value) {

        this.usuarioService.eliminarUsuario( usuario )
            .subscribe( resp => {
              Swal.fire(
                  'Usuario Borrado!', 
                  `${usuario.nombre} fue eliminado correctamente`, 
                  'success');

                  this.cargarUsuarios();
              });
      }
    });

  }

  cambiarRole( usuario:Usuario ) {

    this.usuarioService.cambiarUsuario(usuario)
        .subscribe( resp => {
        })

  }

  abrirModal( usuario: Usuario ){
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
