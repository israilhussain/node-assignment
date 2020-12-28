import { NextFunction, Request, Response } from 'express';
import { createWriteStream, createReadStream } from 'fs';

const proxyStart = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send('Url is allowed because session is present');
}

const proxyGet = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send('Url is allowed because session is present');
}

const readFileContent = (req: Request, res: Response, next: NextFunction) => {
    //var filename = __dirname + req.url;
    const { id } = req.params;
    var filename = `${id}.json`

    // This line opens the file as a readable stream
    var readStream = createReadStream(filename);

    // This will wait until we know the readable stream is actually valid before piping
    readStream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(res);
    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function (err) {
        res.status(500).send(err);
    });

};

const writeFileContent = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    var filename = `${id}.json`
    const data = JSON.stringify(req.body);


    // Create a writable stream
    var writerStream = createWriteStream(filename);

    // Write the data to stream with encoding to be utf8
    writerStream.write(data, 'utf8');

    // Mark the end of file
    writerStream.end();

    // Handle stream events --> finish, and error
    writerStream.on('finish', function () {
        res.status(200).send(`Written to file ${id}.json successfully`);
    });

    writerStream.on('error', function (err) {
        res.status(500).send(err);
    });
};

export default { proxyStart, proxyGet, readFileContent, writeFileContent };
