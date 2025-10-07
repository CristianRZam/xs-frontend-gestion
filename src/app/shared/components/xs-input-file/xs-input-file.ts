import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { XsButton } from '../xs-button/xs-button';

@Component({
  selector: 'xs-input-file',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    XsButton
  ],
  templateUrl: './xs-input-file.html',
  styleUrls: ['./xs-input-file.scss']
})
export class XsInputFile implements OnInit {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = 'Ningún archivo seleccionado';
  @Input() accept: string = '*/*';
  @Input() id: string = '';

  @Input() maxFileSize: number = 10 * 1024 * 1024;

  @Output() fileSelected = new EventEmitter<File | null>();
  @Output() onDownload = new EventEmitter<string>();
  @Output() fileTooLarge = new EventEmitter<number>();

  file: File | null = null;
  fileName: string = '';
  disabled = false;

  public objectFn = Object;

  ngOnInit(): void {
    if (!this.id) {
      this.id = `xs-input-file-${Math.floor(Math.random() * 100000)}`;
    }
    this.control.updateValueAndValidity();

    if (this.control.value && typeof this.control.value === 'string') {
      // El backend ya devuelve el nombre del archivo directamente
      this.fileName = this.formatName(this.control.value);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];

      if (selectedFile.size > this.maxFileSize) {
        this.clearFile();
        this.fileTooLarge.emit(selectedFile.size);
        return;
      }

      this.file = selectedFile;
      this.fileName = this.formatName(this.file.name);

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

  downloadFile() {
    this.onDownload.emit(this.control.value);
  }

  private formatName(name: string): string {
    const maxLength = 20;
    if (name.length > maxLength) {
      const ext = name.split('.').pop();
      const base = name.substring(0, maxLength - (ext?.length ?? 0) - 3);
      return `${base}...${ext}`;
    }
    return name;
  }
}
