import { atom } from 'recoil';
import { useRecoilValue, useSetRecoilState, RecoilRoot } from 'recoil';

//state for user being logged in
export const admin = atom<boolean>({ key: 'admin', default: false });
