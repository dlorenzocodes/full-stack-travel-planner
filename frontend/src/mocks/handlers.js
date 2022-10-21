import { rest } from "msw";

export const handlers = [
  rest.get("/places/recomendations", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          geonames: [
            {
              toponymName: "Miami",
              countryName: "United States",
            },
            {
              toponymName: "Tampa",
              countryName: "United States",
            },
          ],
        },
        [
          {
            name: "Panera",
            vicinity: "697 Spring Street",
          },
          {
            name: "Art Gallery",
            vicinity: "9857 Lincoln Ave",
          },
        ],
      ])
    );
  }),
];
