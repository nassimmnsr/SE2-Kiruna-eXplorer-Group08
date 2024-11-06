import {Document, DocumentSnippet} from "./model/Document.mjs";
import Stakeholder from "./model/Stakeholder.mjs";

const SERVER_URL = "http://localhost:8080";

/* ************************** *
 *       Documents APIs       *
 * ************************** */

// Retrieve all documents snippets
const getAllDocumentSnippets = async (filter) => {
  console.log(`${SERVER_URL}/documents` + (filter ? `?filter=${filter}` : ""))
  const documents = await fetch(
    `${SERVER_URL}/documents` + (filter ? `?filter=${filter}` : "")
  )
    .then(handleInvalidResponse)
    .then((response) => response.json())
    .then(mapAPISnippetsToSnippet);
  return documents;
};

// Create a new document
const addDocument = async (document) => {
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
    .then(mapAPIDocumentsToDocuments);
  return document;
};

// Update a document given its id
const updateDocument = async (documentId, nextDocument) => {
  return await fetch(`${SERVER_URL}/documents/`, {
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

// Retrieve all stakeholders
const getAllStakeholders = async () => {
  const stakeholders = await fetch(`${SERVER_URL}/stakeholders`)
    .then(handleInvalidResponse)
    .then((response) => response.json())
    .then(mapAPIStakeholdersToStakeholders);
  return stakeholders;
};

// Create a new stakeholder
const addStakeholder = async (stakeholder) => {
  return await fetch(`${SERVER_URL}/stakeholders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stakeholder),
  }).then(handleInvalidResponse);
};

// Retrieve a stakeholder by id
const getStakeholderById = async (stakeholderId) => {
  const stakeholder = await fetch(`${SERVER_URL}/stakeholders/${stakeholderId}`)
    .then(handleInvalidResponse)
    .then((response) => response.json());
  return stakeholder;
};

// Update a stakeholder given its id
const updateStakeholder = async (stakeholderId, nextStakeholder) => {
  return await fetch(`${SERVER_URL}/stakeholders/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nextStakeholder),
  }).then(handleInvalidResponse);
};

// Delete a stakeholder given its id
const deleteStakeholder = async (stakeholderId) => {
  return await fetch(`${SERVER_URL}/stakeholders/${stakeholderId}`, {
    method: "DELETE",
  }).then(handleInvalidResponse);
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

async function mapAPISnippetsToSnippet(apiSnippets) {
  return apiSnippets.map(
    (apiSnippet) =>
      new DocumentSnippet(
        apiSnippet.id,
        apiSnippet.title,
        apiSnippet.scale,
        apiSnippet.issuance_date,
        apiSnippet.type
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
};
export default API;
