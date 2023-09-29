const convertDate = (dateStr, type) => {

    const parts = dateStr.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    let fecha = null;
    if(type == 'start'){
        fecha = new Date(year, month - 1, day, 0, 0, 0, 0);
    }

    if(type == 'end'){
        fecha = new Date(year, month - 1, day, 23, 59, 59, 999);
    }
    


    const fechaISO = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000).toISOString();

    return fechaISO;
}

module.exports ={
    convertDate
}