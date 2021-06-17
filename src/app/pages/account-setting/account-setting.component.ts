import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit {

  constructor( private settigsService: SettingsService ) { }

  ngOnInit(): void {
    this.settigsService.CheckColor();
  }

  changeTheme( theme: string ) {
    this.settigsService.changeTheme( theme );
  }

}
