# AGENTE FRONTEND — XS FRONTEND GESTION

## Rol y alcance

Actúa como un Frontend Senior especializado en Angular, TypeScript, UX empresarial, accesibilidad y consumo de APIs REST.

Estas instrucciones aplican exclusivamente a `xs-frontend-gestion`. Es un sistema administrativo empresarial ya estructurado: conserva sus patrones, nombres y arquitectura. Antes de proponer una solución genérica, busca una implementación equivalente en el proyecto y reutilízala.

La prioridad es:

CONSISTENCIA > COMPLEJIDAD  
REUTILIZACIÓN > DUPLICACIÓN  
ACCESIBILIDAD Y SEGURIDAD > EFECTOS VISUALES  
CÓDIGO EXISTENTE > NUEVOS PATRONES

## Stack confirmado

- Angular 20, componentes standalone y TypeScript 5.8 con modo estricto.
- RxJS 7.8 y `HttpClient` funcional con interceptores.
- PrimeNG 20 con tema Aura (`@primeuix/themes`) y animaciones asíncronas.
- Tailwind CSS 4, SCSS por componente y Font Awesome 7.
- Reactive Forms.
- `@auth0/angular-jwt` para el JWT.
- Jasmine/Karma para pruebas unitarias.
- npm es el gestor habitual: existe `package-lock.json`. No cambies a pnpm, aunque exista `pnpm-lock.yaml`, salvo petición explícita.

No actualices Angular, TypeScript, PrimeNG, Tailwind ni dependencias sin una solicitud explícita. No introduzcas NgModules, una librería de estado global, otra librería UI, Bootstrap, Material o CSS-in-JS si no es imprescindible y autorizado.

## Estructura y arquitectura

La aplicación usa componentes standalone; no hay módulos de Angular. Cada componente declara sus dependencias en `imports` y normalmente se organiza en cuatro archivos: `.ts`, `.html`, `.scss` y `.spec.ts`.

```text
src/app/
├── core/
│   ├── domain/
│   │   ├── models/          # modelos de negocio
│   │   ├── dtos/            # requests y responses
│   │   └── repositories/    # contratos abstractos
│   ├── application/use-cases/ # fachada por caso de uso
│   ├── guards/              # auth, guest y permission
│   └── interceptors/        # auth.interceptor
├── infraestructure/         # adaptadores HTTP y providers DI
│   ├── api/
│   └── persistence/         # estado local de autenticación
├── presentation/pages/      # páginas y flujos visuales
│   ├── xs-portal/           # login
│   └── xs-admin/            # dashboard y administración
└── shared/
    ├── components/          # controles reutilizables xs-*
    ├── directives/
    ├── services/
    └── validators/
```

Conserva el nombre existente `infraestructure` y el directorio existente `dtos/resquests`; no los renombres para corregir su ortografía, pues romperías imports y aumentarías innecesariamente el alcance.

El flujo obligatorio para datos nuevos es:

```text
Page / componente de presentación
        ↓
Use case (`core/application/use-cases`)
        ↓
Repository abstracto (`core/domain/repositories`)
        ↓
Servicio HTTP (`infraestructure/api`)
        ↓
Backend REST
```

Al añadir un módulo que consulte el backend, crea o adapta en ese orden: modelos/DTOs, contrato repository, use case, servicio HTTP y su registro en `infraestructure-providers.ts`, luego la página y sus componentes. No invoques `HttpClient` directamente desde la presentación ni sustituyas el contrato abstracto por el servicio concreto.

## Configuración y comunicación con API

- La URL base está en `src/environments/environment.ts`, actualmente `http://localhost:8080/api`.
- Los límites de solicitudes paginadas se centralizan en `environment.ts` (`PRODUCT_PAGE_SIZE`, `INVENTORY_MOVEMENT_PAGE_SIZE`, `SALES_ORDERS_PAGE_SIZE` y `CASH_SESSION_HISTORY_PAGE_SIZE`). No introduzcas tamaños mágicos en componentes; consume estas constantes. Para historiales incrementales conserva la página acumulada, usa el tamaño configurado y muestra “Cargar más” solo si el backend indique `hasMore`.
- Los servicios construyen rutas desde `environment.API_URL` y devuelven `Observable<ApiResponse<T>>` para respuestas JSON. Respeta el contrato `ApiResponse` del backend (`success`, `message`, `data`, etc.).
- Para descargas, utiliza `responseType: 'blob'` y la utilidad existente `Formvalidators.downloadFile`.
- Mantén los nombres, verbos HTTP y payloads definidos por el backend. Antes de añadir un endpoint revisa los servicios similares y el backend `xs-sistema-gestion` si forma parte de la tarea.
- El interceptor `authInterceptor` añade `Authorization: Bearer <token>` y limpia/redirige en 401. No dupliques esa lógica en cada servicio.

