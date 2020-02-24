## An simple Node and Mongo backend rest api example


### Use

Copy `.env.example` file to `.env` and fill the data. Is important to define an secure _APP_SECRET_.

Execute `npm install`.

After installation run `npm run dev`.

#### Notes

- Sentry is disable by default. To enable set `SENTRY_DSN` in environment file and uncomment sentry lines in `app.js` file.


### TODO

- Validation
- Migrate from multer to flydrive
