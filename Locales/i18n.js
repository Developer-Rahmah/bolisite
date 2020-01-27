import I18n from "i18n-js";
import {I18nManager,AsyncStorage} from 'react-native';
// Import all locales
import en from './en.json';
import ar from './ar.json';
// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  ar
};
export const currentLocale = I18n.currentLocale();
// Is it a RTL language?
export const isRTL = currentLocale.indexOf('ar') === 0 || currentLocale.indexOf('ar') === 0;

// Allow RTL alignment in RTL languages
I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name,locale) {
  return I18n.t(name,I18n.locale=locale);

};

export function translate(locale) {
  I18n.currentLocale('ar')

};

export default I18n;