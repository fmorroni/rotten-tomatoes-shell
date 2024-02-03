const baseUrl = "https://79frdp12pn-dsn.algolia.net/1/indexes/*/queries";
const params = new URLSearchParams();
params.append(
  "x-algolia-agent",
  "Algolia for JavaScript (4.22.1); Browser (lite)",
);
params.append("x-algolia-api-key", "175588f6e5f8319b27702e4cc4013561");
params.append("x-algolia-application-id", "79FRDP12PN");

const apiUrl = `${baseUrl}?${params.toString()}`;

const reqBody = {
  requests: [
    {
      indexName: "content_rt",
      query: "",
      params:
        "filters=isEmsSearchable%20%3D%201&hitsPerPage=5&analyticsTags=%5B%22header_search%22%5D&clickAnalytics=true",
    },
  ],
};

interface MediaInfo {
  type: string;
  title: string;
  description: string;
  releaseYear: string;
  genres: Array<string>;
  runTime: {
    hours: number;
    mins: number;
  };
  rating: {
    audienceScore: number;
    criticsScore: number;
    tmScore: number;
  };
  cast: Array<string>;
}

export async function getMediaInfo(mediaTitle: string): Promise<MediaInfo> {
  reqBody.requests[0].query = mediaTitle;
  const {
    type,
    title,
    description,
    releaseYear,
    genres,
    runTime,
    rottenTomatoes,
    castCrew,
  } = (
    await (
      await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(reqBody),
      })
    ).json()
  ).results[0].hits[0];
  const hours = Math.floor(runTime / 60);
  const mins = runTime - hours * 60;
  return {
    type,
    title,
    description,
    releaseYear,
    genres,
    runTime: { hours, mins },
    rating: {
      audienceScore: rottenTomatoes.audienceScore,
      criticsScore: rottenTomatoes.criticsScore,
      tmScore: rottenTomatoes.newAdjustedTMScore,
    },
    cast: castCrew.cast,
  };
}

// const url = 'https://www.rottentomatoes.com/m/before_i_fall'

// function getInfo(mediaTitle)
// fetch(url).then(res=>res.text()).then(res=>{
//   const {mediaType, modal: {audienceScoreAll, tomatometerScoreAll}} = JSON.parse(res.match(/<script id="scoreDetails" .*?>(\{.*\})<\/script/)[1]);
//   return {
//     mediaType,
//     audienceScore: audienceScoreAll,
//     criticsScore: tomatometerScoreAll,
//   }
// }
// )
