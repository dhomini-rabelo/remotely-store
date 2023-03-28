import { atom } from 'jotai'
import { IProductData } from '../types'

export const currentPageAtom = atom<'home' | 'search' | 'product'>('home')
export const searchTextAtom = atom('')
export const activeProductAtom = atom<null | IProductData>(null)
