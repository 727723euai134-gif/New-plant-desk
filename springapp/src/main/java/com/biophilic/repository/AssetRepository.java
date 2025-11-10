package com.biophilic.repository;

import com.biophilic.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    Optional<Asset> findByAssetTag(String assetTag);
    List<Asset> findByLocationLocationId(Long locationId);
    List<Asset> findByAssetType(String assetType);
    List<Asset> findByStatus(Asset.AssetStatus status);
    
    @Query("SELECT a FROM Asset a WHERE a.lastMaintDate IS NULL OR a.lastMaintDate < :date")
    List<Asset> findAssetsNeedingMaintenance(LocalDate date);
}