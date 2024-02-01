const { uploadToBucket } = require('../services/s3');
const { saveFileDb } = require('../services/file');
const { convertJpgToPng } = require('../services/file');
const { filesByDate } = require('../services/file');
const { countFilesByHour } = require('../services/file');
const { convertDate } = require('../helpers/dateConvert');

const upload = async (req, res) => {

    try {
        let file = req.files.file;
        const bucket = req.body.bucket;

        file = await convertJpgToPng(file);
        const result = await uploadToBucket(bucket, file);

        res.status(201).json({ isError: false, msj: result.Location });
    } catch (error) {
        console.error('Error al guardar el registro:', error);
        res.status(500).json({ isError: true, msj: 'Error al guardar el registro' });
    }
};

const getFilesByHour = async (req, res) => {

    try {

        let startDateParam = req.query.startDate;
        let endDateParam = req.query.endDate;

        if (!startDateParam || !endDateParam) {
            return res.status(400).json({ isError: true, msg: 'Debes proporcionar startDate y endDate como parámetros.' });
        }

        startDateParam = convertDate(startDateParam, 'start');
        endDateParam = convertDate(endDateParam, 'end');

        let result = await countFilesByHour(startDateParam, endDateParam);

        res.status(200).json({ isError: false, msj: 'Informacion obtenida con exito', data: result });

    } catch (error) {
        res.status(500).json({ isError: true, msj: 'Error al obtener los registro' });
    }


}


const getFilesByDate = async (req, res) => {

    try {
        let startDateParam = req.query.startDate;
        let endDateParam = req.query.endDate;

        if (!startDateParam || !endDateParam) {
            return res.status(400).json({ isError: true, msg: 'Debes proporcionar startDate y endDate como parámetros.' });
        }

        startDateParam = convertDate(startDateParam, 'start');
        endDateParam = convertDate(endDateParam, 'end');

        let result = await filesByDate(startDateParam, endDateParam);

        res.status(200).json({ isError: false, msj: 'Informacion obtenida con exito', data: result });

    } catch (error) {
        console.log(error)
        res.status(500).json({ isError: true, msj: 'Error al obtener los registro' });
    }


}


module.exports = {
    upload,
    getFilesByHour,
    getFilesByDate
}