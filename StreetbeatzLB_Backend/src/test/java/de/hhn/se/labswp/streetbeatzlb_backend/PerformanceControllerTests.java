package de.hhn.se.labswp.streetbeatzlb_backend;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import de.hhn.se.labswp.streetbeatzlb_backend.models.Performance;
import de.hhn.se.labswp.streetbeatzlb_backend.models.PerformanceRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class PerformanceControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    PerformanceRepository performanceRepository;

    @Test
    public void testResponseBody() throws Exception {
        Iterable<Performance> expectedResponse = performanceRepository.findAll();

        mockMvc.perform(get("/api/performances/all"))
                .andExpect(status().isOk())
                .andExpect(content().json(toJson(expectedResponse)));
    }

    private String toJson(Object obj) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper.writeValueAsString(obj);
    }
}
