import { Document, DocumentSnippet } from "./model/Document.mjs";
import Stakeholder from "./model/Stakeholder.mjs";

const SERVER_URL = "http://localhost:8080/api/v1";

/* ************************** *
 *       Link APIs      *
 * ************************** */

const createLink = async (document, linkedDocument) => {
  console.log("CREATE LINK: ", document, linkedDocument);
  const requestBody = {
    type: linkedDocument.linkType.toUpperCase(),
    linkId: null,
    documentId: linkedDocument.document.id,
  };
  console.log("REQUEST BODY: ", requestBody);

  // ("REQUEST BODY: ", requestBody);
  requestBody.type = linkedDocument.linkType.toUpperCase().replace(/ /g, "_");
  console.log(document.id);
  try {
    const response = await fetch(
      `${SERVER_URL}/documents/${document.id}/links`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      const responseData =
        response.status !== 201 ? await response.json() : null;
      console.log("Link creato con successo:", responseData);
    } else {
      console.error(
        "Errore nella creazione del link:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Errore nella richiesta:", error);
  }
};

// Retrieve all links of a document
const getAllLinksOfDocument = async (documentId) => {
  const links = await fetch(
    `${SERVER_URL}/api/v1/documents/${documentId}/links`
  )
    .then(handleInvalidResponse)
    .then((response) => response.json());
  return links;
};

// Update a link for a document
const updateLink = async (documentId, linkId, updatedLink) => {
  return await fetch(`${SERVER_URL}/api/v1/documents/${documentId}/links`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedLink),
  }).then(handleInvalidResponse);
};

// Delete a link for a document
const deleteLink = async (documentId, linkId) => {
  return await fetch(
    `${SERVER_URL}/api/v1/documents/${documentId}/links/${linkId}`,
    {
      method: "DELETE",
    }
  ).then(handleInvalidResponse);
};

/* ************************** *
 *       Documents APIs       *
 * ************************** */

// Retrieve all documents snippets
const getAllDocumentSnippets = async (filter) => {
  const documents = await fetch(`${SERVER_URL}/documents`)
    .then(handleInvalidResponse)
    .then((response) => response.json())
    .then(mapAPISnippetsToSnippet);
  return documents;
};

// Create a new document
const addDocument = async (document) => {
  console.log("ADD DOCUMENT: ", document);
  return await fetch(`${SERVER_URL}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(document),
  }).then(handleInvalidResponse);
};

// Retrieve a document by id
const getDocumentById = async (documentId) => {
  const document = await fetch(`${SERVER_URL}/documents/${documentId}`)
    .then(handleInvalidResponse)
    .then((response) => response.json())
    .then(mapAPIDocumentToDocument);
  return document;
};

// Update a document given its id
const updateDocument = async (documentId, nextDocument) => {
  return await fetch(`${SERVER_URL}/documents`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nextDocument),
  }).then(handleInvalidResponse);
};

// Delete a document given its id
const deleteDocument = async (documentId) => {
  return await fetch(`${SERVER_URL}/documents/${documentId}`, {
    method: "DELETE",
  }).then(handleInvalidResponse);
};

/* ************************** *
 *      Stakeholders APIs     *
 * ************************** */

const stakeholders = [
  { id: 1, name: "LKAB" },
  { id: 2, name: "Municipality" },
  { id: 3, name: "Regional authority" },
  { id: 4, name: "Architecture firms" },
  { id: 5, name: "Citizen" },
  { id: 6, name: "Kiruna kommun" },
  { id: 7, name: "White Arkitekter"}
];

// // Retrieve all stakeholders
const getAllStakeholders = async () => {
  // const stakeholders = await fetch(`${SERVER_URL}/stakeholders`)
  //   .then(handleInvalidResponse)
  //   .then((response) => response.json())
  //   .then(mapAPIStakeholdersToStakeholders);
  const sh = [];
  stakeholders.forEach((s) => sh.push(Stakeholder.fromJSON(s)));
  return sh;
};

// Create a new stakeholder
const addStakeholder = async (stakeholder) => {
  //   return await fetch(`${SERVER_URL}/stakeholders`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(stakeholder),
  //   }).then(handleInvalidRiesponse);
  const newId = stakeholders.length ? stakeholders[stakeholders.length - 1].id + 1 : 1;
  const newStakeholder = { id: newId, name: stakeholder };
  stakeholders.push(newStakeholder);
};

// Retrieve a stakeholder by id
const getStakeholderById = async (stakeholderId) => {
  //   const stakeholder = await fetch(`${SERVER_URL}/stakeholders/${stakeholderId}`)
  //     .then(handleInvalidResponse)
  //     .then((response) => response.json());
  //   return stakeholder;
  return Stakeholder.fromJSON(
    stakeholders.find((stakeholder) => stakeholder.id === stakeholderId)
  );
};

// Update a stakeholder given its id
const updateStakeholder = async (stakeholderId, nextStakeholder) => {
  //   return await fetch(`${SERVER_URL}/stakeholders/`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(nextStakeholder),
  //   }).then(handleInvalidResponse);
  const index = stakeholders.findIndex(
    (stakeholder) => stakeholder.id === stakeholderId
  );
  if (index !== -1) {
    stakeholders[index] = nextStakeholder;
  }
};

// Delete a stakeholder given its id
const deleteStakeholder = async (stakeholderId) => {
  //   return await fetch(`${SERVER_URL}/stakeholders/${stakeholderId}`, {
  //     method: "DELETE",
  //   }).then(handleInvalidResponse);
  const index = stakeholders.findIndex(
    (stakeholder) => stakeholder.id === stakeholderId
  );
  if (index !== -1) {
    stakeholders.splice(index, 1);
  }
};

/* ************************** *
 *       Helper functions      *
 * ************************** */

function handleInvalidResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  let type = response.headers.get("content-type");
  if (type != null && type.indexOf("application/json") === -1) {
    throw new TypeError(`Expected JSON, got ${type}`);
  }
  return response;
}

function mapAPIStakeholdersToStakeholders(apiStakeholders) {
  return apiStakeholders.map(
    (apiStakeholder) => new Stakeholder(apiStakeholder.id, apiStakeholder.name)
  );
}

async function mapAPIDocumentToDocument(apiDocument) {
  return new Document(
    apiDocument.id,
    apiDocument.title,
    apiDocument.stakeholders,
    apiDocument.scale,
    apiDocument.issuanceDate,
    apiDocument.type,
    apiDocument.nrConnections,
    apiDocument.language,
    apiDocument.nrPages,
    apiDocument.geolocation,
    apiDocument.description
  );
}

async function mapAPISnippetsToSnippet(apiSnippets) {
  return apiSnippets.map(
    (apiSnippet) =>
      new DocumentSnippet(
        apiSnippet.id,
        apiSnippet.title,
        apiSnippet.scale,
        apiSnippet.issuanceDate,
        apiSnippet.type,
        apiSnippet.geolocation,
        apiSnippet.stakeholders
      )
  );
}

const API = {
  getAllDocumentSnippets,
  addDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getAllStakeholders,
  addStakeholder,
  getStakeholderById,
  updateStakeholder,
  deleteStakeholder,
  createLink,
  getAllLinksOfDocument,
  updateLink,
  deleteLink,
};
export default API;
