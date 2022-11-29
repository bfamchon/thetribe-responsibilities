import { Category } from './categories';
import { User } from './users';

export type Responsibility = {
  category: Category;
  referent: User;
  lastAffectDate: string;
};
