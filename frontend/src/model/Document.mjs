import dayjs from "dayjs";

export class Document {
  constructor(
    id,
    title,
    stakeholders,
    scale,
    issuanceDate,
    type,
    nrConnections,
    language,
    nrPages,
    geolocation,
    description
  ) {
    this.id = id;
    this.title = title;
    this.stakeholders = stakeholders;
    this.scale = scale;
    this.issuanceDate = issuanceDate ? dayjs(issuanceDate).format(issuanceDate.length === 4 ? 'YYYY' : issuanceDate.length === 7 ? 'MM/YYYY' : 'DD/MM/YYYY') : "-";
    this.type = type;
    this.nrConnections = nrConnections;
    this.language = language;
    this.nrPages = nrPages;
    this.geolocation = geolocation;
    this.description = description;
  }
}

export class DocumentSnippet {
  constructor(id, title, scale, issuanceDate, type) {
    this.id = id;
    this.title = title;
    this.scale = scale;
    this.issuanceDate = issuanceDate ? dayjs(issuanceDate).format(issuanceDate.length === 4 ? 'YYYY' : issuanceDate.length === 7 ? 'MM/YYYY' : 'DD/MM/YYYY') : "-";
    this.type = type;
  }
}

export default { Document, DocumentSnippet };