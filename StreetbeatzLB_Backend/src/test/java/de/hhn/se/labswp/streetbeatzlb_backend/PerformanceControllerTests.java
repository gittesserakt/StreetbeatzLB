package de.hhn.se.labswp.streetbeatzlb_backend;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.test.web.servlet.MvcResult;
import static org.junit.Assert.assertTrue;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class PerformanceControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PerformanceRepository performanceRepository;

    @Test
    public void testGetAllPerformances() throws Exception {
        Iterable<Performance> expectedResponse = performanceRepository.findAll();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        mockMvc.perform(get("/api/performances/all"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse)));
    }

    @Test
    public void testFilterNull() throws Exception {
        Iterable<Performance> expectedResponse = performanceRepository.findAll();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        mockMvc.perform(get("/api/performances/filtered?time=0&artist=0&stage=0"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse)));
    }

    @Test
    public void testFilterTime() throws Exception {
        boolean resultAsExpected = true;

        MvcResult result = mockMvc.perform(get("/api/performances/filtered?time=2023-05-28T08:00:00&artist=0&stage=0"))
                .andExpect(status().isOk())
                .andReturn();

        List<Performance> performances = fromJson(result.getResponse().getContentAsString(), new TypeReference<>() {});

        for (Performance performance : performances) {
            if(!performance.getStart_time().equals(LocalDateTime.parse("2023-05-28T08:00:00"))){
                resultAsExpected = false;
                break;
            }
        }
        assertTrue(resultAsExpected);
    }

    @Test
    public void testFilterArtist() throws Exception {
        boolean resultAsExpected = true;

        MvcResult result = mockMvc.perform(get("/api/performances/filtered?time=0&artist=1&stage=0"))
                .andExpect(status().isOk())
                .andReturn();

        List<Performance> performances = fromJson(result.getResponse().getContentAsString(), new TypeReference<>() {});

        for (Performance performance : performances) {
            if(performance.getArtist_id() != 1){
                resultAsExpected = false;
                break;
            }
        }
        assertTrue(resultAsExpected);
    }

    @Test
    public void testFilterStage() throws Exception {
        boolean resultAsExpected = true;

        MvcResult result = mockMvc.perform(get("/api/performances/filtered?time=0&artist=0&stage=1"))
                .andExpect(status().isOk())
                .andReturn();

        List<Performance> performances = fromJson(result.getResponse().getContentAsString(), new TypeReference<>() {});

        for (Performance performance : performances) {
            if(performance.getStage_id() != 1){
                resultAsExpected = false;
                break;
            }
        }
        assertTrue(resultAsExpected);
    }

    @Test
    public void testFilterTimeArtist() throws Exception {
        boolean resultAsExpected = true;

        MvcResult result = mockMvc.perform(get("/api/performances/filtered?time=2023-05-28T08:00:00&artist=1&stage=0"))
                .andExpect(status().isOk())
                .andReturn();

        List<Performance> performances = fromJson(result.getResponse().getContentAsString(), new TypeReference<>() {});

        for (Performance performance : performances) {
            if(!performance.getStart_time().equals(LocalDateTime.parse("2023-05-28T08:00:00")) && performance.getArtist_id() != 1){
                resultAsExpected = false;
                break;
            }
        }
        assertTrue(resultAsExpected);
    }

    @Test
    public void testFilterTimeStage() throws Exception {
        boolean resultAsExpected = true;

        MvcResult result = mockMvc.perform(get("/api/performances/filtered?time=2023-05-28T08:00:00&artist=0&stage=1"))
                .andExpect(status().isOk())
                .andReturn();

        List<Performance> performances = fromJson(result.getResponse().getContentAsString(), new TypeReference<>() {});

        for (Performance performance : performances) {
            if(!performance.getStart_time().equals(LocalDateTime.parse("2023-05-28T08:00:00")) && performance.getStage_id() != 1){
                resultAsExpected = false;
                break;
            }
        }
        assertTrue(resultAsExpected);
    }

    @Test
    public void testFilterArtistStage() throws Exception {
        boolean resultAsExpected = true;

        MvcResult result = mockMvc.perform(get("/api/performances/filtered?time=0&artist=1&stage=1"))
                .andExpect(status().isOk())
                .andReturn();

        List<Performance> performances = fromJson(result.getResponse().getContentAsString(), new TypeReference<>() {});

        for (Performance performance : performances) {
            if(performance.getArtist_id() != 1 && performance.getStage_id() != 1){
                resultAsExpected = false;
                break;
            }
        }
        assertTrue(resultAsExpected);
    }

    @Test
    public void testFilterTimeArtistStage() throws Exception {
        boolean resultAsExpected = true;

        MvcResult result = mockMvc.perform(get("/api/performances/filtered?time=2023-05-28T08:00:00&artist=1&stage=1"))
                .andExpect(status().isOk())
                .andReturn();

        List<Performance> performances = fromJson(result.getResponse().getContentAsString(), new TypeReference<>() {});

        for (Performance performance : performances) {
            if(!performance.getStart_time().equals(LocalDateTime.parse("2023-05-28T08:00:00"))
                    && performance.getArtist_id() != 1 &&performance.getStage_id() != 1){
                resultAsExpected = false;
                break;
            }
        }
        assertTrue(resultAsExpected);
    }

    private List<Performance> fromJson(String json, TypeReference<List<Performance>> clazz) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper.readValue(json, clazz);
    }
}
