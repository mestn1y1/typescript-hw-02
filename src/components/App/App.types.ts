export interface Image {
  id: number;
  urls: {
    regular: string;
    small_s3: string;
  };
  description?: string;
}
