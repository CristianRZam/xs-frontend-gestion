import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { PrimeNG } from 'primeng/config';
import { XsButton } from '../xs-button/xs-button';
import {ExistingFile} from '../../../core/domain/models/existing-file';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'xs-upload',
  standalone: true,
  imports: [FileUploadModule, XsButton, CommonModule, ImageModule],
  templateUrl: './xs-upload.html',
  styleUrl: './xs-upload.scss'
})
export class XsUpload implements OnChanges{

  @Input() existingFiles: ExistingFile[] = [];
  @Output() existingFilesRemoved = new EventEmitter<(number | string)[]>();
  @Output() mainFileChange = new EventEmitter<string | number | null>();

  private removedExistingIds: (number | string)[] = [];

  @Input() multiple = false;
  @Input() mode: 'basic' | 'advanced' = 'advanced';
  @Input() accept: string = '';
  @Input() maxFileSize = 3 * 1024 * 1024;
  @Input() iconChoose = 'fa-regular fa-images';

  @Output() filesChange = new EventEmitter<File[]>();


  ngOnChanges(changes: SimpleChanges) {
    if (changes['existingFiles']) {
      const main = this.existingFiles?.find(f => f.isMain);
      if (main) {
        this.mainFileKey = `existing:${main.id}`;
        this.mainFileChange.emit(this.mainFileKey);
      }
    }
  }

  /** 🔥 fuente única de la verdad */
  files: File[] = [];

  /** 🔥 NUEVO: key del archivo principal */
  mainFileKey: string | number | null = null;

  constructor(private config: PrimeNG) {}

  // 📌 Seleccionar archivos (ACUMULA + EVITA DUPLICADOS)
  onSelect(event: any) {
    const nuevos: File[] = Array.from(event.files || []);

    // 🔴 MODO SINGLE
    if (!this.multiple) {
      this.files = nuevos.slice(-1);
      this.filesChange.emit([...this.files]);
      return;
    }

    // 🟢 MODO MULTIPLE
    const existentes = new Set(
      this.files.map(f => `${f.name}_${f.size}_${f.lastModified}`)
    );

    const filtrados = nuevos.filter(
      f => !existentes.has(`${f.name}_${f.size}_${f.lastModified}`)
    );

    this.files = [...this.files, ...filtrados];

    // auto principal si no hay
    if (!this.mainFileKey && this.files.length) {
      this.mainFileKey = 'temp:0';
    }

    this.emitAll();
  }

  // ================= PRINCIPAL =================
  setMainFile(key: string | number) {
    this.mainFileKey = key;
    this.mainFileChange.emit(this.mainFileKey);
  }

  isMainFile(key: string | number): boolean {
    return this.mainFileKey === key;
  }

  // 📌 Abrir selector
  choose(event: MouseEvent, callback: () => void) {
    callback();
  }

  // ❌ Eliminar archivo (SINCRONIZADO + PROTEGIDO)
  onRemoveTemplatingFile(
    event: any,
    file: File,
    removeFileCallback: any,
    index: number
  ) {
    // PrimeNG (solo si existe)
    if (removeFileCallback) {
      removeFileCallback(event, index);
    }

    // Estado interno
    this.files = this.files.filter(f => f !== file);

    if (this.mainFileKey === `temp:${index}`) {
      this.mainFileKey = this.files.length ? 'temp:0' : null;
      this.mainFileChange.emit(this.mainFileKey);
    }

    // Emitir estado real
    this.filesChange.emit([...this.files]);
  }

  // ❌ Eliminar archivo existente (backend)
  removeExistingFile(file: ExistingFile) {
    this.removedExistingIds.push(file.id);
    this.existingFiles = this.existingFiles.filter(f => f.id !== file.id);

    if (this.mainFileKey === `existing:${file.id}`) {
      this.mainFileKey = null;
      this.mainFileChange.emit(null);
    }

    this.existingFilesRemoved.emit([...this.removedExistingIds]);
  }

  // 🔍 Helpers visuales
  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  formatSize(bytes: number): string {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = this.config?.translation?.fileSizeTypes || ['B','KB','MB','GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  }

  formatFileName(name: string): string {
    if (!name) return '';
    const dot = name.lastIndexOf('.');
    return dot === -1 ? name : name.substring(0, 3) + '...' + name.substring(dot);
  }

  private emitAll() {
    this.filesChange.emit([...this.files]);
    this.mainFileChange.emit(this.mainFileKey);
  }
}
