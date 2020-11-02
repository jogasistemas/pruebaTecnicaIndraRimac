const getPeopleId = (headers) => {
    return headers.app_people_id;
}

const getLastPeopleId = (headers) => {
    return headers.app_last_people_id;
}

const getEditedAttribute = (headers) => {
    return headers.app_editado;
}

const getResponseHeaders = () => {
    return {
        'Access-Control-Allow-Origin': '*'
    }
}

const convertAttributes = (data, id) => {
    return {
        "people_id": id,
        "nombre": data["name"],
        "altura": data["height"], 
        "masa": data["mass"],
        "color_de_pelo": data["hair_color"],
        "color_de_piel": data["skin_color"],
        "color_de_ojos": data["eye_color"],
        "anio_de_nacimiento": data["birth_year"],
        "genero": data["gender"],
        "mundo_natal": data["homeworld"],
        "peliculas": data["films"],
        "especies": data["species"],
        "vehiculos": data["vehicles"],
        "naves_estelares": data["starships"],
        "creado": data["created"],
        "editado": data["edited"],
        "url": data["url"],
    }
}

module.exports = {
    getResponseHeaders,
    getPeopleId,
    getLastPeopleId,
    getEditedAttribute,
    convertAttributes,
}