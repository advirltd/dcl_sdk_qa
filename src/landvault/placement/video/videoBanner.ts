// 'https://player.vimeo.com/external/552481870.m3u8?s=c312c8533f97e808fccc92b0510b085c8122a875'

export class VideoBanner extends Entity {

  private readonly path: string
  private readonly transform: Transform

  private readonly videoClip: VideoClip
  private readonly videoTexture: VideoTexture
  private readonly material: Material

  public textureID: string

  constructor(pathToVideo: string, transform: Transform) {
    super()

    this.path = pathToVideo
    this.transform = transform

    this.videoClip = new VideoClip(this.path)
    this.videoTexture = new VideoTexture(this.videoClip)
    this.material = new Material()
    this.textureID = this.videoTexture.videoClipId

    log('VideoClipID: ' + this.textureID)

    this.setUpMaterial()
    this.spawn()
  }

  play() {
    this.videoTexture.loop = true
    this.videoTexture.play()
  }

  private setUpMaterial() {
    this.material.albedoTexture = this.videoTexture
    this.material.roughness = 1
    this.material.specularIntensity = 0
    this.material.metallic = 0
  }

  private spawn() {
    this.addComponent(new PlaneShape())
    this.addComponent(new Transform(this.transform))
    this.addComponent(this.material)

    this.addComponent(
      new OnPointerDown(() => {
        this.videoTexture.playing = !this.videoTexture.playing
      })
    )

    engine.addEntity(this)
  }
}
