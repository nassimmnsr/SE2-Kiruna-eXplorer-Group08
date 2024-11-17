import dayjs from "dayjs";

export class Document {
  constructor(
    id,
    title,
    stakeholders,
    scale,
    issuanceDate,
    type,
    nrConnections = 0,
    language = undefined,
    nrPages = 0,
    geolocation = {
      latitude: null,
      longitude: null,
      municipality: "Whole municipality",
    },
    description
  ) {
    this.id = id;
    this.title = title;
    this.stakeholders = stakeholders;
    this.scale = scale;
    this.issuanceDate = issuanceDate
      ? dayjs(issuanceDate).format("YYYY-MM-DD")
      : "-";
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
    this.issuanceDate = issuanceDate
      ? dayjs(issuanceDate).format("MM/DD/YYYY")
      : "-";
    this.type = type;
    this.geolocation = geolocation;
  }
}

export default { Document, DocumentSnippet };
