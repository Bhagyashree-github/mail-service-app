import fs from 'fs';

function signup (req, res) {
    const data = req.body;
    data.time = Date.now();
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        res.send('Data written to file successfully!');

    })
}

export default { signup };