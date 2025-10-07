import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'xs-main-config',
  standalone: true,
  imports: [DrawerModule, ToggleButtonModule, FormsModule, CommonModule],
  templateUrl: './xs-main-config.html',
  styleUrls: ['./xs-main-config.scss']
})
export class XsMainConfig implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  darkMode: boolean = false;

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.setTheme(true);
    } else if (savedTheme === 'light') {
      this.setTheme(false);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(systemPrefersDark);
    }
  }


  onHide() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  setTheme(dark: boolean) {
    this.darkMode = dark;

    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }


}
