import api from "../axios/index";
import { country } from "../endpoints/index";

export const getCountryList = (searchtext = "") => {
  const url = searchtext ? `${country}/name/${searchtext}` : `${country}/all`;
  const options = {
    verb: "get",
    params: { cancellable: api.blockDuplicateRequest("CountrySearch") },
  };
  return { url, options };
};
