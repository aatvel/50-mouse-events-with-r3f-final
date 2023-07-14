import { create } from "zustand";

export const useheadPositionStore = create((set) => ({
  posX: 0,
  posY: 0,
  posZ: 0,
  changeHeadPosX: (posX) => set(() => ({ posX: posX })),
  changeHeadPosY: (posY) => set(() => ({ posY: posY })),
  changeHeadPosZ: (posZ) => set(() => ({ posZ: posZ })),
}));
