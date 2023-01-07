import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const Anime = ({ searchQuery = "overlord" }) => {
  // define GraphQL query
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

  // use useQuery hook to execute query and get data
  const { loading, error, data } = useQuery(ANIME_QUERY, {
    variables: { search: searchQuery, page: 1, perPage: 5, sort: "POPULARITY_DESC" },
  });


  // render component
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { media } = data.Page;

  // const cleanDescription = description.replace(/<br>/g, '').replace(/\n/g, '  ');

  return (
    <div className='flex flex-col gap-10 my-10 md:w-full '>
      {media.map(anime => {
  // max length desc

        const MAX_LENGTH = 350;

        const aniLink = `https://anilist.co/${anime.type.toString().toLowerCase()}/${anime.id}`;

        function truncateDescription(description, maxLength) {
          if (description.length > maxLength) {
            return description.substring(0, maxLength) + `<a href="${aniLink}" class="read-more-btn text-gray-800 dark:text-gray-300 font-bold">...Read More</a>`;
          } else {
            return description;
          }
        }
        

        const cleanDesc = truncateDescription(anime.description?.replace(/<br\s*[\/]?>/gi, ' ').replace(/<i>/g, '<em>').replace(/<\/i>/g, '</em>'), MAX_LENGTH);
        return (
          <div key={anime.id} className='items-center h-auto w-full overflow-hidden max-w-md mx-auto md:max-w-[100rem] shadow-lg rounded-xl  dark:bg-[#212121] bg-white'>
          <div className='md:flex items-center '>
            <div className='md:shrink-0 flex justify-end relative '>
              <img className='absolute scale-50 md:hidden z-10 shadow-xl object-cover rounded-lg top-[-20px]' src={anime.coverImage.large} alt={anime.title.english} height='' />
              <img className='h-48 w-full object-cover md:h-full md:w-56 md:blur-none blur-[1px] z-0' src={anime.coverImage.large} alt={anime.title.english} />
            </div>
            <div className='flex flex-col m-5 gap-6 '>
              <a href={"https://anilist.co/"+anime.type.toString().toLowerCase()+"/"+anime.id} className='font-karla text-2xl md:w-full w-56 font-bold'>{anime.title.romaji}</a>
              {anime.description ? <p dangerouslySetInnerHTML={{ __html: cleanDesc }} /> : <p>No description available</p>}
              <p>Popularity: {anime.popularity}</p>
            </div>
          </div>
        </div>
        )
      })}
    </div>
  );
};

export default Anime;
