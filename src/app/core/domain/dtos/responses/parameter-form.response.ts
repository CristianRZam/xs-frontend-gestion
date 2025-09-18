import {ParameterModel} from '../../models/parameter.model';

export interface ParameterFormResponse {
  parameter?: ParameterModel;
  types?: ParameterModel [];
}
