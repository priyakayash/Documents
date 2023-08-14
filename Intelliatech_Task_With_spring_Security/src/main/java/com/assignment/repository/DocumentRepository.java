package com.assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Integer> {

}
