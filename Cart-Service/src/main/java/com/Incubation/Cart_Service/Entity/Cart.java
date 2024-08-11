package com.Incubation.Cart_Service.Entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    private Long itemId;

    @ElementCollection
    private List<Long> itemIds;


    public Cart() {
    }

    public Cart(List<Long> itemIds) {
        this.itemIds = itemIds;
    }

    public List<Long> getItemIds() {
        return itemIds;
    }

    public void setItemIds(List<Long> itemIds) {
        this.itemIds = itemIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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