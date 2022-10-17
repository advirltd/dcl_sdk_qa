import { WebRequestUtils } from '../utils/webRequestUtils'
import { LandVaultManager } from '../landvaultManager'
import { AdResponse } from './adResponse'
import { gameData, pluginData } from '../config/config'
// @ts-ignore
import * as utils from '@dcl/ecs-scene-utils'

export class BannerDimensions {

  public static sixByFive = new Vector3(6, 5, 1)
  public static sixteenByNine = new Vector3(16, 9, 1)
  public static fourByThree = new Vector3(4, 3, 1)
  public static thirtyTwoByFive = new Vector3(32, 5, 1)
  public static threeSixtyFourByFive = new Vector3(32, 5, 1)
  public static fourByFifteen = new Vector3(32, 5, 1)
  public static oneByTwo = new Vector3(32, 5, 1)
  /*

  640x360    16:9
400x300    4:3
Image Size in pixels    Aspect Ratio
300x250    6:5
320x50    32:5
728x90    364:45
160x600    4:15
300x600    1:2
970x250    97:25

   */
}


export class Banner extends Entity {
  private readonly transform: Transform
  private readonly material: Material
  private texture: Texture
  private manager: LandVaultManager

  private readonly id
  private readonly sceneId

  private adResponse: AdResponse

  private timeOnScreen = 0
  private timeInterval = 1000

  private clickComponent: OnPointerDown

  constructor(manager: LandVaultManager, transform: Transform, id: string, sceneId: string, defaultImage = '') {
    super()

    this.manager = manager
    this.transform = transform
    this.id = id
    this.sceneId = sceneId

    this.material = new Material()
    this.texture = new Texture(defaultImage)

    this.setUpMaterial()
    this.createAllComponents()
    this.refresh()
  }

  private refresh() {
    void executeTask(async () => {
      try {
        log('refresh banner: ' + this.id)

        let searchParams = this.getSearchParams()
        let query = WebRequestUtils.encodeData(searchParams)

        this.adResponse = await this.RequestNewAd(query)

        this.handleClickComponent()

        await this.ShowAd(this.adResponse)

      } catch
        (e) {
        log('failed to refresh. Reason: ' + e)
      }
    })
  }

  private handleClickComponent() {
    if (this.adResponse.dUrl) {
      if (this.clickComponent == null) {
        this.addComponent(
          this.clickComponent = new OnPointerDown(async () => {

            openExternalURL(this.adResponse.dUrl)

            for (const url in this.adResponse.extra.cliUrl) {
              await fetch(url)
            }
          })
        )
      }
    } else {
      this.removeComponent(this.clickComponent)
    }
  }

  private createAllComponents() {
    this.addComponent(new PlaneShape())
    this.addComponent(new Transform(this.transform))
    this.addComponent(this.material)

    this.addComponent(new utils.Interval(this.timeInterval, (): void => {
      if (this.manager.shortApiConfig.data.serverSettings.pluginSettings.Banners.RotationEnabled) {
        if (this.timeOnScreen >= this.manager.shortApiConfig.data.serverSettings.pluginSettings.Banners.RotationDelay) {
          this.timeOnScreen = 0
          this.refresh()
        } else {
          this.timeOnScreen += this.timeInterval / 1000
        }
      } else {
        log('Rotation is disabled from server config')
      }
    }))

    engine.addEntity(this)
  }

  private setUpMaterial() {
    this.material.albedoTexture = this.texture
    this.material.roughness = 1
    this.material.specularIntensity = 0
    this.material.metallic = 0
  }

  private async ShowAd(adResponse: AdResponse) {
    this.texture = new Texture(WebRequestUtils.resolveUrl(adResponse.aUrl))
    this.setUpMaterial()

    for (let i = 0; i < adResponse.extra.iUrl.length; i++) {
      await fetch(adResponse.extra.iUrl[i])
    }
  }

  private async RequestNewAd(params: string) {
    const url = WebRequestUtils.resolveUrl(
      this.manager.getSspApi() + this.manager.shortApiConfig.data.serverSettings.pluginSettings.SspApi.SspBanner + '?' + params)

    const response = await fetch(url, { headers: { 'tr': '1' }, method: 'GET' })
    const res = await response.json()

    return res as AdResponse
  }

  private getSearchParams() {
    let searchParams: { [id: string]: string; } = {}

    searchParams['zone'] = this.id
    searchParams['scene'] = this.sceneId
    searchParams['mt'] = 'banner'
    searchParams['ua'] = 'TODO user agent'
    searchParams['lang'] = 'TODO language'
    searchParams['os'] = 'TODO OS'
    searchParams['osv'] = 'TODO OSV'
    searchParams['dtype'] = '4'
    searchParams['idfa'] = 'TODO idfa'
    searchParams['secure'] = '1'
    searchParams['appVer'] = gameData.appVersion.toString()
    searchParams['bundle'] = gameData.bundle
    searchParams['ip'] = this.manager.geoIPConfig.query
    searchParams['country'] = this.manager.geoIPConfig.country
    searchParams['region'] = this.manager.geoIPConfig.region
    searchParams['city'] = this.manager.geoIPConfig.city
    searchParams['zip'] = this.manager.geoIPConfig.zip
    searchParams['metro'] = this.manager.geoIPConfig.metro
    searchParams['geoLat'] = this.manager.geoIPConfig.lat.toString()
    searchParams['geoLon'] = this.manager.geoIPConfig.lon.toString()
    searchParams['pver'] = pluginData.pluginVersion
    searchParams['x-engine'] = pluginData.engine

    return searchParams
  }
}
