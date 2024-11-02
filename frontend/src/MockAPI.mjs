//const serverURL = 'http://localhost:3000/api/v1';

// TODO: API for sessions
import Document from "./model/Document";


// API for documents
const getAvailableDocuments = async () => {
    //return await fetch(`${serverURL}/documents`)
    //.then(handleInvalidResponse)
    //.then((response) => { return response.json(); })


    // Simulate the JSON response
    const documents = [
        {
            id: 1,
            title: "Urban Development Plan",
            stakeholders: "City Council",
            scale: "Regional",
            issuance_date: "2023-01-15",
            type: "Policy",
            nr_connections: 22,
            language: "English",
            nr_pages: 45,
            geolocation: "40.7128, -74.0060",
            description: ""
        },
        {
            id: 2,
            title: "Environmental Impact Report",
            stakeholders: "Environmental Agency",
            scale: "National",
            issuance_date: "2022-07-10",
            type: "Report",
            nr_connections: 10,
            language: "Spanish",
            nr_pages: 32,
            geolocation: "34.0522, -118.2437",
            description: "An assessment of environmental impacts of urbanization."
        },
        {
            id: 3,
            title: "Economic Growth Strategy",
            stakeholders: "Economic Development Office",
            scale: "Citywide",
            issuance_date: "2024-05-01",
            type: "Strategy",
            nr_connections: 1,
            language: "English",
            nr_pages: 60,
            geolocation: "51.5074, -0.1278",
            description: "Strategies to boost economic growth in the metropolitan area."
        },
        {
            id: 4,
            title: "Public Health Guidelines",
            stakeholders: "Health Department",
            scale: "Regional",
            issuance_date: "2021-11-30",
            type: "Guideline",
            nr_connections: 7,
            language: "French",
            nr_pages: 20,
            geolocation: "48.8566, 2.3522",
            description: "Guidelines for maintaining public health and safety."
        },
        {
            id: 5,
            title: "Energy Efficiency Report",
            stakeholders: "Energy Council",
            scale: "National",
            issuance_date: "2023-04-12",
            type: "Report",
            nr_connections: 6,
            language: "German",
            nr_pages: 35,
            geolocation: "52.5200, 13.4050",
            description: "Report on energy efficiency and sustainable practices."
        },
        {
            id: 6,
            title: "Cultural Preservation Act",
            stakeholders: "Heritage Board",
            scale: "Local",
            issuance_date: "2022-08-22",
            type: "Legislation",
            nr_connections: 0,
            language: "Italian",
            nr_pages: 28,
            geolocation: "41.9028, 12.4964",
            description: "Legislation for preserving cultural heritage sites."
        },
        {
            id: 7,
            title: "Digital Transformation Blueprint",
            stakeholders: "Technology Ministry",
            scale: "International",
            issuance_date: "2023-12-18",
            type: "Blueprint",
            nr_connections: 1,
            language: "English",
            nr_pages: 50,
            geolocation: "37.7749, -122.4194",
            description: "Blueprint for digital transformation in public administration."
        },
        {
            id: 8,
            title: "Water Resource Management",
            stakeholders: "Water Authority",
            scale: "Regional",
            issuance_date: "2021-06-05",
            type: "Policy",
            nr_connections: 5,
            language: "Portuguese",
            nr_pages: 30,
            geolocation: "-23.5505 -46.63,33 ",
            description: "Policy for managing water resources in agriculture."
        },
        {
            id: 9,
            title: "Education System Reform",
            stakeholders: "Education Ministry",
            scale: "National",
            issuance_date: "2023-09-14",
            type: "Reform",
            nr_connections: 2,
            language: "English",
            nr_pages: 55,
            geolocation: "35.6895, 139.6917",
            description: "Reforms aimed at improving the national education system."
        },
        {
            id: 10,
            title: "Climate Action Framework",
            stakeholders: "Environmental Ministry",
            scale: "Global",
            issuance_date: "2024-03-21",
            type: "Framework",
            nr_connections: 3,
            language: "Japanese",
            nr_pages: 40,
            geolocation: "35.6762, 139.6503",
            description: "A global framework to tackle climate change."
        }
    ];
    
    
    // Simulate the JSON response
    
    return mapAPIDocumentsToDocuments(documents);
    //});
}

const saveDescription = async (id, description) => {
    /*return await fetch(`${serverURL}/documents/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description })
    })
    .then(handleInvalidResponse);
    */
}

function handleInvalidResponse(response) {
    if (!response.ok) { throw Error(response.statusText); }
    let type = response.headers.get('Content-Type');
    if (type !== null && type.indexOf('application/json') === -1) {
      throw new TypeError(`Expected JSON, got ${type}`);
    }
    return response;
}

async function mapAPIDocumentsToDocuments(apiDocuments) {
    return apiDocuments.map(
      (apiDocument) =>
        new Document(
          apiDocument.id,
          apiDocument.title,
          apiDocument.stakeholders,
          apiDocument.scale,
          apiDocument.issuance_date,
          apiDocument.type,
          apiDocument.nr_connections,
          apiDocument.language,
          apiDocument.nr_pages,
          apiDocument.geolocation,
          apiDocument.description
        )
    );
  }

const API = {
    getAvailableDocuments,
    saveDescription  
};

export default API;