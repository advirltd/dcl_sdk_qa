interface GazeClickSettings {
  OccupiedMax: number;
  OccupiedMin: number;
  OutLimitMax: number;
  OutLimitMin: number;
  CenterLimitMaxY: number;
  CenterLimitMinY: number;
  CenterLimitMaxX: number;
  CenterLimitMinX: number;
  MaxRotationDifference: number;
  RenewCollectionEach: number;
}

interface PointerClickSettings {
  MaxClicksCount: number;
  ClickRechargeSeconds: number;
}

interface General {
  AdRequestGap: string;
  GazeClickSettings: GazeClickSettings;
  PointerClickSettings: PointerClickSettings;
}

interface Banners {
  RotationEnabled: boolean;
  RotationDelay: number;
  PlacementsLimit: number;
  PlacementsLimitIos: number;
  PlacementsLimitAndroid: number;
  LoadAttemptsCount: number;
  AttemptRecharge: number;
  GazeImpressionThreshold: number;
  ClickThreshold: number;
}

interface Videos {
  RotationEnabled: boolean;
  RotationDelay: number;
  PlacementsLimit: number;
  PlacementsLimitIos: number;
  PlacementsLimitAndroid: number;
  LoadAttemptsCount: number;
  AttemptRecharge: number;
  GazeImpressionThreshold: number;
  GlickThreshold: number;
}

interface SspApi {
  SspApiEndpoint: string;
  SspTestApiEndpoint: string;
  SspBanner: string;
  SspVideo: string;
  SspXraid: string;
}

interface PluginSettings {
  General: General;
  Banners: Banners;
  Videos: Videos;
  SspApi: SspApi;
}

interface ServerSettings {
  GeoService: string;
  pluginSettings: PluginSettings;
  customPopupEnable: boolean;
  customPopup?: any;
  ServerTime: Date;
}

interface Placement {
  _id: string;
  name: string;
  status: string;
}

interface Scene {
  _id: string;
  name: string;
  placements: Placement[];
}

interface Data {
  _id: string;
  name: string;
  status: string;
  serverSettings: ServerSettings;
  scenes: Scene[];
}

interface RuntimeConfig {
  data: Data;
  message: string;
  status: boolean;
}



