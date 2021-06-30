import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUpoloadService: FileUploadService ) {

    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });


  }

  actualizarPerfil() {

    this.usuarioService.actualizarPerfil(this.perfilForm.value)
        .subscribe( () => {
          const {nombre, email} = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          Swal.fire('Actualizado con exito', 'El usuario se actualizo', 'success');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  cambiarImagen(evt:any):any {
 
    if(evt?.target?.files[0]){
 
      this.imagenSubir = evt.target.files[0];
  
      if (!evt) {
        return this.imgTemp = null;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(this.imagenSubir);
  
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    }
  }
 
  subirImagen() {
 
    this.fileUpoloadService
      .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid || '' )
      .then( img => {
        this.usuario.img = img || '';
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

}
