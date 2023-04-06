package de.hhn.se.labswp.streetbeatzlb_backend.models;

import de.hhn.se.labswp.streetbeatzlb_backend.config.ApplicationProperties;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PerformanceFilter{

    public static List<Performance> filterPerformances(LocalDateTime time1, int group1, int stage1) throws SQLException {
        String time;
        String group;
        String stage;
        if(time1 == null){
            time = "*";
        } else {
            time = String.valueOf(time1);
        }
        if(group1 == 0){
            group = "*";
        } else {
            group = String.valueOf(group1);
        }
        if(stage1 == 0){
            stage = "*";
        } else {
            stage = String.valueOf(stage1);
        }

        List<Performance> filteredPerformances = new ArrayList<Performance>();

        Connection con = DriverManager.getConnection("jdbc:mariadb://localhost:3306/streetbeatzlbdb");

        Statement st = con.createStatement();
        String sql = ("SELECT * FROM performance WHERE start_time <= '" + time + "' <= end_time " +
                "AND group_id = '" + group + "' " +
                "AND stage_id = '" + stage + "'");
        ResultSet rs = st.executeQuery(sql);

        if(rs.next()){
            Performance x = new Performance();
            x.setStart_time((LocalDateTime) rs.getObject("start_time"));
            x.setEnd_time((LocalDateTime) rs.getObject("end_time"));
            x.setCreated_by(rs.getString("created_by"));
            x.setGroup_id(rs.getLong("group_id"));
            x.setStage_id(rs.getLong("stage_id"));

            filteredPerformances.add(x);
        }

        con.close();

        return filteredPerformances;
    }
}
