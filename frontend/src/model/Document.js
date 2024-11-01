class Document {
    constructor(id, title, stakeholder, scale, issDate, type, connections, language, pages, coordinates, description) {
        this.id = id;
        this.title = title;
        this.stakeholder = stakeholder;
        this.scale = scale;
        this.issDate = issDate;
        this.type = type;
        this.connections = connections;
        this.language = language;
        this.pages = pages;
        this.coordinates = coordinates;
        this.description = description;
    }
}

export default Document;
