import { FILTER_GROUPS } from '../utils/filterNames';
import type { FilterKey } from '../types/pet';

export const GENDER_OPTIONS = [
  { value: 'male' as const, label: 'Male' },
  { value: 'female' as const, label: 'Female' },
  { value: 'both' as const, label: 'Both' },
];

export const FILTER_OPTIONS = FILTER_GROUPS.map((group) => ({
  key: group.id as FilterKey,
  label: group.label,
}));
