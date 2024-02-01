const verifyFile = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file){
        return res.status(400).json({ isError: true, msg: 'No existen archivos para cargar' });
    }
    
    next();
};

module.exports = {
    verifyFile
};