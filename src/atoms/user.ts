import { atom } from 'jotai';

import User from '@/models/types/user';

export const userAtom = atom<User | null>(null);