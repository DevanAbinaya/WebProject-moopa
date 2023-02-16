export async function aniListData({ req, res }, sort) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=120"
  );
  const resAnilist = await fetch(`https://graphql.anilist.co`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
            query (
      $id: Int
      $page: Int
      $perPage: Int
      $search: String
      $sort: [MediaSort]
    ) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(id: $id, search: $search, sort: $sort type: ANIME) {
          id
          idMal
          title {
            romaji
            english
          }
          coverImage {
            extraLarge
          }
          description
        }
      }
    }
  `,
      variables: {
        page: 1,
        perPage: 15,
        sort,
      },
    }),
  });
  const anilistData = await resAnilist.json();
  const data = anilistData.data.Page.media;
  // console.log(resAnilist);
  return {
    props: {
      data,
    },
  };
}
