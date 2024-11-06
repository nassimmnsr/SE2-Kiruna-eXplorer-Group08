import dayjs from "dayjs";

export class Document {
  constructor(
    id,
    title,
    stakeholders,
    scale,
    issuance_date,
    type,
    nr_connections = 0,
    language = undefined,
    nr_pages = 0,
    geolocation = { latitude: 0 , longitude: 0},
    description
  ) {
    this.id = id;
    this.title = title;
    this.stakeholders = stakeholders;
    this.scale = scale;
    this.issuance_date = issuance_date ? dayjs(issuance_date).format("MM/DD/YYYY") : "-";
    this.type = type;
    this.nr_connections = nr_connections;
    this.language = language;
    this.nr_pages = nr_pages;
    this.geolocation = geolocation;
    this.description = description;
  }
}

export class DocumentSnippet {
  constructor(id, title, scale, issuance_date, type) {
    this.id = id;
    this.title = title;
    this.scale = scale;
    this.issuance_date = issuance_date ? dayjs(issuance_date).format("MM/DD/YYYY") : "-";
    this.type = type;
  }
}

export default { Document, DocumentSnippet };