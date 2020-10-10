package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Travel;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Travel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TravelRepository extends JpaRepository<Travel, Long> {

    @Query("select travel from Travel travel where travel.userid.login = ?#{principal.username}")
    List<Travel> findByUseridIsCurrentUser();
}
