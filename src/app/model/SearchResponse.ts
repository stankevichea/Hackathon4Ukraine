export class SearchResponse {
  public items: Item[];
}

export class Item {
  public link: string;
  public title: string;
  public snippet: string;
}
