package com.achrafbilal.main.IServices;

import com.achrafbilal.main.DTORequests.ZoneRequest;
import com.achrafbilal.main.Entities.Zone;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ZoneService {
    List<Zone> index();
    Zone show(Long id);
    Zone store(ZoneRequest request);
    Zone edit(ZoneRequest request,Long id);
    void delete(Long id);
}
