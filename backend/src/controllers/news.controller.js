import fetch from "node-fetch";
import {ApiResponse} from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const getTopHeadlines = asyncHandler(async (req, res) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
  );

  const data = await response.json();

  if (!data || data.status !== "ok") {
    throw new ApiError(500, "Failed to fetch news");
  }

  return res.status(200).json(
    new ApiResponse(200, data.articles, "News fetched successfully")
  );
});

export { getTopHeadlines };