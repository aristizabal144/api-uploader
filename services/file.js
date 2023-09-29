const FileModel = require('../models/file.model');
const sharp = require('sharp');

const saveFileDb = async (data) => {
    const fileData = new FileModel(data);
    await fileData.save();
};

const convertJpgToPng = async (file) => {
    const data = await sharp(file.tempFilePath)
        .toFormat('png')
        .toBuffer();

    file.data = data;
    file.name = file.name.replace(/\.[^/.]+$/, '') + '.png';
    file.mimetype = 'image/png';

    return file;
}


const filesByDate = async (startDate, endDate) => {
    try {

        const start = new Date(startDate);
        const end = new Date(endDate);

        let result = await FileModel.find({
            fecha: {
                $gte: start,
                $lte: end
            }
        })

        return result;

    } catch (error) {
        console.error('Error:', error);
    }
}


const countFilesByHour = async (startDate, endDate) => {
    try {

        const start = new Date(startDate);
        const end = new Date(endDate);

        let result = await FileModel.aggregate([
            {
                $match: {
                    fecha: {
                        $gte: start,
                        $lte: end
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$fecha' },
                        month: { $month: '$fecha' },
                        day: { $dayOfMonth: '$fecha' },
                        hour: { $hour: '$fecha' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                    '_id.day': 1,
                    '_id.hour': 1
                }
            }
        ]);

        return result;

    } catch (error) {
        console.error('Error:', error);
    }
}


module.exports = {
    saveFileDb,
    convertJpgToPng,
    countFilesByHour,
    filesByDate
};