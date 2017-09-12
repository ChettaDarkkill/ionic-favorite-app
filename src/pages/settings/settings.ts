import { Component } from '@angular/core';
import { Toggle } from 'ionic-angular';
import { SettingService } from '../../services/settings';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    private settingService: SettingService){}

  onToggle(toggle: Toggle) {
    this.settingService.setBackground(toggle.checked); 
  }

  checkAltBackground() {
    return this.settingService.isAltBackground();
  }

}
