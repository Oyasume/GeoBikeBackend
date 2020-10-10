package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Travel.
 */
@Entity
@Table(name = "travel")
public class Travel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "travel")
    private Set<Location> locations = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "travels", allowSetters = true)
    private User userid;

    @ManyToOne
    @JsonIgnoreProperties(value = "travels", allowSetters = true)
    private Bike bikeid;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Travel name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public Travel locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Travel addLocation(Location location) {
        this.locations.add(location);
        location.setTravel(this);
        return this;
    }

    public Travel removeLocation(Location location) {
        this.locations.remove(location);
        location.setTravel(null);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public User getUserid() {
        return userid;
    }

    public Travel userid(User user) {
        this.userid = user;
        return this;
    }

    public void setUserid(User user) {
        this.userid = user;
    }

    public Bike getBikeid() {
        return bikeid;
    }

    public Travel bikeid(Bike bike) {
        this.bikeid = bike;
        return this;
    }

    public void setBikeid(Bike bike) {
        this.bikeid = bike;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Travel)) {
            return false;
        }
        return id != null && id.equals(((Travel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Travel{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
