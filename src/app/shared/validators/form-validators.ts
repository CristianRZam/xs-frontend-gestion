import { ElementRef, EventEmitter, Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
declare var require: any;
// import html2canvas from 'html2canvas';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

declare var require: any;

@Injectable({
  providedIn: "root"
})
export class Formvalidators {

  constructor(
    private domSanitizer: DomSanitizer,
  ) { }

  camelize(str: string) {
    // return CaseFormat.
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  isNullOrEmpty(str: string): boolean {
    return str == '' || str == null;
  }

  removeByAttr(arr: any, attr: any, value: any) {
    let i = arr.length;
    while (i--) {
      if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  containsObject(obj: any, arr: any) {
    let i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  }

  getArrayLabelByValue(options: any[], optionValue: string, optionLabel: string, value: number | string): string {
    return options.filter((x: any) => x[optionValue] == value)[0][optionLabel];
  }

  formatDateDDMMYYYY(date: string): string | Date {
    const dateArray = date.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    return day + '/' + month + '/' + year;
  }

  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  downloadExcelBlob(blob: Blob, filename: string) {
    const new_blob = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new_blob);
    link.download = filename + '.xlsx';
    document.body.appendChild(link);
    link.click();
  }

  downloadBlobFile(blob: Blob, type: string) {
    const _blob = new Blob([blob], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(_blob);
    link.target = '_blank';
    // link.download = 'test.pdf';
    document.body.appendChild(link);
    link.click();
  }

  printBlobFile(blob: Blob, type: string) {
    let _blob = new Blob([blob], { type: type });
    const blobUrl = URL.createObjectURL(_blob);
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = blobUrl;
    document.body.appendChild(iframe);
    iframe.contentWindow?.print();
  }

  /** Validate the text passed */
  validateText(str: string, length?: any, maxLength?: any): boolean {
    str = str ? str.toString() : "";
    if (str) {
      return !(!str.trim() ||
        str.trim() === "" ||
        (length && str.length < length) ||
        (maxLength && str.length > maxLength));

    }
    return false;
  }

  // Required validator function
  public requiredValidator(
    requiredMessage: string = "Este campo es obligatorio"
  ) {
    return (control: FormControl) => {
      const name = control.value;
      if (!name || !this.validateText(name)) {
        return {
          required: requiredMessage
        };
      }
      return null;
    };
  }

  // Max length validator function
  public maxlengthValidator(length: number, message: string = "") {
    return (control: FormControl) => {
      const name = control.value;
      if (name && !this.validateText(name, null, length)) {
        return {
          required: message
        };
      }
      return null;
    };
  }

  // Min length validator function
  public minlengthValidator(length: number, message: string = "") {
    return (control: FormControl) => {
      const name = control.value;
      if (name && !this.validateText(name, length)) {
        return {
          required: message
        };
      }
      return null;
    };
  }

  // Email form control validator function
  public emailValidator = function (message: string) {
    const reg = /^([a-zA-Z0-9_\-\.]+)@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,3})$/;
    return (control: FormControl) => {
      const name = control.value;
      if (name && !reg.test(name)) {
        return {
          email: message
        };
      }
      return null;
    };
    // const email = control.value;
    // const reg = /^([a-z0-9_\-\.]+)@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    // if (email && !reg.test(email)) {
    //   return {
    //     email: "Ingrese un email válido"
    //   };
    // }
    // return null;
  };

  // Only numeric validator
  public onlyNumber(fieldName: string = "") {
    return (control: FormControl) => {
      const name = control.value;
      const regex = /^[0-9]*$/;
      if (name && !regex.test(name)) {
        return {
          onlyNumber:
            "Ingrese un valor válido para " + fieldName + ". Solo se permiten números"
        };
      }
      return null;
    };
  }

  // Only alpha numeric hyphen validator
  public password(fieldName: string = "") {
    return (control: FormControl) => {
      const name = control.value;
      if (
        name &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]{8,50}$/.test(
          name
        )
      ) {
        return {
          password:
            fieldName +
            "Debe contener mínimo 8 y máximo 50 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
        };
      }
      return null;
    };
  }

  // PARA MOSTRAR MENSAJES DE ERROR
  obtenerControlesInvalidosFormulario(formGroup: FormGroup): FormControl[] | FormGroup[] {
    const invalid = [];
    const controls = formGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(controls[name]);
      }
    }
    return invalid as FormControl[] | FormGroup[];
  }

  obtenerPrimerMensajeErrorFormulario(formulario: FormGroup) {
    let firstInvalidElement = this.obtenerControlesInvalidosFormulario(formulario)[0] as any;
    if (firstInvalidElement.controls) {
      let firstInvalidControl = this.obtenerControlesInvalidosFormulario(firstInvalidElement)[0] as any;
      return firstInvalidControl.errors![Object.keys(firstInvalidControl.errors!)[0]];
    } else {
      return firstInvalidElement.errors![Object.keys(firstInvalidElement.errors!)[0]];
    }
  }

  standardFormSubmitEvent(formulario: FormGroup): { error: boolean, mensaje?: string } {
    if (!formulario.valid) {
      Object.keys(formulario.controls).forEach((field: any) => {
        let control: any = formulario.get(field);
        control?.markAsTouched({ onlySelf: true });
        if (control.controls) {
          Object.keys(control.controls).forEach((subField: any) => {
            control = formulario.get(field)!.get(subField);
            control?.markAsTouched({ onlySelf: true });
          });
        }
      });
      return { error: true, mensaje: this.obtenerPrimerMensajeErrorFormulario(formulario) }
    }
    return { error: false };
  }

  formatStringDateToDDMMMMYYYY(date: string): string {
    let arr = date.split('/');
    return arr[0] + ' de ' + this.monthNumberToString(Number(arr[1])).toLowerCase() + ' del ' + arr[2];
  }

  formatStringDateToMMMMYYYY(date: string): string {
    let arr = date.split('/');
    return this.monthNumberToString(Number(arr[1])).toLowerCase() + ' del ' + arr[2];
  }

  formatStringDateToDDMMMM(date: string): string {
    let arr = date.split('/');
    return arr[0] + ' de ' + this.monthNumberToString(Number(arr[1])).toLowerCase();
  }

  monthNumberToString(month: number): string {
    switch (month) {
      case 1:
        return 'Enero';
      case 2:
        return 'Febrero';
      case 3:
        return 'Marzo';
      case 4:
        return 'Abril';
      case 5:
        return 'Mayo';
      case 6:
        return 'Junio';
      case 7:
        return 'Julio';
      case 8:
        return 'Agosto';
      case 9:
        return 'Septiembre';
      case 10:
        return 'Octubre';
      case 11:
        return 'Noviembre';
      case 12:
        return 'Diciembre';
    }
    return 'Mes inválido';
  }

  urlYoutubeToFrame(url: string, responsive: boolean = false): SafeHtml {

    let _url = (url+'&').trim().replace('https://www.youtube.com/watch?v=', '');
    _url = (_url).substring(0, _url.indexOf('&'));
    let src = `https://www.youtube.com/embed/${_url}`;
    return this.domSanitizer.bypassSecurityTrustHtml(`<iframe class="${responsive ? 'xs-responsive-iframe' : 'xs-register-iframe'}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src = "${src}"> </iframe>`);
  }

  calcularEdad(date: any) {
    let hoy = new Date();
    let fechaNacimiento = new Date(date);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let m = hoy.getMonth() - fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }


  
}
