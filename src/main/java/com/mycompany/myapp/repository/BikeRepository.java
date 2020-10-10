package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Bike;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Bike entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BikeRepository extends JpaRepository<Bike, Long> {

    @Query("select bike from Bike bike where bike.userid.login = ?#{principal.username}")
    List<Bike> findByUseridIsCurrentUser();
}
