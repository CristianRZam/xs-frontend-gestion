import {PersonModel} from '../../models/person.model';


export interface ProfileDto {
  idUser?: number;
  username?: string;
  email?: string;
  avatarUrl?: string;
  active?: boolean;
  deleted?: boolean;
  person?: PersonModel;
  roles?: string[];
}
