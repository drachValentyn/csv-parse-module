const fs = require('fs');
const csv = require('csv-parser');

const dateName = Date.now();
let date_ob = new Date(dateName);
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();

const res = {};
res.data = [];

const csvParser = function (filepath) {
    fs.createReadStream(filepath)
        .on('err', (err) => console.log(err))
        .pipe(csv())
        .on('data', (data) => {
            res.data.push(data)
        })
        .on('end', () => {
            fs.writeFile(hours + '_' + minutes + '_csv_json.json', JSON.stringify(res), 'utf8', function (err) {
                if (err) throw err;
            });
            console.log('CSV file successfully processed');
        });
};

module.exports = {
    csvParser: csvParser,
}
