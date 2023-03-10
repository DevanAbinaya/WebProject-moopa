import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const Anime = ({ searchQuery = "overlord", selectedType = "ANIME" }) => {
  const ANIME_QUERY = gql`
  query ($id: Int, $page: Int, $perPage: Int, $search: String, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total 
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(id: $id, search: $search, sort: $sort, type: ${selectedType}) {
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
        bannerImage
      }
    }
  }
  `;

  // use useQuery hook to execute query and get data
  const { loading, error, data } = useQuery(ANIME_QUERY, {
    variables: {
      search: searchQuery,
      page: 1,
      perPage: 10,
      sort: "POPULARITY_DESC",
    },
  });

  // render component
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { media } = data.Page;

  // const cleanDescription = description.replace(/<br>/g, '').replace(/\n/g, '  ');

  return (
    <main className="flex flex-col">
      <div className="my-10 mx-[1rem] flex flex-col gap-10 md:mx-auto md:w-full">
        {media.map((anime) => {
          // max length desc

          const MAX_LENGTH = 350;

          const aniLink = `https://anilist.co/${anime.type
            .toString()
            .toLowerCase()}/${anime.id}`;

          function truncateDescription(description, maxLength) {
            if (description) {
              if (description.length > maxLength) {
                return (
                  description.substring(0, maxLength) +
                  `<a href="${aniLink}" class="read-more-btn text-gray-800 dark:text-gray-300 font-bold">...Read More</a>`
                );
              } else {
                return description;
              }
            } else {
              return <p>There's no Description</p>;
            }
          }

          const cleanDesc = truncateDescription(
            anime.description
              ?.replace(/<br\s*[\/]?>/gi, " ")
              .replace(/<i>/g, "<em>")
              .replace(/<\/i>/g, "</em>"),
            MAX_LENGTH
          );
          return (
            <div
              key={anime.id}
              className="mx-auto h-auto w-full max-w-md items-center overflow-hidden rounded-xl bg-white shadow-lg transition-colors duration-500  dark:bg-[#202020] md:max-w-[100rem]"
            >
              <div className="items-center md:flex ">
                <div className="relative flex justify-end md:hidden md:shrink-0">
                  <img
                    className="absolute top-[2rem] right-[1.5rem] z-10 h-[125px] w-[90px] rounded-lg object-cover shadow-xl md:hidden"
                    src={anime.coverImage.large}
                    alt={anime.title.english}
                  />
                  <img
                    className="z-0 h-[7rem] w-full object-cover blur-[1px] md:h-[312px] md:w-[224px] md:blur-none"
                    src={anime.bannerImage}
                    alt={anime.title.english}
                  />
                </div>
                <div className="relative hidden justify-end md:flex md:shrink-0">
                  <img
                    className="z-0 h-[7rem] w-full object-cover blur-[1px] md:h-[312px] md:w-[224px] md:blur-none"
                    src={anime.coverImage.large}
                    alt={anime.title.english}
                  />
                </div>

                <div className="m-5 flex flex-col gap-6 ">
                  <a
                    href={
                      "https://anilist.co/" +
                      anime.type.toString().toLowerCase() +
                      "/" +
                      anime.id
                    }
                    className="w-64 font-karla text-xl font-bold md:w-full md:text-2xl"
                  >
                    {anime.title.romaji}
                  </a>
                  <div className="text-sm md:text-xl">
                    {anime.description ? (
                      <p dangerouslySetInnerHTML={{ __html: cleanDesc }} />
                    ) : (
                      <p>No description available</p>
                    )}
                  </div>

                  <p>Popularity: {anime.popularity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Anime;
