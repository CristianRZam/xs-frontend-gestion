export const environment = {
  production: false,
  API_URL: 'http://localhost:8080/api',
  //# Cantidad de productos por solicitud paginada.
  PRODUCT_PAGE_SIZE: 50,
  //# Cantidad de movimientos de inventario cargados por página.
  INVENTORY_MOVEMENT_PAGE_SIZE: 20,
  //# Cantidad de ventas y órdenes cargadas inicialmente y por cada "Ver más".
  SALES_ORDERS_PAGE_SIZE: 20,
  //# Cantidad de sesiones de caja cargadas inicialmente y por cada "Ver más".
  CASH_SESSION_HISTORY_PAGE_SIZE: 10,
};
