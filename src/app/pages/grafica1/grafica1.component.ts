import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['Estable', 'En Cama', 'Grave'];
  public data1 = [
    [10, 5, 2]
  ];

  public labels2: string[] = ['En turno', 'Horario de comida', 'Por empezar turno'];
  public data2 = [
    [8, 3, 3]
  ];

  public labels3: string[] = ['En turno', 'Horario de comida', 'Por empezar turno'];
  public data3 = [
    [15, 5, 10]
  ];

  public labels4: string[] = ['Disponibles', 'Ocupados', 'Descanso'];
  public data4 = [
    [10, 7, 3]
  ];

}
