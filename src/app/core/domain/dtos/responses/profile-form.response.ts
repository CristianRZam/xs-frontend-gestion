import {ProfileDto} from './profile-dto';
import {ParameterModel} from '../../models/parameter.model';

export interface ProfileFormResponse {
  user?: ProfileDto;
  documentTypes: ParameterModel[];
}
