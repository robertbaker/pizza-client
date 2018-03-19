export interface IRemovable {
  removed?: boolean;
}

export interface IListItem extends IRemovable {
  id: number;
  name: string;
  description?: string;
}
