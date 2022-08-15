# Travel Planner Web App

A web app that allows user to plan and organize their trips.
Users will be able to search for destinations,
but creating an account will allow them to create,
edit or delete the trips whenever they are logged in.

![X - 4](https://user-images.githubusercontent.com/80544619/184674892-7545dcdf-2758-4c87-8025-e6ce70ea4f7e.png)

![ desktop ](https://user-images.githubusercontent.com/80544619/184675178-abce6dcb-dc5a-4f7d-a350-d8865f745026.png)


## Getting Started

1. Clone the repository and install dependencies

    git clone
    npm install // root directory
    cd frontend // npm install

2. Configure environment variables

Create a ```.env``` file on root and set the provider credentials.

    MONGO_URI=
    JWT_SIGNATURE=
    NODE_ENV=
    GEONAMES_USERNAME=
    GEO_API_KEY=
    GOOGLE_KEY=
    PEXIBAY_KEY=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    AWS_BUCKET_NAME=
    CLIENT_URL=
    SENDGRID_API_KEY=

3. Configure Authentication Provider

Create a firebase project, add your firebase app on 
```/frontend/src/config/intializeFirebase.js```

4. Start the application

To run locally, use: 

    npm run dev

To run in production modify your package.json based on your deployment method. 


## Built with:

    • React
    • Redux
    • Mongoose
    • MongoDB
    • MediaWiki API
    • PixaBay API
    • Google Places API
    • Geonames API
    • Ipify API
    • SendGrid
    • AWS S3
    • Firebase Auth
    • Figma

## License
For personal use only.

## Credits
Images and illustrations by Freepik.