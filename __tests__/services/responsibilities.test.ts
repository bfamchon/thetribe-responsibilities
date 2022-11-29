import { computeNextResponsibilitiesForUsers } from '../../src/services/responsibilities';
import { Category } from './../../src/entities/categories';
import { Responsibility } from './../../src/entities/responsibilities';
import { User } from './../../src/entities/users';
import { computeXWeekAgo } from './../../src/utils/date';

const users: User[] = [
  {
    fullName: 'John Doe'
  },
  {
    fullName: 'Jane Doe'
  },
  {
    fullName: 'Kevin Doe'
  }
];

const oneWeekAgo = computeXWeekAgo(1);
const twoWeeksAgo = computeXWeekAgo(2);
const threeWeeksAgo = computeXWeekAgo(3);
const today = computeXWeekAgo(0);

describe('when we ask for current responsibilities', () => {
  describe('and we have nobody in database', () => {
    const users: User[] = [];
    const previousResponsibilities: Responsibility[] = [];
    const categories: Category[] = [];
    it('should return an empty array', () => {
      expect(computeNextResponsibilitiesForUsers(previousResponsibilities, users, categories)).toEqual([]);
    });
  });
  describe('and we have the same amount of user than category', () => {
    it('should affect the responsibility to people who does not have done it yet', () => {
      const categories: Category[] = [
        {
          name: 'Meal'
        },
        {
          name: 'Write'
        }
      ];
      const previousResponsibilities: Responsibility[] = [
        {
          category: categories[0],
          referent: users[0],
          lastAffectDate: oneWeekAgo
        },
        {
          category: categories[1],
          referent: users[0],
          lastAffectDate: twoWeeksAgo
        },
        {
          category: categories[0],
          referent: users[1],
          lastAffectDate: twoWeeksAgo
        },
        {
          category: categories[1],
          referent: users[1],
          lastAffectDate: oneWeekAgo
        }
      ];
      const expectedResponsibilities: Responsibility[] = [
        {
          category: categories[0],
          referent: users[1],
          lastAffectDate: today
        },
        {
          category: categories[1],
          referent: users[0],
          lastAffectDate: today
        }
      ].sort((a, b) => a.category.name.length - b.category.name.length);
      const nextResponsibilities = computeNextResponsibilitiesForUsers(
        previousResponsibilities,
        users,
        categories
      ).sort((a, b) => a.category.name.length - b.category.name.length);
      expect(nextResponsibilities).toEqual(expectedResponsibilities);
    });
  });
  describe('and we have more users than categories in database', () => {
    it('should affect the responsibility to people who does not have done it yet', () => {
      const categories: Category[] = [
        {
          name: 'Meal'
        },
        {
          name: 'Write'
        }
      ];
      const previousResponsibilities: Responsibility[] = [
        {
          category: categories[0],
          referent: users[0],
          lastAffectDate: oneWeekAgo
        },
        {
          category: categories[1],
          referent: users[0],
          lastAffectDate: threeWeeksAgo
        },
        {
          category: categories[0],
          referent: users[1],
          lastAffectDate: twoWeeksAgo
        },
        {
          category: categories[1],
          referent: users[1],
          lastAffectDate: oneWeekAgo
        },
        {
          category: categories[0],
          referent: users[2],
          lastAffectDate: threeWeeksAgo
        },
        {
          category: categories[1],
          referent: users[2],
          lastAffectDate: twoWeeksAgo
        }
      ].sort((a, b) => a.category.name.length - b.category.name.length);
      const expectedResponsibilities: Responsibility[] = [
        {
          category: categories[0],
          referent: users[2],
          lastAffectDate: today
        },
        {
          category: categories[1],
          referent: users[0],
          lastAffectDate: today
        }
      ].sort((a, b) => a.category.name.length - b.category.name.length);
      expect(computeNextResponsibilitiesForUsers(previousResponsibilities, users, categories)).toEqual(
        expectedResponsibilities
      );
    });
  });
  describe('and we have more categories than users in database', () => {
    it('should affect the responsibility to people who does not have done it yet', () => {
      const categories: Category[] = [
        {
          name: 'Meal'
        },
        {
          name: 'Write'
        }
      ];
      const previousResponsibilities: Responsibility[] = [
        {
          category: categories[0],
          referent: users[0],
          lastAffectDate: oneWeekAgo
        },
        {
          category: categories[1],
          referent: users[0],
          lastAffectDate: oneWeekAgo
        }
      ].sort((a, b) => a.category.name.length - b.category.name.length);
      const expectedResponsibilities: Responsibility[] = [
        {
          category: categories[0],
          referent: users[0],
          lastAffectDate: today
        },
        {
          category: categories[1],
          referent: users[0],
          lastAffectDate: today
        }
      ].sort((a, b) => a.category.name.length - b.category.name.length);
      expect(computeNextResponsibilitiesForUsers(previousResponsibilities, users, categories)).toEqual(
        expectedResponsibilities
      );
    });
  });
  describe('and we do not have any previous responsibilities in database', () => {
    it('should initialize responsibilities to first users', () => {
      const categories: Category[] = [
        {
          name: 'Meal'
        },
        {
          name: 'Write'
        }
      ];
      const previousResponsibilities: Responsibility[] = [];
      const expectedResponsibilities: Responsibility[] = [
        {
          category: categories[0],
          referent: users[0],
          lastAffectDate: today
        },
        {
          category: categories[1],
          referent: users[1],
          lastAffectDate: today
        }
      ].sort((a, b) => a.category.name.length - b.category.name.length);
      expect(computeNextResponsibilitiesForUsers(previousResponsibilities, users, categories)).toEqual(
        expectedResponsibilities
      );
    });
  });
});
