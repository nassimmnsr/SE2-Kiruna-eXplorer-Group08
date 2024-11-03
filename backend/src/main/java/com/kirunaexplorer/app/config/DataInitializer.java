package com.kirunaexplorer.app.config;

//import com.kirunaexplorer.app.model.User;
import com.kirunaexplorer.app.model.Document;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


import com.kirunaexplorer.app.repository.DocumentRepository;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    //private final UserRepository userRepository;
    private final DocumentRepository documentRepository;

    public DataInitializer (DocumentRepository documentRepository) {
        
        this.documentRepository = documentRepository;
    }


    @Override
    @Transactional
    public void run(String...  args) throws Exception {
        /* 
        // Insert data into User table
        User user1 = new User(null, "UBuser1", URBAN_PLANNER, null);
        User user2 = new User(null, "UBuser2", URBAN_PLANNER, null);
        User user3 = new User(null, "Ruser1", RESIDENT, null);
        User user4 = new User(null, "Ruser1", RESIDENT, null);

        userRepository.saveAll(List.of(user1, user2, user3, user4));
        */
        // Insert data into Document table
        Document document1 = new Document(null, 
                                          "Compilation of responses 'So what the people of Kiruna think?'", 
                                          "This document is a compilation of the responses to the survey 'What is your impression of Kiruna?' From the citizens' responses to this last part of the survey, it is evident that certain buildings, such as the Kiruna Church, the Hjalmar Lundbohmsgärden, and the Town Hall, are considered of significant value to the population. The municipality views the experience of this survey positively, to the extent that over the years it will propose various consultation opportunities.", 
                                          "Kiruna kommun/Residents", 
                                          "text", 
                                          LocalDate.of(2007, 1, 1) , 
                                          "Informative document", 
                                          "Swedish", 
                                          5, 
                                          LocalDate.now(), 
                                          null);
        Document document2 = new Document(null, 
                                          "Detailed plan for Bolagsomradet Gruvstadspark", 
                                          "This is the first of 8 detailed plans located in the old center of Kiruna, aimed at transforming the residential areas into mining industry zones to allow the demolition of buildings. The area includes the town hall, the Ullspiran district, and the AlO highway, and it will be the first to be dismantled. The plan consists, like all detailed plans, of two documents: the area map that regulates it, and a text explaining the reasons that led to the drafting of the plan with these characteristics. The plan gained legal validity in 2012.",
                                          "Kiruna kommun", 
                                          "1:8000", 
                                          LocalDate.of(2010, 10, 20) , 
                                          "Prescriptive document", 
                                          "Swedish", 
                                          32, 
                                          LocalDate.now(), 
                                          null);  
        Document document3 = new Document(null, 
                                          "Development Plan", 
                                          "The development plan shapes the form of the new city. The document, unlike previous competition documents, is written entirely in Swedish, which reflects the target audience: the citizens of Kiruna. The plan obviously contains many elements of the winning masterplan from the competition, some recommended by the jury, and others that were deemed appropriate to integrate later. The document is divided into four parts, with the third part, spanning 80 pages, describing the shape the new city will take and the strategies to be implemented for its relocation through plans, sections, images, diagrams, and texts. The document also includes numerous studies aimed at demonstrating the future success of the project.",
                                          "Kiruna kommun/White Arkitekter", 
                                          "1:7500", 
                                          LocalDate.of(2014, 03, 17) , 
                                          "Design document", 
                                          "Swedish", 
                                          111, 
                                          LocalDate.now(), 
                                          null);                                                                 
        Document document4 = new Document(null, 
                                          "Deformation forecast", 
                                          "The development plan shapes the form of the new city. The document, unlike previous competition documents, is written entirely in Swedish, which reflects the target audience: the citizens of Kiruna. The plan obviously contains many elements of the winning masterplan from the competition, some recommended by the jury, and others that were deemed appropriate to integrate later. The document is divided into four parts, with the third part, spanning 80 pages, describing the shape the new city will take and the strategies to be implemented for its relocation through plans, sections, images, diagrams, and texts. The document also includes numerous studies aimed at demonstrating the future success of the project.",
                                          "LKAB",
                                          "1:12000", 
                                          LocalDate.of(2014, 12, 1) , 
                                          "Techincal document", 
                                          "Swedish", 
                                          1, 
                                          LocalDate.now(), 
                                          null);
        Document document5 = new Document(null, 
                                          "Adjusted development Plan",
                                          "This document is the update of the Development Plan, one year after its creation, modifications are made to the general master plan, which is published under the name Adjusted Development Plan91, and still represents the version used today after 10 years. Certainly, there are no drastic differences compared to the previous plan, but upon careful comparison, several modified elements stand out. For example, the central square now takes its final shape, as well as the large school complex just north of it, which appears for the first time.",
                                          "Kiruna kommun/White Arkitekter", 
                                          "1:7500", 
                                          LocalDate.of(2015, 1, 1) , 
                                          "Design document", 
                                          "Swedish", 
                                          1, 
                                          LocalDate.now(), 
                                          null);   
                                          
        Document document6 = new Document(null, 
                                          "Detail plan for square and commercial street", 
                                          "This plan, approved in July 2016, is the first detailed plan to be implemented from the new masterplan (Adjusted development plan). The document defines the entire area near the town hall, comprising a total of 9 blocks known for their density. Among these are the 6 buildings that will face the main square. The functions are mixed, both public and private, with residential being prominent, as well as the possibility of incorporating accommodation facilities such as hotels. For all buildings in this plan, the only height limit is imposed by air traffic.",
                                          "Kiruna kommun", 
                                          "1:1000", 
                                          LocalDate.of(2016, 6, 22) , 
                                          "Prescriptive document", 
                                          "Swedish", 
                                          43, 
                                          LocalDate.now(), 
                                          null);   
        Document document7 = new Document(null, 
                                          "Construction of Scandic Hotel begins",
                                          "After two extensions of the land acquisition agreement, necessary because this document in Sweden is valid for only two years, construction of the hotel finally began in 2019.", 
                                          "LKAB", 
                                          "bluesprints/effects", 
                                          LocalDate.of(2019, 04, 19) , 
                                          "Material effect", 
                                          null, 
                                          null, 
                                          LocalDate.now(), 
                                          null);  

        documentRepository.saveAll(List.of(document1, document2, document3, document4, document5, document6, document7));




    }
    
}
