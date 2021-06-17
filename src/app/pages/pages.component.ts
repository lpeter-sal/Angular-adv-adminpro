import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// @ts-ignore
declare function customInitF();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private settigsService: SettingsService) { }

  ngOnInit(): void {
    customInitF();
  }

}
