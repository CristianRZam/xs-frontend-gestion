import { Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup } from "@angular/forms";
import { Formvalidators } from "../../../../../shared/validators/form-validators";
import { BirthRecordRequest } from "../../../../../core/domain/dtos/resquests/birth-record.request";

@Injectable({
  providedIn: "root"
})
export class FormRegisterConfig {

  public formulario!: FormGroup;

  // ================== GETTERS ==================
  get id(): AbstractControl | null { return this.formulario.get('id'); }
  get year(): AbstractControl | null { return this.formulario.get('year'); }
  get actNumber(): AbstractControl | null { return this.formulario.get('actNumber'); }

  get personName(): AbstractControl | null { return this.formulario.get('personName'); }
  get sex(): AbstractControl | null { return this.formulario.get('sex'); }

  get birthPlace(): AbstractControl | null { return this.formulario.get('birthPlace'); }
  get birthPlaceDetail(): AbstractControl | null { return this.formulario.get('birthPlaceDetail'); }
  get birthDatetime(): AbstractControl | null { return this.formulario.get('birthDatetime'); }

  get districtId(): AbstractControl | null { return this.formulario.get('districtId'); }
  get districtName(): AbstractControl | null { return this.formulario.get('districtName'); }
  get districtProvince(): AbstractControl | null { return this.formulario.get('districtProvince'); }
  get districtDepartment(): AbstractControl | null { return this.formulario.get('districtDepartment'); }

  get fatherId(): AbstractControl | null { return this.formulario.get('fatherId'); }
  get fatherName(): AbstractControl | null { return this.formulario.get('fatherName'); }
  get fatherNaturalOf(): AbstractControl | null { return this.formulario.get('fatherNaturalOf'); }
  get fatherNationality(): AbstractControl | null { return this.formulario.get('fatherNationality'); }
  get fatherOccupation(): AbstractControl | null { return this.formulario.get('fatherOccupation'); }
  get fatherAddress(): AbstractControl | null { return this.formulario.get('fatherAddress'); }

  get motherId(): AbstractControl | null { return this.formulario.get('motherId'); }
  get motherName(): AbstractControl | null { return this.formulario.get('motherName'); }
  get motherNaturalOf(): AbstractControl | null { return this.formulario.get('motherNaturalOf'); }
  get motherNationality(): AbstractControl | null { return this.formulario.get('motherNationality'); }
  get motherOccupation(): AbstractControl | null { return this.formulario.get('motherOccupation'); }
  get motherAddress(): AbstractControl | null { return this.formulario.get('motherAddress'); }

  get declarantName(): AbstractControl | null { return this.formulario.get('declarantName'); }
  get declarantDocument(): AbstractControl | null { return this.formulario.get('declarantDocument'); }

  get recordPlace(): AbstractControl | null { return this.formulario.get('recordPlace'); }
  get recordDatetime(): AbstractControl | null { return this.formulario.get('recordDatetime'); }

  get modifiedBy(): AbstractControl | null { return this.formulario.get('modifiedBy'); }

  constructor(
    private formBuilder: FormBuilder,
    private util: Formvalidators
  ) {}

  // ================== CONFIG FORM ==================
  configForm() {
    this.formulario = this.formBuilder.group({
      id: [null],
      year: [null, [this.util.onlyNumber("El año debe ser numérico")]],
      actNumber: [null],

      personName: [null],
      sex: [null],

      birthPlace: [null],
      birthPlaceDetail: [null],
      birthDatetime: [null], // Aquí puedes parsear a Date al cargar

      districtId: [1, [this.util.onlyNumber("Distrito inválido")]],
      districtName: [null],
      districtProvince: [null],
      districtDepartment: [null],

      fatherId: [null],
      fatherName: [null],
      fatherNaturalOf: [null],
      fatherNationality: [null],
      fatherOccupation: [null],
      fatherAddress: [null],

      motherId: [null],
      motherName: [null],
      motherNaturalOf: [null],
      motherNationality: [null],
      motherOccupation: [null],
      motherAddress: [null],

      declarantName: [null],
      declarantDocument: [null],

      recordPlace: [null],
      recordDatetime: [null],

      modifiedBy: [null]
    });
  }

  // ================== RETURN MODEL ==================
  assignModel(): BirthRecordRequest {
    return this.formulario.getRawValue() as BirthRecordRequest;
  }
}
