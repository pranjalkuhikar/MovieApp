import axios from "../../Utiles/Axios";
import { loadPeople } from "../Reducers/PeopleSlice";

export const PeopleActions = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    let theUltimateDetails = {
      detail: detail.data,
      externalid: externalid.data,
      combinedCredits: combinedCredits.data,
      tvCredits: tvCredits.data,
      movieCredits: movieCredits.data,
    };

    dispatch(loadPeople(theUltimateDetails));
  } catch (error) {
    console.log(error);
  }
};
export { removePeople } from "../Reducers/PeopleSlice";