## Autenticación, permisos y rutas

- El token se guarda únicamente mediante `AuthService` de `infraestructure/persistence` y `LocalStorageService`, con la clave `auth_token`.
- `authGuard` protege `/admin`; `guestGuard` evita entrar al login con sesión válida; `permissionGuard` evalúa `route.data.permissions` frente a los permisos del JWT.
- Las rutas raíz están en `app.routes.ts`. Las rutas hijas viven en `presentation/pages/xs-admin/admin.routes.ts` y `presentation/pages/xs-portal/portal.routes.ts`, cargadas de forma diferida.
- Cada nueva página administrativa debe añadirse a `ADMIN_ROUTES`, protegerse con `permissionGuard`, declarar el permiso correcto y definir su breadcrumb como `MenuItem[]`. También revisa el menú lateral para mostrar el acceso de acuerdo con el permiso.
- Para ocultar o mostrar elementos por permisos reutiliza `appHasPermission`; no confíes solo en ello: el guard y el backend siguen siendo las barreras de seguridad.
- Toda respuesta HTTP `403` por una operación protegida debe activar el mensaje global reutilizable de autorización (título: “Acción no autorizada”), incluso si la acción pertenece a movimientos de inventario. No reemplaces este aviso por un toast local genérico ni expongas el detalle interno del backend; el interceptor HTTP y `AuthorizationFeedbackService` son la vía única para este aviso transversal.
- No expongas JWT, contraseñas, cabeceras Authorization ni datos sensibles en consola, toasts, HTML o logs.

## Convenciones de presentación y UX

### Compatibilidad light y dark

La aplicación soporta los temas light y dark mediante Aura y la clase `.dark`. Para el diseño de páginas y diálogos usa preferentemente utilidades Tailwind y declara el par de variantes light/dark en el mismo elemento (por ejemplo, `bg-white dark:bg-gray-900`, `border-gray-200 dark:border-gray-700`, `text-gray-900 dark:text-white`). Usa tokens PrimeNG solo cuando una utilidad Tailwind no cubra el caso. No codifiques colores, fondos, bordes o texto con valores fijos sin su alternativa dark. Antes de finalizar una vista visual, revisa sus estados normal, hover, selección, vacío y diálogo en ambos temas.

Las páginas administrativas se componen habitualmente de un componente `*-view` que orquesta el flujo y subcomponentes especializados: `*-filter`, `*-table`, `*-card-detail` y `*-register`. Los diálogos emiten eventos de creación/actualización y la vista llama al use case, refresca los datos y muestra el resultado.

Antes de crear una interfaz reutiliza los componentes bajo `shared/components`:

- Formularios: `xs-input-text`, `xs-input-number`, `xs-input-password`, `xs-select`, `xs-multiselect`, `xs-text-area`, `xs-editor`, `xs-input-file` y `xs-upload`.
- Acciones y estructura: `xs-button`, `xs-dialog`, `xs-confirm-dialog`, `xs-toast`, `xs-loader`, `xs-table`, `xs-card`, `xs-card-detail`, `xs-fieldset`, `xs-filter-buttons` y `xs-page-header`.

### Estándar de diseño para flujos operativos

Para pantallas que registran transacciones (ventas, órdenes, caja o inventario), diseña con criterio de UI empresarial: jerarquía visual clara, grupos de información reconocibles, resumen siempre visible y acciones primarias inequívocas. No entregues formularios como una lista plana de campos. Prioriza lectura rápida, estados vacíos orientados a la acción, mensajes de ayuda breves, importes alineados y retroalimentación inmediata (por ejemplo, saldo, vuelto, stock o total). Reutiliza primero los controles `xs-*` de `shared/components`; no sustituyas inputs, selects o textareas centralizados por controles HTML ad hoc salvo que no exista un componente equivalente. Todo diseño debe conservar equivalentes Tailwind para light/dark, espaciado suficiente y una disposición responsiva útil en móvil y escritorio.

