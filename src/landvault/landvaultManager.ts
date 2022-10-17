import { WebRequestUtils } from './utils/webRequestUtils'
import { endpoints, pluginData } from './config/config'
import { GeoIPConfig } from './config/geoIPConfig'

export class LandVaultManager {

  public shortApiConfig: RuntimeConfig
  public geoIPConfig: GeoIPConfig

  private appId: string
  private appVersion: string
  private engine: string
  private sdkVersion: string
  private readonly sandbox: boolean

  constructor(appId: string, appVersion: string, engine: string, sdkVersion: string, onSuccess, sandbox: true) {

    this.appId = appId
    this.appVersion = appVersion
    this.engine = engine
    this.sdkVersion = sdkVersion
    this.sandbox = sandbox

    this.fetchSettings(appId, appVersion, engine, sdkVersion, onSuccess)
  }

  private fetchSettings(appId: string, appVersion: string, engine: string, sdkVersion: string, onSuccess) {
    void executeTask(async () => {
      let shortApiEndpoint = WebRequestUtils.resolveUrl(pluginData.shortAPI + endpoints.runtimeConfig)
      try {
        log('fetching runtime config')

        const response = await fetch(shortApiEndpoint, {
          headers: {
            'amx-app-id': appId,
            'amx-app-version': appVersion,
            'amx-engine': engine,
            'amx-sdk-version': sdkVersion
          },
          method: 'GET'
        })

        let res = await response.json()
        log(res)

        this.shortApiConfig = res as RuntimeConfig

        try {
          const response = await fetch(WebRequestUtils.resolveUrl(this.shortApiConfig.data.serverSettings.GeoService))
          let res = await response.json()
          log(res)

          this.geoIPConfig = res as GeoIPConfig

          onSuccess()

        } catch (e) {
          log('Failed to get GeoIp data at: ' + this.shortApiConfig.data.serverSettings.GeoService + ' .Reason: ' + e)
        }

      } catch (e) {
        log('fetchShortApi failed to reach URL: ' + shortApiEndpoint + ' .Reason: ' + e)
        return false
      }
    })
  }

  getSspApi() {
    if (this.sandbox == true) {
      return this.shortApiConfig.data.serverSettings.pluginSettings.SspApi.SspTestApiEndpoint
    } else {
      return this.shortApiConfig.data.serverSettings.pluginSettings.SspApi.SspApiEndpoint
    }
  }

}
