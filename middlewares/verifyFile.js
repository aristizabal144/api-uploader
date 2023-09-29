const verifyFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file){
        return res.status(400).json({ isError: true, msg: 'No existen archivos para cargar' });
    }

    const file = req.files.file;
    const allowedExtensions = ['jpg', 'jpeg'];

    // Verifica la extensión del archivo
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({ isError: true, msg: 'Solo archivos .png son permitidos' });
    }

    next();
};

module.exports = {
    verifyFile
};