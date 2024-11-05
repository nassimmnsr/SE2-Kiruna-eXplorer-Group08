package com.kirunaexplorer.app;

import com.kirunaexplorer.app.constants.DocumentLinkType;
import com.kirunaexplorer.app.dto.request.LinkDocumentsRequest;
import com.kirunaexplorer.app.dto.response.LinkDocumentsResponse;
import com.kirunaexplorer.app.exception.ResourceNotFoundException;
import com.kirunaexplorer.app.model.Document;
import com.kirunaexplorer.app.model.DocumentLink;
import com.kirunaexplorer.app.model.DocumentLinkId;
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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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

    document2 =  new Document(
                1L,
                "Example",
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

        document1 = new Document(
                2L,
                "Example",
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
        // Usa `DocumentLinkType.REFERENCE` invece di `"REFERENCE"`
        LinkDocumentsRequest request = new LinkDocumentsRequest(1L, 2L, DocumentLinkType.PREVISION);

        when(documentRepository.findById(1L)).thenReturn(Optional.of(document1));
        when(documentRepository.findById(2L)).thenReturn(Optional.of(document2));
        when(documentLinkRepository.save(any(DocumentLink.class))).thenAnswer(i -> i.getArgument(0));

        LinkDocumentsResponse response = documentLinkService.linkDocuments(request);

        assertNotNull(response);
        assertEquals(1L, response.documentId());
        assertEquals(2L, response.linkedDocumentId());
        assertEquals(DocumentLinkType.PREVISION, response.type());

        verify(documentRepository, times(1)).findById(1L);
        verify(documentRepository, times(1)).findById(2L);
        verify(documentLinkRepository, times(1)).save(any(DocumentLink.class));
    }
}
