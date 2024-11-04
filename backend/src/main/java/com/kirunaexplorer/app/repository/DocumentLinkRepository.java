package com.kirunaexplorer.app.repository;

import com.kirunaexplorer.app.model.DocumentLink;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentLinkRepository extends JpaRepository<DocumentLink, Long> {
}