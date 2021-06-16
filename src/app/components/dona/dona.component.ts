import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() title: string = 'Sin titulo';

  @Input('labels') doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Mail-Order Sales'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [10, 15, 40]
  ];

  public colors: Color[] = [
    {backgroundColor: ['#6857e6', '#009fee', '#f02059']}
  ]
}

