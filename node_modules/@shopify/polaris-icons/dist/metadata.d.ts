export interface Icon {
  id: string;
  name: string;
  description: string;
  keywords: string[];
}

declare const metadata: {
  [iconId: string]: Icon;
};

export default metadata;