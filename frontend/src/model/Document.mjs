import dayjs from "dayjs";
import leaflet from "leaflet";

/* document class */
class Document {  
    constructor(
      id,
      title,
      stakeholders,
      scale,
      issuance_date = "-",
      type,
      nr_connections = 0,
      language = undefined,
      nr_pages = 1,
      geolocation,
      description = undefined,
    ) {
      this.id = id;
      this.title = title;
      this.stakeholders = stakeholders;
      this.scale = scale;
      this.issuance_date = issuance_date;
      this.issuance_date = dayjs(issuance_date).format('MM/DD/YYYY');
      this.type = type;
      this.nr_connections = nr_connections;
      this.language = language;
      this.nr_pages = nr_pages;
      this.geolocation = geolocation;
      this.description = description;
    }
  }
  
  export default Document;