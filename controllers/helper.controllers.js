
// const ftp = require('ftp');
const fs = require('fs');
// const uuid = require('uuid/v4');

exports.upload_file = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({
      code: 400,
      message: 'No files were uploaded.',
    });
  }
  const file = req.files.file;
  const prefix = req.body.prefix;
  const fileName = `${prefix}_${Date.now()}.${file.mimetype.split('/')[1]}`;
 
  fs.writeFile(`${process.env.PATH_FRONT}/storage_img/${fileName}`, file.data, (err) => {
    if (err) throw err;
    res.send(
      {
        code: 200,
        message: 'File uploaded successfully.',
        data: {
          link_image:  `${process.env.URL_FRONT}/storage_img/${fileName}`
        }
      });
  })
};