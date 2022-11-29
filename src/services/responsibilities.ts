import { Responsibility } from '../entities/responsibilities';
import { Category } from './../entities/categories';
import { User } from './../entities/users';
import { computeXWeekAgo } from './../utils/date';

export const computeNextResponsibilitiesForUsers = (
  previousResponsibilities: Responsibility[],
  users: User[],
  categories: Category[]
): Responsibility[] => {
  if (users.length === 0 || categories.length === 0) {
    return [];
  }
  if (previousResponsibilities.length === 0) {
    return categories.map((category, index) => ({
      referent: users[index],
      category,
      lastAffectDate: computeXWeekAgo(0)
    }));
  }

  const responsibilities: Responsibility[] = previousResponsibilities
    .sort((a, b) => new Date(a.lastAffectDate).getTime() - new Date(b.lastAffectDate).getTime())
    .slice(0, categories.length)
    .map((responsibility) => ({ ...responsibility, lastAffectDate: computeXWeekAgo(0) }));
  return responsibilities;
};
