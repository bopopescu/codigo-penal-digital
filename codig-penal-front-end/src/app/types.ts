export type Author = {
  id: number;
  firstName: string;
  lastName: string;
}

export type Title = {
  name: string;
  description: string;
}

export type Edge = {
  node: Title;
}

export type Query = {
  // posts: Post[];
  allTitles: Edge[];
}
