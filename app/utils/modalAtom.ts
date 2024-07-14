import { atom } from "jotai";
import { Feature } from "../types";

export const modalAtom = atom<Feature | null>(null);
