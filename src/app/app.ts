import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { XsToast } from './shared/components/xs-toast/xs-toast';
import { AuthorizationFeedbackService } from './shared/services/authorization-feedback.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, XsToast],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit, AfterViewInit {
  @ViewChild('authorizationToast') private authorizationToast!: XsToast;

  constructor(private readonly authorizationFeedback: AuthorizationFeedbackService) {}

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemPrefersDark) document.documentElement.classList.add('dark');
    }
  }

  ngAfterViewInit(): void {
    this.authorizationFeedback.unauthorizedAction$.subscribe(() => {
      this.authorizationToast.show('No tienes autorización para esta acción. Es posible que tus permisos hayan sido actualizados.', 'warn', 'Acción no autorizada');
    });
  }

}
