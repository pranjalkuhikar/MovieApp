import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmYwMWVhY2M0YzY2OWFkYTQwZWUzODQ5MTRkMmE3MSIsInN1YiI6IjY1ZTg1N2JhYzE1Zjg5MDE4NjE3NGE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nqc4FSu29lcri5FrGvxruCkEBd2zHqvPtFu6vdwYlVc",
  },
});

export default instance;
