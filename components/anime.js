import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

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
      }
    }
  }
  `;
  

  // use useQuery hook to execute query and get data
  const { loading, error, data } = useQuery(ANIME_QUERY, {
    variables: { search: searchQuery, page: 1, perPage: 10, sort: "POPULARITY_DESC"},
  });

  // render component
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { media } = data.Page;

  // const cleanDescription = description.replace(/<br>/g, '').replace(/\n/g, '  ');

  return (
    <main className='flex flex-col'>
      <div className='flex flex-col gap-10 my-10 md:w-full md:mx-auto mx-[1rem]'>
        {media.map(anime => {
    // max length desc
  
          const MAX_LENGTH = 350;
  
          const aniLink = `https://anilist.co/${anime.type.toString().toLowerCase()}/${anime.id}`;
  
          function truncateDescription(description, maxLength) {
          if (description) {
            if (description.length > maxLength) {
              return description.substring(0, maxLength) + `<a href="${aniLink}" class="read-more-btn text-gray-800 dark:text-gray-300 font-bold">...Read More</a>`;
            } else {
              return description;
            }
          } else {
            return (
              <p>There's no Description</p>
            )
          }
            
          }
          
  
          const cleanDesc = truncateDescription(anime.description?.replace(/<br\s*[\/]?>/gi, ' ').replace(/<i>/g, '<em>').replace(/<\/i>/g, '</em>'), MAX_LENGTH);
          return (
            <div key={anime.id} className='items-center transition-colors duration-500 h-auto w-full overflow-hidden max-w-md mx-auto md:max-w-[100rem] shadow-lg rounded-xl  dark:bg-[#212121] bg-white'>
            <div className='md:flex items-center '>

              <div className='md:shrink-0 flex justify-end relative '>
                <img className='absolute h-[125px] w-[90px] md:hidden z-10 shadow-xl object-cover rounded-lg top-[2rem] right-[1.5rem]' src={anime.coverImage.large} alt={anime.title.english} />
                <img className='h-[7rem] w-full object-cover md:h-[312px] md:w-[224px] md:blur-none blur-[1px] z-0' src={anime.coverImage.large} alt={anime.title.english} />
              </div>

              <div className='flex flex-col m-5 gap-6 '>
                <a href={"https://anilist.co/"+anime.type.toString().toLowerCase()+"/"+anime.id} className='font-karla md:text-2xl text-xl md:w-full w-64 font-bold'>{anime.title.romaji}</a>
                <div className='text-sm md:text-xl'>
                  {anime.description ? <p dangerouslySetInnerHTML={{ __html: cleanDesc }} /> : <p>No description available</p>}
                </div>
  
                <p>Popularity: {anime.popularity}</p>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </main>
  );
};

export default Anime;
