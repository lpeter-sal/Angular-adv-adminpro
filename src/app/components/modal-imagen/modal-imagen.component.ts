import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any = null;

  constructor( public modalService: ModalImagenService,
               public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalService.cerrarModal();
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

    const id = this.modalService.id;
    const tipo = this.modalService.tipo;
 
    this.fileUploadService
      .actualizarFoto( this.imagenSubir, tipo , id )
      .then( img => {
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

        this.modalService.nuevaImagen.emit(img);

        this.cerrarModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

}
