export interface AppState {
  items: Item[];
  clients: Client[];
  dataIsLoaded: boolean;
  posts: PostModel[],
}

export interface PostState {
  post: PostModel;
  heightChanged: (height: number) => void;
}

export interface Item {
  id: number;
  type: string;
  price: number;
  coords: Coords;
  client_id: number;
}

export interface Client {
  id: number;
  name: string;
  phone: string;
}

export interface Coords {
  lat: number;
  long: number;
}

export interface PostModel {
  userId: number;
  id: number;
  title: string;
  body: string;
  height: number;
}
