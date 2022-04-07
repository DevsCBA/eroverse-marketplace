import featuredCollectionImage from "../Images/fetured_collection.png";
import trending_nft1 from "../Images/trending_nft1.png";
import trending_nft2 from "../Images/trending_nft2.png";
import trending_nft3 from "../Images/trending_nft3.png";

const mockData = [
  {
    id: 1,
    name: "The Genesis Order",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Web",
    thumbnail_url: "https://steamy-1.s3.us-east-1.amazonaws.com/The%20Genesis%20Order/The-Genesis-Order-Game-Thumbnail-Image-456x308.jpg",
  },
  {
    id: 2,
    name: "Treasure of Nadia",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Web",
    thumbnail_url: "https://steamy-1.s3.us-east-1.amazonaws.com/Treasure%20of%20Nadia/Treasure-of-Nadia-Game-Thumbnail-Image-456x308.jpg",
  },
  {
    id: 3,
    name: "Lust Epidemic",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Desktop",
    thumbnail_url: "https://steamy-1.s3.us-east-1.amazonaws.com/Lust%20Epidemic/Lust-Epidemic-Thumbnail-Image-456x308.jpg",
  },
  {
    id: 4,
    name: "Big City's Pleasures",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Desktop",
    thumbnail_url: "https://steamy-1.s3.us-east-1.amazonaws.com/Big%20City%27s%20Pleasures/Big-Citys-Pleasures-Thumbnail-Image-456x308.jpg",
  },
];

const trending_nft_data = [
  {
    id: 1,
    name: "Kali Roses Common",
    release_date: "02/23/2022",
    category_name: "Celeb Love Collection 2:Kali Roses",
    is_play2earn: 0,
    platform: "Web",
    thumbnail_url: trending_nft1,
  },
  {
    id: 2,
    name: "Kali Roses Common",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Web",
    thumbnail_url: trending_nft2,
  },
  {
    id: 3,
    name: "Lust Epidemic",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Desktop",
    thumbnail_url: trending_nft3,
  },
];

const mockDataFeaturedCreators = [
  {
    id: 1,
    name: "Origin",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Web",
    thumbnail_url: "https://steamy-1.s3.us-east-1.amazonaws.com/Treasure%20of%20Nadia/Treasure-of-Nadia-Game-Thumbnail-Image-456x308.jpg",
  },
  {
    id: 2,
    name: "Origin",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Web",
    thumbnail_url: "https://steamy-1.s3.us-east-1.amazonaws.com/Treasure%20of%20Nadia/Treasure-of-Nadia-Game-Thumbnail-Image-456x308.jpg",
  },
  {
    id: 3,
    name: "Origin",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Web",
    thumbnail_url: "https://steamy-1.s3.us-east-1.amazonaws.com/Treasure%20of%20Nadia/Treasure-of-Nadia-Game-Thumbnail-Image-456x308.jpg",
  },
];

const mockDataForFeaturedCollection = [
  {
    id: 1,
    name: "Origin",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Web",
    thumbnail_url: featuredCollectionImage,
  },
  {
    id: 2,
    name: "Origin",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Web",
    thumbnail_url: featuredCollectionImage,
  },
  {
    id: 3,
    name: "Origin",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Desktop",
    thumbnail_url: featuredCollectionImage,
  },
  {
    id: 4,
    name: "Origin",
    release_date: "02/23/2022",
    category_name: "Adventure",
    is_play2earn: 0,
    platform: "Desktop",
    thumbnail_url: featuredCollectionImage,
  },
];

export { mockData, trending_nft_data, mockDataForFeaturedCollection, mockDataFeaturedCreators };
