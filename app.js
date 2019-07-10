const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const apps = require('./playstore-data.js');


app.get('/apps', (req, res) => {
    const { search = "", sort, genres } = req.query

    if(sort) {
        if(!['rating', 'app'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must be one of rating or app');
        }
    }

    if(genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Must include a valid genre: Action, Puzzle, Strategy, Casual, Arcade or Card.')
        }
    }
    let results = apps
        .filter(app =>
                app
                    .App
                    .toLowerCase()
                    .includes(search.toLowerCase()));
    res 
        .json(results)

        //sorting and choosing genre not working yet
    if (sort) {
        results.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
    }  
}) 

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});