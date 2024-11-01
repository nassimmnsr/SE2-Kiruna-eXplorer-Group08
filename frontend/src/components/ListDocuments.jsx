// ListDocuments.js
import React, { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import "../App.css";
import DocumentModal from "./DocumentModal";
import API from '../API';
import Document from "../model/Document";

function ListDocuments() {

    const [documents, setDocuments] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);

    useEffect(() => {
        API.getAvailableDocuments()
        .then((response) => {
                setDocuments(response);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        console.log(documents);
    }   , [documents]);

    const handleDescription = (document) =>{
        setSelectedDocument(document);
        setShow(true);
    };

    const handleSave = (description) => {
        API.saveDescription(selectedDocument.id, description)
        .catch((error) => {
            console.error(error);
        });
        setShow(false);
    };

    return (
        <Container fluid className="d-flex flex-column vh-100 justify-content-center align-items-center p-3 mt-3">
            <Table className="w-80 mt-3 mb-3" style={{ width: "80%", tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        <th style={{fontSize: 20, fontWeight: "500"}}>Available documents</th>
                        <th></th>
                    </tr>
                </thead>
            </Table>

            {selectedDocument && (
                <DocumentModal
                    show={show}
                    onHide={() => {
                    setSelectedDocument(null);
                    setShow(false);
                    }}
                    document={selectedDocument}
                    handleSave={handleSave}
                />
            )}
            {/* Scrollable table body */}
            <div style={{
                width: "80%",
                height: "60vh",
                overflowY: "auto",
                marginBottom: "70px"
            }}>
                <Table hover>
                    <tbody>
                        {documents.map((document) => (
                            <tr key={document.id} style={{ height: "60px" }}>
                                <td className="align-middle">
                                    {document.title}
                                </td>
                                <td className="text-end align-middle">
                                    <Button className="brick-button" onClick={()=> handleDescription(document)}>
                                        Add new description
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
}

export default ListDocuments;
