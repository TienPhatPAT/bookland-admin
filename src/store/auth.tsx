import { getAccessTokenFromLS } from "@/utils/auth";
import { atom } from "jotai";

export const isLoggedAtom = atom(!!getAccessTokenFromLS());
