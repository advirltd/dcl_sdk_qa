import { Banner, BannerDimensions } from './landvault/placement/banner'
import { LandVaultManager } from './landvault/landvaultManager'

// @ts-ignore
import * as utils from '@dcl/ecs-scene-utils'
import { pluginData } from './landvault/config/config'


const LV = new LandVaultManager(
  '62b46dc3e84d8a0009c9990a',
  '62c6d22c5467a90009943423',
  'decentraland',
  pluginData.pluginVersion,
  startCreateBanners, true
)

function startCreateBanners() {
  log('Created Banners')

  const staticImage = new Banner(LV,
    new Transform({
      position: new Vector3(9, 3, 9),
      rotation: Quaternion.Euler(180, 180, 0),
      scale: (BannerDimensions.sixByFive.multiplyByFloats(0.5, 0.5, 0.5))
    }), '62b48b728c935d0009d51e90', '62b48b5e30372f00098b4d78'
  )
  const staticImage1 = new Banner(LV,
    new Transform({
      position: new Vector3(3, 2, 7),
      rotation: Quaternion.Euler(180, 150, 0),
      scale: new Vector3(3, 2.5, 1)
    }), '62b48b728c935d0009d51e91', '62b48b5e30372f00098b4d78'
  )

  const staticImage2 = new Banner(LV,
    new Transform({
      position: new Vector3(15, 1, 3),
      rotation: Quaternion.Euler(180, 240, 0),
      scale: new Vector3(1.5, 1.25, 1)
    }), '62b48b728c935d0009d51e92', '62b48b5e30372f00098b4d78'
  )
}


onVideoEvent.add((data) => {
  // for (let i = 0; i < ar.length; i++) {
  //   if (data.videoClipId == ar[i].textureID) {
  //     log('id: ' + ar[i].textureID + ' status: ' + data.videoStatus)
  //     if (data.videoStatus == VideoStatus.READY) {
  //       log('play video for id: ' + ar[i].textureID)
  //       ar[i].play()
  //     }
  //   }
  // }
})
