export interface CatalogConfigRequest {
  id?: number;

  name?: string;
  active?: boolean;

  // PORTADA
  showCover?: boolean;
  coverImage?: string | null;

  // ENCABEZADO
  showHeader?: boolean;
  headerImage?: string | null;

  // VISTA PRODUCTOS
  viewMode?: 'GRID' | 'LIST' | 'TABLE';
  columns?: number;

  // CONTENIDO
  showImage?: boolean;
  showPrice?: boolean;
  showPricePromo?: boolean;
  showDescription?: boolean;
  showCode?: boolean;
  cardBorder?: boolean;
  showStatus?: boolean;

  // PAGINACIÓN
  productsPerPage?: number;
  showPageNumber?: boolean;
  showFooter?: boolean;
}
