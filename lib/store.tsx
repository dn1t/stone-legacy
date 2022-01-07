import { atom } from 'recoil';

export const ShowPopupAtom = atom({ default: false, key: 'showPopup' });
export const PopupTitleAtom = atom({ default: '', key: 'popupTitle' });
export const PopupContentAtom = atom({ default: <></>, key: 'popupContent' });
