import {ParameterModel} from '../../models/parameter.model';

export interface ParameterViewResponse {
  parameters: ParameterModel[];
  totalParameters: number;
  activeParameters: number;
  inactiveParameters: number;
  parametersWithParent: number;
}
