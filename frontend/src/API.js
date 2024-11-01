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
            stakeholder: "City Council",
            scale: "Regional",
            issDate: "2023-01-15",
            type: "Policy",
            connections: 22,
            language: "English",
            pages: 45,
            coordinates: "40.7128, -74.0060",
            description: "A comprehensive plan for urban development across the city."
        },
        {
            id: 2,
            title: "Environmental Impact Report",
            stakeholder: "Environmental Agency",
            scale: "National",
            issDate: "2022-07-10",
            type: "Report",
            connections: 10,
            language: "Spanish",
            pages: 32,
            coordinates: "34.0522, -118.2437",
            description: "An assessment of environmental impacts of urbanization."
        },
        {
            id: 3,
            title: "Economic Growth Strategy",
            stakeholder: "Economic Development Office",
            scale: "Citywide",
            issDate: "2024-05-01",
            type: "Strategy",
            connections: 1,
            language: "English",
            pages: 60,
            coordinates: "51.5074, -0.1278",
            description: "Strategies to boost economic growth in the metropolitan area."
        },
        {
            id: 4,
            title: "Public Health Guidelines",
            stakeholder: "Health Department",
            scale: "Regional",
            issDate: "2021-11-30",
            type: "Guideline",
            connections: 7,
            language: "French",
            pages: 20,
            coordinates: "48.8566, 2.3522",
            description: "Guidelines for maintaining public health and safety."
        },
        {
            id: 5,
            title: "Energy Efficiency Report",
            stakeholder: "Energy Council",
            scale: "National",
            issDate: "2023-04-12",
            type: "Report",
            connections: 6,
            language: "German",
            pages: 35,
            coordinates: "52.5200, 13.4050",
            description: "Report on energy efficiency and sustainable practices."
        },
        {
            id: 6,
            title: "Cultural Preservation Act",
            stakeholder: "Heritage Board",
            scale: "Local",
            issDate: "2022-08-22",
            type: "Legislation",
            connections: 0,
            language: "Italian",
            pages: 28,
            coordinates: "41.9028, 12.4964",
            description: "Legislation for preserving cultural heritage sites."
        },
        {
            id: 7,
            title: "Digital Transformation Blueprint",
            stakeholder: "Technology Ministry",
            scale: "International",
            issDate: "2023-12-18",
            type: "Blueprint",
            connections: 1,
            language: "English",
            pages: 50,
            coordinates: "37.7749, -122.4194",
            description: "Blueprint for digital transformation in public administration."
        },
        {
            id: 8,
            title: "Water Resource Management",
            stakeholder: "Water Authority",
            scale: "Regional",
            issDate: "2021-06-05",
            type: "Policy",
            connections: 5,
            language: "Portuguese",
            pages: 30,
            coordinates: "-23.5505 -46.63,33 ",
            description: "Policy for managing water resources in agriculture."
        },
        {
            id: 9,
            title: "Education System Reform",
            stakeholder: "Education Ministry",
            scale: "National",
            issDate: "2023-09-14",
            type: "Reform",
            connections: 2,
            language: "English",
            pages: 55,
            coordinates: "35.6895, 139.6917",
            description: "Reforms aimed at improving the national education system."
        },
        {
            id: 10,
            title: "Climate Action Framework",
            stakeholder: "Environmental Ministry",
            scale: "Global",
            issDate: "2024-03-21",
            type: "Framework",
            connections: 3,
            language: "Japanese",
            pages: 40,
            coordinates: "35.6762, 139.6503",
            description: "A global framework to tackle climate change."
        }
    ];
    
    
    // Simulate the JSON response
    
    return documents;
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

const API = {
    getAvailableDocuments,
    saveDescription  
};

export default API;