import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";

export default function Home({ results }) {
  return (
    <div className="">
      <Head>
        <title>Entertainment Hub 2.0</title>
      </Head>

      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

export async function getServerSideProps(context) {
  // get the query params when the user clicks a tab
  const genre = context.query.genre;

  // the default fetch will be fetchTrending
  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  );

  const response = await request.json();

  return {
    props: {
      results: response.results,
    },
  };
}
