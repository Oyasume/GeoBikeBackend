package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Travel;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Travel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TravelRepository extends JpaRepository<Travel, Long> {

    @Query("select travel from Travel travel where travel.user.login = ?#{principal.username}")
    List<Travel> findByUserIsCurrentUser();

    @Query("select distinct travel from Travel travel"
        + " left join fetch travel.locations"
        + " where travel.user.login = ?#{principal.username}"
    )
    List<Travel> findByUserIsCurrentUserWithEagerRelationships();

    @Query("select travel from Travel travel"
    + " left join fetch travel.locations"
    + " where travel.id = :id"
    )
    Optional<Travel> findByIdWithPositions(@Param("id") Long id);
}
