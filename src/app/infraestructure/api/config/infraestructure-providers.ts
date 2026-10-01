import { Provider } from '@angular/core';
import { AuthRepository } from '../../../core/domain/repositories/auth.repository';
import { AuthService } from '../auth.service';
import {RoleRepository} from '../../../core/domain/repositories/role.repository';
import {RoleService} from '../role.service';
import {PermissionRepository} from '../../../core/domain/repositories/permission.repository';
import {PermissionService} from '../permission.service';
import {UserService} from '../user.service';
import {UserRepository} from '../../../core/domain/repositories/user.repository';
import {ParameterService} from '../parameter.service';
import {ParameterRepository} from '../../../core/domain/repositories/parameter.repository';
import {ProfileRepository} from '../../../core/domain/repositories/profile.repository';
import {ProfileService} from '../profile.service';
import {ProductService} from '../product.service';
import {ProductRepository} from '../../../core/domain/repositories/product.repository';
import {CatalogConfigService} from '../catalogconfig.service';
import {CatalogconfigRepository} from '../../../core/domain/repositories/catalogconfig.repository';
import { DashboardRepository } from '../../../core/domain/repositories/dashboard.repository';
import { DashboardService } from '../dashboard.service';
import { CashSessionRepository } from '../../../core/domain/repositories/cash-session.repository';
import { CashSessionService } from '../cash-session.service';
import { SaleRepository } from '../../../core/domain/repositories/sale.repository';
import { SaleService } from '../sale.service';
import { InventoryCountRepository } from '../../../core/domain/repositories/inventory-count.repository';
import { InventoryCountService } from '../inventory-count.service';
import { OrderRepository } from '../../../core/domain/repositories/order.repository';
import { OrderService } from '../order.service';
import { InventoryMovementRepository } from '../../../core/domain/repositories/inventory-movement.repository';
import { InventoryMovementService } from '../inventory-movement.service';

export const infrastructureProviders: Provider[] = [
  { provide: AuthRepository, useClass: AuthService },
  { provide: RoleRepository, useClass: RoleService },
  { provide: PermissionRepository, useClass: PermissionService },
  { provide: UserRepository, useClass: UserService },
  { provide: ParameterRepository, useClass: ParameterService },
  {provide: ProfileRepository, useClass: ProfileService },
  {provide: ProductRepository, useClass: ProductService },
  {provide: CatalogconfigRepository, useClass: CatalogConfigService },
  { provide: DashboardRepository, useClass: DashboardService },
  { provide: CashSessionRepository, useClass: CashSessionService },
  { provide: SaleRepository, useClass: SaleService },
  { provide: InventoryCountRepository, useClass: InventoryCountService },
  { provide: OrderRepository, useClass: OrderService },
  { provide: InventoryMovementRepository, useClass: InventoryMovementService }
];
