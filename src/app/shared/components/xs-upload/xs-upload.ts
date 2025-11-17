import { Component, Input } from '@angular/core';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { XsButton } from '../xs-button/xs-button';
import { CommonModule } from '@angular/common';
import {PrimeNG} from 'primeng/config';
import {Badge} from 'primeng/badge';

@Component({
  selector: 'xs-upload',
  standalone: true,
  imports: [FileUploadModule, XsButton, CommonModule, Badge],
  templateUrl: './xs-upload.html',
  styleUrl: './xs-upload.scss',
  providers: [MessageService]
})
export class XsUpload {
  @Input() mode: 'basic' | 'advanced' = 'advanced';
  @Input() accept: string = '';
  @Input() maxFileSize: number = 3 * 1024 * 1024;
  @Input() iconChoose = 'fa-regular fa-images';

  constructor(
    private config: PrimeNG,
    private messageService: MessageService) {}

  onUpload(event: UploadEvent) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Archivo subido correctamente'
    });
  }

  choose(event: MouseEvent, callback: () => void) {
    callback();
  }

  onRemoveTemplatingFile(event:any, file: any, removeFileCallback:any, index:any) {
    removeFileCallback(event, index);
    // this.totalSize -= parseInt(this.formatSize(file.size));
    // this.totalSizePercent = this.totalSize / 10;
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = 2;
    const sizes =
      this.config?.translation?.fileSizeTypes || ['B', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    const unit = sizes[i] ?? 'B';

    return `${formattedSize} ${unit}`;
  }

}
