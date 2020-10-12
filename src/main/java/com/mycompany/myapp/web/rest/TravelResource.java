package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Travel;
import com.mycompany.myapp.repository.LocationRepository;
import com.mycompany.myapp.repository.TravelRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Travel}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TravelResource {

    private final Logger log = LoggerFactory.getLogger(TravelResource.class);

    private static final String ENTITY_NAME = "travel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TravelRepository travelRepository;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;

    public TravelResource(TravelRepository travelRepository, UserRepository userRepository, LocationRepository locationRepository) {
        this.travelRepository = travelRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
    }

    /**
     * {@code POST  /travels} : Create a new travel.
     *
     * @param travel the travel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new travel, or with status {@code 400 (Bad Request)} if the travel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/travels")
    public ResponseEntity<Travel> createTravel(@RequestBody Travel travel) throws URISyntaxException {
        log.debug("REST request to save Travel : {}", travel);
        if (travel.getId() != null) {
            throw new BadRequestAlertException("A new travel cannot already have an ID", ENTITY_NAME, "idexists");
        }

        travel.setUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin().get()).get());
        log.debug("REST request to save Travel : {}", travel.getLocations());

        travel.getLocations().forEach( location -> location.setTravel(travel));
        log.debug("REST request to save Travel : {}", travel.getLocations());

        travel.setLocations( locationRepository.saveAll(travel.getLocations()).stream().collect(Collectors.toSet()));
        Travel result = travelRepository.save(travel);
        log.debug("REST request to save Travel : {}", travel.getLocations());

        return ResponseEntity.created(new URI("/api/travels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /travels} : Updates an existing travel.
     *
     * @param travel the travel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated travel,
     * or with status {@code 400 (Bad Request)} if the travel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the travel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/travels")
    public ResponseEntity<Travel> updateTravel(@RequestBody Travel travel) throws URISyntaxException {
        log.debug("REST request to update Travel : {}", travel);
        if (travel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Travel result = travelRepository.save(travel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, travel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /travels} : get all the travels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of travels in body.
     */
    @GetMapping("/travels")
    public List<Travel> getAllTravels() {
        log.debug("REST request to get all Travels");
        return travelRepository.findByUserIsCurrentUserWithEagerRelationships();
    }

    /**
     * {@code GET  /travels/:id} : get the "id" travel.
     *
     * @param id the id of the travel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the travel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/travels/{id}")
    public ResponseEntity<Travel> getTravel(@PathVariable Long id) {
        log.debug("REST request to get Travel : {}", id);
        Optional<Travel> travel = travelRepository.findByIdWithPositions(id);
        return ResponseUtil.wrapOrNotFound(travel);
    }

    /**
     * {@code DELETE  /travels/:id} : delete the "id" travel.
     *
     * @param id the id of the travel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/travels/{id}")
    public ResponseEntity<Void> deleteTravel(@PathVariable Long id) {
        log.debug("REST request to delete Travel : {}", id);
        travelRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
