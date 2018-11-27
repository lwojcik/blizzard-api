/**
 * List of available locales for each region
 * via https://develop.battle.net/documentation/guides/regionality-partitions-and-localization
 */

import RegionIdProperties from '../interfaces/RegionIdProperties';
import { LocaleList } from '../types/constants';

const locales:RegionIdProperties<LocaleList> = {
  1: ['en_US', 'es_MX', 'pt_BR'],
  2: ['en_GB', 'es_ES', 'fr_FR', 'ru_RU', 'de_DE', 'pt_PT', 'it_IT'],
  3: ['ko_KR', 'zh_TW'],
  5: ['zh_CN'],
};

export default locales;
