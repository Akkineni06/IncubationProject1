package com.Incubation.Cart_Service.Entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long itemId;

    //    @ElementCollection
//    private List<Long> itemId;


    public Cart() {
    }

    public Cart(Long id, Long itemId) {
        this.id = id;
        this.itemId = itemId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

//    @Override
//    public String toString() {
//        return "Product{" +
//                "Id=" + id +
//                ", Item ID='" + name + '\'' +
//                ", Price=" + price +
//                ", Quantity=" + quantity +
//                '}';
//    }
}