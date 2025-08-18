import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'xs-toast',
  imports: [
    ToastModule,
    ButtonModule
  ],
  providers: [MessageService], 
  templateUrl: './xs-toast.html',
  styleUrl: './xs-toast.scss'
})
export class XsToast {
  @Input() toastKey: string = 'toastKey';
  @Input() duration: number = 3000;
  @Input() position: 'bottom-left' | 'bottom-center' | 'bottom-right' |'top-left' | 'top-center' | 'top-right' | 'center'= 'top-right';


  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  show(message: string, type: 'success' | 'info' | 'warn' | 'error' | 'contrast' | 'secondary'  = 'success', title: string = 'Mensaje del sistema') {
    this.messageService.add({
      key: this.toastKey,
      severity: type,
      summary: title,
      detail: message,
      life: this.duration
    });
  }

  hide() {
    this.messageService.clear(this.toastKey);
  }
}
