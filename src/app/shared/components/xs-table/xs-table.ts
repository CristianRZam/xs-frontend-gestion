import { Component, ContentChild, EventEmitter, Injectable, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { XsLoader } from "../xs-loader/xs-loader";
import { XsConfirmDialog } from "../xs-confirm-dialog/xs-confirm-dialog";
import { XsToast } from "../xs-toast/xs-toast";
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { XsMultiselect } from "../xs-multiselect/xs-multiselect";
import { XsButton } from "../xs-button/xs-button";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import {XsTableColumnModel} from './xs-table.model';

@Component({
  selector: 'xs-table',
  imports: [
    CommonModule,
    XsLoader,
    XsConfirmDialog,
    XsToast,
    TableModule,
    XsMultiselect,
    ReactiveFormsModule,
    XsButton,
],
  templateUrl: './xs-table.html',
  styleUrl: './xs-table.scss',
})
export class XsTable implements OnInit {
  @Input() columns: XsTableColumnModel[] = [];
  @Input() dataSource: any[] = [];
  @Input() selectByCheckbox: boolean = false;
  @Input() title: string = '';
  @Input() showTitle: boolean = true;
  @Input() rowID: string = '';

  @ViewChild(Table) table!: Table;

  ngOnInit() {
  }
}

