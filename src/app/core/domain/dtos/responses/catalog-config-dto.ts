export interface CatalogConfigDTO {
  id: number;

  // GENERAL
  name: string;

  // PORTADA
  showCover: boolean;
  coverImage: string;

  // VISTA PRODUCTOS
  viewMode: string;
  columns: number;

  showImage: boolean;
  showPrice: boolean;
  showPricePromo: boolean;
  showDescription: boolean;
  showCode: boolean;

  // PAGINACIÓN
  productsPerPage: number;
  showPageNumber: boolean;
  showHeader: boolean;
  showFooter: boolean;

  // ESTADO
  active: boolean;
}