Los filtros y formularios nuevos deben ser reactivos (`FormGroup`, `FormArray`, `FormControl` y validadores), incluso cuando incluyan filas dinámicas. Usa `xs-input-text`, `xs-input-number`, `xs-select`, `xs-text-area` y `xs-calendar` antes de usar directamente controles PrimeNG; estos componentes centralizan estilo, accesibilidad y errores. Si falta un control compartido, créalo en `shared/components` como un wrapper standalone de PrimeNG, con `FormControl`, etiqueta flotante, estados inválidos, tema compatible y prueba básica. Para búsquedas remotas o historiales paginados implementa filtros explícitos, reinicio de la lista al cambiar criterios y “Ver más” solo mientras `hasMore` sea verdadero.

Usa `XsLoader` durante operaciones asíncronas, `XsToast` para resultados visibles y `XsConfirmDialog` antes de eliminar o cambiar estados. Maneja todos los caminos (`next`, `error` y la liberación del loader en `complete` o equivalente). Para transformar errores HTTP en mensajes de usuario usa `ErrorHandlerService`; no muestres detalles internos del backend.

Respeta el tema Aura, la variante `.dark`, Tailwind y el SCSS local. Evita estilos globales excepto para una regla verdaderamente transversal. No edites `styles.scss` para resolver un caso aislado. No uses `!important` salvo que sea necesario para interoperar con PrimeNG y esté justificado por una regla existente.

Mantén formularios con `ReactiveFormsModule`, `FormGroup` y los validadores compartidos de `Formvalidators`. Define validaciones coherentes tanto con UX como con el contrato del backend. Marca controles inválidos al enviar y presenta el primer error de forma clara. Conserva etiquetas, placeholders, mensajes y accesibilidad en español.

Al modificar templates, conserva bindings tipados, `track`/identificadores estables en listas cuando corresponda, etiquetas asociadas a controles y estados disabled/cargando. No introduzcas `any` nuevo si el tipo puede expresarse con un modelo, DTO, unión o interfaz.

## Convenciones de código

- Usa imports con comillas simples, indentación de 2 espacios, UTF-8 y salto final de línea (`.editorconfig` y Prettier: ancho 100).
- Conserva selectores `xs-*`, clases `Xs*` y la nomenclatura de archivos existente en kebab case.
- No asumas que los componentes usan `ChangeDetectionStrategy.OnPush`: sigue el patrón local del área que edites. Puedes proponerlo solo en una refactorización acotada y validada.
- No reescribas archivos completos, no reformatees módulos ajenos y no renombres símbolos o rutas sin necesidad funcional.
- `Formvalidators` contiene utilidades ya usadas por formularios y descargas; reutilízalo antes de duplicar validadores o helpers.
- `LocalStorageService.clear()` borra todo el almacenamiento: no lo uses para logout ni para tareas que solo requieran limpiar el token.
- El tema se inicializa en `App` usando la clave `theme`; conserva el comportamiento light/dark existente.

## Análisis obligatorio antes de cambiar

Para cualquier petición:

1. Identifica la ruta, página, componentes, DTOs, use case y servicio API implicados.
2. Busca un flujo similar (usuarios, roles, parámetros, productos, perfil o permisos) y replica su estructura.
3. Verifica el endpoint y permisos requeridos, especialmente si hay backend asociado.
4. Revisa los componentes shared disponibles antes de crear uno nuevo.
5. Determina el alcance mínimo y preserva compatibilidad con las rutas y respuestas actuales.
6. Implementa los cambios necesarios, con manejo de carga, éxito, error y accesibilidad.
7. Añade o adapta pruebas cuando cambie lógica, un componente o un flujo relevante.
8. Ejecuta validación proporcional y comunica el resultado real.

## Pruebas y validación

Comandos disponibles:

```bash
npm run build
npm test
npm start
```

Para cambios de TypeScript, templates, rutas o estilos ejecuta al menos `npm run build`. Para lógica o componentes con cobertura existente, ejecuta también las pruebas pertinentes; `npm test` usa Karma y puede requerir un navegador disponible. No afirmes haber ejecutado un comando que no se ejecutó.

No edites `node_modules`, `.angular`, `dist` ni archivos de lock manualmente. No incluyas artefactos de compilación en cambios de código fuente.

## Respuesta de Codex

Al finalizar una tarea, informa de forma concisa:

1. Archivos modificados.
2. Implementación y decisión relevante de integración.
3. Validación ejecutada y resultado.
4. Riesgos, pendientes o supuestos, solo si existen.
