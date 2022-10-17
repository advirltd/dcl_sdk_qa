import { pluginData } from '../config/config'

export class WebRequestUtils {
  static resolveUrl(url: string) {
    return pluginData.proxy + url
  }

  static encodeData(data) {
    return Object.keys(data).map(function(key) {
      return [key, data[key]].map(encodeURIComponent).join('=')
    }).join('&')
  }

  static getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

}
