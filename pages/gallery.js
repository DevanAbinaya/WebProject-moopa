import React, { useState, useEffect } from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import Anime from "../components/anime";
import client from "../lib/apolloClient";
import Layout from "../components/layout";

const MediaTypeSelector = ({ selectedType, onChange }) => (
  <select
    value={selectedType}
    onChange={onChange}
    className="h-8 w-20 rounded-md text-center text-gray-800 antialiased shadow-sm ring-gray-300 ring-transparent transition-all duration-300 dark:bg-[#202020] dark:text-white md:h-10 md:w-40"
  >
    <option value="ANIME">Anime</option>
    <option value="MANGA">Manga</option>
  </select>
);

export default function Gallery() {
  const [query, setQuery] = useState(null);
  const [selectedType, setSelectedType] = useState("ANIME");

  function checkSetQuery(e) {
    e.target.value == "" || e.target.value == null
      ? setQuery(null)
      : setQuery(e.target.value);
  }

  function handleTypeChange(e) {
    setSelectedType(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Moopa - Gallery</title>
        <meta name="gallery" content="Search your Anime or Manga" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/c.svg" />
      </Head>
      <Layout>
        <div className=" flex w-screen bg-[#f9f9f9] pt-[8rem] transition-all duration-500 dark:bg-[#121212] md:justify-center">
          <div className=" mx-5 flex w-screen flex-col justify-between gap-4 md:mx-0 md:w-[80%] md:flex-row">
            <input
              className="h-8 rounded-md text-center md:w-52 md:scale-100"
              placeholder="Search here..."
              onChange={checkSetQuery}
            />

            <div className="flex items-center justify-between gap-10 text-sm md:scale-100 md:text-lg">
              <h1 className="font-karla font-bold">BROWSE</h1>
              <div className="scale-[85%] md:scale-100">
                <MediaTypeSelector
                  selectedType={selectedType}
                  onChange={handleTypeChange}
                />
              </div>
            </div>
          </div>
        </div>

        <main className="flex min-h-screen w-screen items-center justify-center bg-[#F9F9F9] transition-all duration-500 dark:bg-[#121212]">
          <ApolloProvider client={client}>
            <Anime searchQuery={query} selectedType={selectedType} />
          </ApolloProvider>
        </main>
      </Layout>
    </>
  );
}
