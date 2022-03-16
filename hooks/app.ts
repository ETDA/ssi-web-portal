import {wrapProperty} from "@nuxtjs/composition-api";
import AppRepository from "~/repositories/AppRepository";

// @ts-ignore
export const useApp: () => AppRepository = wrapProperty('$app', false)

// @ts-ignore
export const useAuth: () => AuthRepository = wrapProperty('$auth', false)

// @ts-ignore
export const useCookies: () => any = wrapProperty('$cookies', false)
