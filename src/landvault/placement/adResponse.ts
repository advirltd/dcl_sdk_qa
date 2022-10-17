export interface Extra {
  bidId: string;
  iUrl: string[];
  gzUrl: string[];
  cliUrl: string[];
}

export interface AdResponse {
  type: string;
  tag: string;
  aUrl: string;
  dUrl: string;
  extra: Extra;
}



