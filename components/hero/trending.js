import React from "react";
import { useQuery, gql } from "@apollo/client";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

const Trending = () => {
  const ANIME_QUERY = gql`
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
        media(id: $id, search: $search, sort: $sort, type: ANIME) {
          id
          idMal
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          description
          bannerImage
          type
          popularity
          averageScore
        }
      }
    }
  `;

  // use useQuery hook to execute query and get data
  const { loading, error, data } = useQuery(ANIME_QUERY, {
    variables: {
      page: 1,
      perPage: 15,
      sort: "TRENDING_DESC",
    },
  });

  // render component
  if (loading) return <p></p>;
  if (error) return <p>Error :(</p>;

  const { media } = data.Page;

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // const cleanDescription = description.replace(/<br>/g, '').replace(/\n/g, '  ');

  return (
    <div className="relative flex items-center gap-2">
      <MdChevronLeft
        onClick={slideLeft}
        size={40}
        className="mb-5 cursor-pointer opacity-50 hover:opacity-100"
      />
      <div
        id="slider"
        className="scroll flex h-full w-full items-center gap-5 overflow-y-hidden overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
      >
        {media.map((anime) => {
          // max length desc

          const aniLink = `https://anilist.co/${anime.type
            .toString()
            .toLowerCase()}/${anime.id}`;

          const url = encodeURIComponent(
            anime.title.english || anime.title.romaji
          );

          return (
            <div
              key={anime.id}
              className="flex shrink-0 cursor-pointer items-center"
            >
              <Link href={`/himitsu?title=${url}&id=${anime.id}`}>
                <Image
                  src={anime.coverImage.large}
                  alt={anime.title.romaji || anime.title.english}
                  width={209}
                  height={300}
                  skeleton={
                    <div
                      style={{
                        backgroundColor: "lightgray",
                        width: 209,
                        height: 300,
                      }}
                    />
                  }
                  className="z-20 h-[290px] w-[209px] object-cover p-2 duration-300 ease-in-out hover:scale-105"
                />
              </Link>
            </div>
          );
        })}
      </div>
      <MdChevronRight
        onClick={slideRight}
        size={40}
        className="mb-5 cursor-pointer opacity-50 hover:opacity-100"
      />
    </div>
  );
};

export default Trending;
