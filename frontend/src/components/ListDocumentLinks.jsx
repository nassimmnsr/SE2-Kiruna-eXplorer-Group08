import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import API from '../API.mjs';
import '../App.css';

const ListDocumentLinks = ({ documentId, isOpen, onClose }) => {
  const [links, setLinks] = useState([]);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    if (documentId) {
      API.getAllLinksOfDocument(documentId)
        .then((response) => {
          setLinks(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [documentId]);

  useEffect(() => {
    if (!isOpen) {
      setLinks([]);
      setSnippets([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && documentId) {
      API.getAllLinksOfDocument(documentId)
        .then((response) => {
          setLinks(response);
          return Promise.all(response.map(link => API.getDocumentById(link.documentId)));
        })
        .then((documents) => {
          setSnippets(documents);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [documentId, isOpen]);

  return (
    <div className={`slider ${isOpen ? 'open' : ''}`}>
      <Button variant="secondary" onClick={onClose} className="close-button">
        Close
      </Button>
      <ul>
        {snippets.map((snippet) => (
          <li key={snippet.id}>
            <a href={`/documents/${snippet.id}`}>{snippet.title} - {snippet.type}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListDocumentLinks;
