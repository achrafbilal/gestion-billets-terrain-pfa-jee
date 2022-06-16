package com.achrafbilal.main.DAO;

import com.achrafbilal.main.Entities.Zone;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ZoneRepo extends JpaRepository<Zone,Long> {
    List<Zone> findAllByMaxSeatGreaterThanEqual(Integer value);

    Optional<Zone> findZoneById(Long id);
}
