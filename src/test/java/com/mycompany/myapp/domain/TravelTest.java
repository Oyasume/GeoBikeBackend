package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class TravelTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Travel.class);
        Travel travel1 = new Travel();
        travel1.setId(1L);
        Travel travel2 = new Travel();
        travel2.setId(travel1.getId());
        assertThat(travel1).isEqualTo(travel2);
        travel2.setId(2L);
        assertThat(travel1).isNotEqualTo(travel2);
        travel1.setId(null);
        assertThat(travel1).isNotEqualTo(travel2);
    }
}
