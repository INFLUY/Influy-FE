export interface BaseLinkType {
  linkName: string;
  link: string;
}

export interface LinkType extends BaseLinkType {
  id?: number;
}
