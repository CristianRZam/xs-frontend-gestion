import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'xs-input-file',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule
  ],
  templateUrl: './xs-input-file.html',
  styleUrls: ['./xs-input-file.scss']
})
export class XsInputFile implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = 'Ningún archivo seleccionado';
  @Input() accept: string = '*/*';
  @Input() id: string = '';

  @Output() fileSelected = new EventEmitter<File | null>();

  file: File | null = null;
  fileName: string = '';
  disabled = false;

  public objectFn = Object;

  ngOnInit(): void {
    if (!this.id) {
      this.id = `xs-input-file-${Math.floor(Math.random() * 100000)}`;
    }
    this.control.updateValueAndValidity();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.fileName = this.file.name;

      this.control.setValue(this.file);
      this.control.markAsTouched();
      this.fileSelected.emit(this.file);
    }
  }

  clearFile() {
    this.file = null;
    this.fileName = '';
    this.control.setValue(null);
    this.control.markAsTouched();
    this.fileSelected.emit(null);
  }
}
