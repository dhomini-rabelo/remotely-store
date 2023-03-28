import { atom } from 'jotai'

export const currentPageAtom = atom<'home' | 'search'>('home')
export const searchTextAtom = atom('')
