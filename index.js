const express = require('express')
const app = express()
const ffmpeg = require('ffmpeg')
const fs = require('fs')
const youtubedl = require('youtube-dl')


app.get('/', (req, res) =>  {
    const path = 'video/gta.mp4'
    // try {
    //     let process = new ffmpeg(path, function (err, video) {
    //         if (!err) {
    //             console.log('The video is ready to be processed');
    //
    //             video.fnExtractSoundToMP3('convert/test.mp3', function (error, file) {
    //                 console.log(error)
    //             })
    //
    //
    //         } else {
    //             console.log('Error: ' + err);
    //         }
    //     });
    // } catch (e) {
    //     console.log(e.code);
    //     console.log(e.msg);
    // }
    res.status(200).send('<b>Test</b>')

})

app.get('/video/:videoId', (req, res) =>  {
    // dFdOSq-BJ_E
    const videoId = req.params.videoId

    const video = youtubedl('https://www.youtube.com/watch?v=' + videoId,
        // Optional arguments passed to youtube-dl.
        ['--format=18'],
        // Additional options can be given for calling `child_process.execFile()`.
        { cwd: __dirname })

// Will be called when the download starts.


    video.on('info', function(info) {
        let title = info._filename;

        video.pipe(fs.createWriteStream(''+title))
        video.on('complete', function complete(info) {
            'use strict'
            console.log('filename: ' + info._filename + ' already downloaded.')
            res.status(200).send(''+title)
        })

    })





})


app.listen(3000, () =>  {
    console.log('App running...')
})