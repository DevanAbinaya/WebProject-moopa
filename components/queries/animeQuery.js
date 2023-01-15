import { gql } from '@apollo/client';

// define GraphQL query
export const ANIME_QUERY = gql`
query ($id: Int, $page: Int, $perPage: Int, $search: String, $sort: [MediaSort]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total 
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media(id: $id, search: $search, sort: $sort) {
      id
      idMal
      title {
        romaji
      }
      coverImage {
        large
      }
      description
      type
      popularity
      averageScore
    }
  }
}
`;