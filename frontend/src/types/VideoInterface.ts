export interface VideoInterface {
  id: string;
  news_id: string;
  name: string;
  result_url: string;
  presenter_id: string;
  uploaded_time: string;
  status: string;
  webhook: string;
  created_at: Date;
  updated_at: Date;
}

export interface Script {
  type: string;
  subtitles: boolean;
  provider: ScriptProvider;
  input: string;
  ssml: boolean;
}
export interface ScriptProvider {
  type: string;
  voice_id: string;
}

export interface PresenterConfig {
  crop: Crop;
}

export interface Crop {
  type: string;
}

export interface CreateVideoPayload {
  // news_id: string;
  name: string;
  // result_url: string;
  presenter_id: string;
  //   uploaded_time: string;
  //   status: string;
  webhook: string;
  script: Script;
  presenter_config: PresenterConfig;
}
