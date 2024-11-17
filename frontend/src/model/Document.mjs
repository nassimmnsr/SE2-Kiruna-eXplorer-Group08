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
    this.issuanceDate = issuanceDate ? issuanceDate : "-";
    this.type = type;
    this.nrConnections = nrConnections;
    this.language = language;
    this.nrPages = nrPages;
    this.geolocation = geolocation;
    this.description = description;
  }
}

export class DocumentSnippet {
  constructor(
    id,
    title,
    scale,
    issuanceDate,
    type,
    geolocation = {
      latitude: null,
      longitude: null,
      municipality: "Whole municipality",
    }
  ) {
    this.id = id;
    this.title = title;
    this.scale = scale;
    this.issuanceDate = issuanceDate ? issuanceDate : "-";
    this.type = type;
    this.geolocation = geolocation;
  }
}

export default { Document, DocumentSnippet };
