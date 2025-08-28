export interface XsTableColumnModel {
  field?: string;
  headerText?: string;
  headerTextAlign?: 'left' | 'center' | 'right';
  textAlign?: 'left' | 'center' | 'right';
  width?: string | null;
  minWidth?: string | null;
  displayOnInit?: boolean;
  isDefault?: boolean;
  widthColPdf?: number | null;
}

const defaults: XsTableColumnModel = {
  headerTextAlign: 'left',
  textAlign: 'left',
  width: null,
  minWidth: null,
  displayOnInit: true,
  isDefault: false,
  widthColPdf: 1,
};

export class XsTableColumn {
  constructor(options: XsTableColumnModel) {
    return { ...defaults, ...options };
  }
}
