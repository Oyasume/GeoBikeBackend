package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.GeoBikeApp;
import com.mycompany.myapp.domain.Travel;
import com.mycompany.myapp.repository.TravelRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TravelResource} REST controller.
 */
@SpringBootTest(classes = GeoBikeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TravelResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private TravelRepository travelRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTravelMockMvc;

    private Travel travel;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Travel createEntity(EntityManager em) {
        Travel travel = new Travel()
            .name(DEFAULT_NAME);
        return travel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Travel createUpdatedEntity(EntityManager em) {
        Travel travel = new Travel()
            .name(UPDATED_NAME);
        return travel;
    }

    @BeforeEach
    public void initTest() {
        travel = createEntity(em);
    }

    @Test
    @Transactional
    public void createTravel() throws Exception {
        int databaseSizeBeforeCreate = travelRepository.findAll().size();
        // Create the Travel
        restTravelMockMvc.perform(post("/api/travels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(travel)))
            .andExpect(status().isCreated());

        // Validate the Travel in the database
        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeCreate + 1);
        Travel testTravel = travelList.get(travelList.size() - 1);
        assertThat(testTravel.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createTravelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = travelRepository.findAll().size();

        // Create the Travel with an existing ID
        travel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTravelMockMvc.perform(post("/api/travels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(travel)))
            .andExpect(status().isBadRequest());

        // Validate the Travel in the database
        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTravels() throws Exception {
        // Initialize the database
        travelRepository.saveAndFlush(travel);

        // Get all the travelList
        restTravelMockMvc.perform(get("/api/travels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(travel.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getTravel() throws Exception {
        // Initialize the database
        travelRepository.saveAndFlush(travel);

        // Get the travel
        restTravelMockMvc.perform(get("/api/travels/{id}", travel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(travel.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingTravel() throws Exception {
        // Get the travel
        restTravelMockMvc.perform(get("/api/travels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTravel() throws Exception {
        // Initialize the database
        travelRepository.saveAndFlush(travel);

        int databaseSizeBeforeUpdate = travelRepository.findAll().size();

        // Update the travel
        Travel updatedTravel = travelRepository.findById(travel.getId()).get();
        // Disconnect from session so that the updates on updatedTravel are not directly saved in db
        em.detach(updatedTravel);
        updatedTravel
            .name(UPDATED_NAME);

        restTravelMockMvc.perform(put("/api/travels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTravel)))
            .andExpect(status().isOk());

        // Validate the Travel in the database
        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeUpdate);
        Travel testTravel = travelList.get(travelList.size() - 1);
        assertThat(testTravel.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingTravel() throws Exception {
        int databaseSizeBeforeUpdate = travelRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTravelMockMvc.perform(put("/api/travels")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(travel)))
            .andExpect(status().isBadRequest());

        // Validate the Travel in the database
        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTravel() throws Exception {
        // Initialize the database
        travelRepository.saveAndFlush(travel);

        int databaseSizeBeforeDelete = travelRepository.findAll().size();

        // Delete the travel
        restTravelMockMvc.perform(delete("/api/travels/{id}", travel.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Travel> travelList = travelRepository.findAll();
        assertThat(travelList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
