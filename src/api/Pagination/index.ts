import { Query } from "./types";
import { URL } from "url";
import { Request } from "express";
import path from "path";
import { PaginationResponse } from "~/src/common/Pagination/types";

export const getLimit = (query: Query, max: number): number => {
  let limit = max;

  if (query.limit !== undefined) {
    if (Array.isArray(query.limit) && typeof query.limit[0] === "string") {
      limit = parseInt(query.limit[0], 10);
    }

    if (typeof query.limit === "string") {
      limit = parseInt(query.limit, 10);
    }
  }

  return limit >= max ? max : limit;
};

export const getOffset = (query: Query): number => {
  let offset = 0;

  if (query.offset !== undefined) {
    if (Array.isArray(query.offset) && typeof query.offset[0] === "string") {
      offset = parseInt(query.offset[0], 10);
    }

    if (typeof query.offset === "string") {
      offset = parseInt(query.offset);
    }
  }

  return offset;
};

export const transform = (
  req: Request,
  transformedCollection: any[],
  limit: number,
  offset: number
): PaginationResponse => {
  const next = new URL(
    path.join(req.get("host") as string, req.baseUrl, req.path)
  );
  const count = transformedCollection.length;
  const response: PaginationResponse = { items: transformedCollection, count };

  if (count === limit) {
    response.next = `${req.protocol}://${next.protocol}${next.host}${
      next.pathname
    }?limit=${limit}&offset=${offset + limit}`;
  }

  return response;
};
