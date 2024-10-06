import axios from "axios";

const accessKey = "1gIVIxzxLHTsUa4ePPB1HgijWCWZQL8olEwVfgd2_gc";

export default async function searchPhotos(topic, page) {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
    params: {
      query: topic,
      page,
      per_page: 12,
    },
  });
  return {
    images: response.data.results,
    totalPages: response.data.total_pages,
  };
}
