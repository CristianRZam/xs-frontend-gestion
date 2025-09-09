import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'xs-loader',
  imports: [
    DialogModule,
    ProgressSpinnerModule
  ],
  templateUrl: './xs-loader.html',
  styleUrl: './xs-loader.scss'
})
export class XsLoader {
  public display: boolean = false;
  public title: string = 'Cargando';

  constructor() { }

  ngOnInit(): void {
  }

  show(title: string = this.title) {
    this.title = title;
    this.display = true;
  }

  hide() {
    this.display = false;
  }
}
