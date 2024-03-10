import axios from "../../Utiles/Axios";
import { loadTv } from "../Reducers/TvSlice";

export const TvActions = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const translations = await axios.get(`/tv/${id}/translations`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    let theUltimateDetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations: translations.data,
      videos: videos.data.results.find((item) => item.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
    dispatch(loadTv(theUltimateDetails));
  } catch (error) {
    console.log(error);
  }
};
export { removeTv } from "../Reducers/TvSlice";
