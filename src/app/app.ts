import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { XsLogin } from "./presentation/pages/xs-login/xs-login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, XsLogin],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  
}
