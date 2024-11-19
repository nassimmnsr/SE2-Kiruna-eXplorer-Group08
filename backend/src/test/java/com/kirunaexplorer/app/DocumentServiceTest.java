package com.kirunaexplorer.app;

import com.kirunaexplorer.app.dto.request.DocumentRequestDTO;
import com.kirunaexplorer.app.dto.inout.GeoReferenceDTO;
import com.kirunaexplorer.app.dto.response.DocumentBriefResponseDTO;
import com.kirunaexplorer.app.dto.response.DocumentResponseDTO;
import com.kirunaexplorer.app.exception.ResourceNotFoundException;
import com.kirunaexplorer.app.model.Document;
import com.kirunaexplorer.app.model.GeoReference;
import com.kirunaexplorer.app.repository.DocumentLinkRepository;
import com.kirunaexplorer.app.repository.DocumentRepository;
import com.kirunaexplorer.app.repository.GeoReferenceRepository;
import com.kirunaexplorer.app.service.DocumentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DocumentServiceTest {

    @Mock
    private DocumentRepository documentRepository;

    @Mock
    private GeoReferenceRepository geoReferenceRepository;

    @Mock
    private DocumentLinkRepository documentLinkRepository;

    @InjectMocks
    private DocumentService documentService;

    private Document document;

    @BeforeEach
    void setUp() {
        // Creazione del documento utilizzando il modello fornito
        document = new Document(
                1L,
                "Test Document",
                "Test Description",
                "Test Stakeholders",
                "Test Type",
                "Test Scale",
                LocalDate.of(2023, 5, 1),
                Document.DatePrecision.FULL_DATE,
                "en",
                100,
                LocalDateTime.now(),
                LocalDateTime.now(),
                new HashSet<>(),
                null,
                new HashSet<>()
        );
    }

    @Test
    void getAllDocuments_success() {
        when(documentRepository.findAll()).thenReturn(List.of(document));

        List<DocumentBriefResponseDTO> documents = documentService.getAllDocuments();

        assertNotNull(documents);
        assertEquals(1, documents.size());
        assertEquals("Test Document", documents.get(0).title());
        verify(documentRepository, times(1)).findAll();
    }

    @Test
    void getDocumentById_success() {
        when(documentRepository.findById(1L)).thenReturn(Optional.of(document));
        when(documentLinkRepository.countByDocumentId(1L)).thenReturn(3);

        DocumentResponseDTO response = documentService.getDocumentById(1L);

        assertNotNull(response);
        assertEquals(1L, Long.valueOf(response.id()));
        assertEquals("Test Document", response.title());
        assertEquals(3, response.nrConnections());
        verify(documentRepository, times(1)).findById(1L);
        verify(documentLinkRepository, times(1)).countByDocumentId(1L);
    }

    @Test
    void getDocumentById_notFound() {
        when(documentRepository.findById(1L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> documentService.getDocumentById(1L));

        assertEquals("Document not found with ID 1", exception.getMessage());
        verify(documentRepository, times(1)).findById(1L);
    }

    @Test
    void createDocument_withGeoReference() {
        DocumentRequestDTO requestDTO = mock(DocumentRequestDTO.class);
        GeoReferenceDTO geoReferenceDTO = mock(GeoReferenceDTO.class);
        GeoReference geoReference = mock(GeoReference.class);

        when(requestDTO.toDocument()).thenReturn(document);
        when(requestDTO.geolocation()).thenReturn(geoReferenceDTO);
        when(geoReferenceDTO.toGeoReference(document)).thenReturn(geoReference);
        when(documentRepository.save(document)).thenReturn(document);

        Long documentId = documentService.createDocument(requestDTO);

        assertEquals(1L, documentId);
        verify(documentRepository, times(1)).save(document);
        verify(geoReferenceRepository, times(1)).save(geoReference);
    }

    @Test
    void createDocument_withoutGeoReference() {
        DocumentRequestDTO requestDTO = mock(DocumentRequestDTO.class);

        when(requestDTO.toDocument()).thenReturn(document);
        when(requestDTO.geolocation()).thenReturn(null);
        when(documentRepository.save(document)).thenReturn(document);

        Long documentId = documentService.createDocument(requestDTO);

        assertEquals(1L, documentId);
        verify(documentRepository, times(1)).save(document);
        verify(geoReferenceRepository, never()).save(any());
    }

    @Test
    void updateDocument_success() {
        DocumentRequestDTO requestDTO = mock(DocumentRequestDTO.class);
        GeoReferenceDTO geoReferenceDTO = mock(GeoReferenceDTO.class);
        GeoReference geoReference = mock(GeoReference.class);

        when(requestDTO.id()).thenReturn(1L);
        when(requestDTO.toDocument()).thenReturn(document);
        when(documentRepository.findById(1L)).thenReturn(Optional.of(document));
        when(geoReferenceRepository.findById(1L)).thenReturn(Optional.of(geoReference));
        when(geoReferenceDTO.toGeoReference(document)).thenReturn(geoReference);

        documentService.updateDocument(requestDTO);

        verify(documentRepository, times(1)).save(document);
        verify(geoReferenceRepository, times(1)).save(geoReference);
    }

    @Test
    void updateDocument_geoReferenceNotFound_createsNew() {
        DocumentRequestDTO requestDTO = mock(DocumentRequestDTO.class);
        GeoReferenceDTO geoReferenceDTO = mock(GeoReferenceDTO.class);

        when(requestDTO.id()).thenReturn(1L);
        when(requestDTO.toDocument()).thenReturn(document);
        when(requestDTO.geolocation()).thenReturn(geoReferenceDTO);
        when(documentRepository.findById(1L)).thenReturn(Optional.of(document));
        when(geoReferenceRepository.findById(1L)).thenReturn(Optional.empty());

        documentService.updateDocument(requestDTO);

        verify(documentRepository, times(1)).save(document);
        verify(geoReferenceRepository, times(1)).save(any(GeoReference.class));
    }

    @Test
    void updateDocument_documentNotFound() {
        DocumentRequestDTO requestDTO = mock(DocumentRequestDTO.class);

        when(requestDTO.id()).thenReturn(1L);
        when(documentRepository.findById(1L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> documentService.updateDocument(requestDTO));

        assertEquals("Document not found with ID 1", exception.getMessage());
        verify(documentRepository, times(1)).findById(1L);
        verify(documentRepository, never()).save(any());
    }
}
