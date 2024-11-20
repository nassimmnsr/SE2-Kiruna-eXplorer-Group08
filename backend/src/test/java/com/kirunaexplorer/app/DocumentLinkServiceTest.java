package com.kirunaexplorer.app;

import com.kirunaexplorer.app.model.Document;
import com.kirunaexplorer.app.model.DocumentLink;
import com.kirunaexplorer.app.repository.DocumentLinkRepository;
import com.kirunaexplorer.app.repository.DocumentRepository;
import com.kirunaexplorer.app.service.DocumentLinkService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.HashSet;

@ExtendWith(MockitoExtension.class)
public class DocumentLinkServiceTest {

    @Mock
    private DocumentRepository documentRepository;

    @Mock
    private DocumentLinkRepository documentLinkRepository;

    @InjectMocks
    private DocumentLinkService documentLinkService;

    private Document document1;
    private Document document2;

    @BeforeEach
    void setUp() {
        document1 = new Document(
                1L,
                "Document 1",
                "",
                "",
                "",
                "",
                null,
                null,
                "",
                50,
                LocalDateTime.now(),
                null,
                new HashSet<>(),
                null,
                new HashSet<>()
        );

        document2 = new Document(
                2L,
                "Document 2",
                "",
                "",
                "",
                "",
                null,
                null,
                "",
                50,
                LocalDateTime.now(),
                null,
                new HashSet<>(),
                null,
                new HashSet<>()
        );
    }

    @Test
    void linkDocuments_success() {
        LinkDocumentsRequest request = new LinkDocumentsRequest(1L, 2L, DocumentLinkType.DIRECT_CONSEQUENCE);

        when(documentRepository.findById(1L)).thenReturn(Optional.of(document1));
        when(documentRepository.findById(2L)).thenReturn(Optional.of(document2));
        when(documentLinkRepository.save(any(DocumentLink.class))).thenAnswer(invocation -> invocation.getArgument(0));

        LinkDocumentsResponse response = documentLinkService.linkDocuments(request);

        assertNotNull(response);
        assertEquals(1L, response.documentId());
        assertEquals(2L, response.linkedDocumentId());
        assertEquals(DocumentLinkType.DIRECT_CONSEQUENCE, response.type());

        verify(documentRepository, times(1)).findById(1L);
        verify(documentRepository, times(1)).findById(2L);
        verify(documentLinkRepository, times(1)).save(any(DocumentLink.class));*/
    }

    @Test
    void linkDocuments_documentNotFound() {
        LinkDocumentsRequest request = new LinkDocumentsRequest(1L, 2L, DocumentLinkType.DIRECT_CONSEQUENCE);

        when(documentRepository.findById(1L)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> documentLinkService.linkDocuments(request));

        assertEquals("Document not found with ID 1", exception.getMessage());
        verify(documentRepository, times(1)).findById(1L);
        verify(documentRepository, never()).findById(2L);
        verify(documentLinkRepository, never()).save(any(DocumentLink.class));
    }
}
