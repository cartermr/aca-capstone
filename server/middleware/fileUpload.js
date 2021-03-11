// import file upload middleware
const Multer = require('multer')
const { Storage } = require('@google-cloud/storage')


// import uuid creator for unique file names
const {v4: uuid} = require('uuid')

// help with file name creation
const path = require('path')

// create new google storage object
const storage = new Storage()

// have multer grab the file, temp store in memory
const multer = Multer({storage: Multer.memoryStorage()})

// access the desired storage bucket in google cloud storage
const bucket = storage.bucket(process.env.GCS_BUCKET)

// perform the actual upload of the file to google cloud storage
const upload = async (req, res, next) => {
    // create a unique filename
    let filename = uuid() + path.extname(req.file.originalname)
    req.file.originalname = filename

    // grab the file to be uploaded from memory
    const blob = bucket.file(req.file.originalname)

    // create a stream writer, to move buffer data of file in memory to storage
    const blobStream = blob.createWriteStream()

    // perform the actual buffer write of the data to the storage bucket
    blobStream.end(req.file.buffer)

    req.body.file_name = filename

    // finish upload and move to next express rout function
    next()
}

// export the upload functions to the router
module.exports = {upload, multer}

// For storage to local file system is not deployed to cloud
// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "public/profilePics")
//     },
//     filename: (req, file, cb) => {
//         let id = uuid()
//         cb(null, uuid() + path.extname(file.originalname))
//     }
// })