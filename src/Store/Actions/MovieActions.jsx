import axios from "../../Utiles/Axios";
import { loadMovie } from "../Reducers/MovieSlice";

export const MovieActions = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
    let theUltimateDetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data,
      videos: videos.data.results.find((item) => item.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
    dispatch(loadMovie(theUltimateDetails));
  } catch (error) {
    console.log(error);
  }
};
export { removeMovie } from "../Reducers/MovieSlice";
