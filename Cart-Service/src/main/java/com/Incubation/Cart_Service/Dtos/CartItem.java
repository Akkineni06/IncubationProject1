package com.Incubation.Cart_Service.Dtos;

import com.Incubation.Cart_Service.Entity.Product;

import java.util.List;
import java.util.Objects;

public class CartItem {
	
	private Long id;
	private List<Product> products;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Product> getProducts() {
		return products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

//
//	@Override
//	public String toString() {
//		return "CartItem: id=" + id + ", item=" + item;
//	}
//
//	@Override
//	public boolean equals(Object obj) {
//		if (this == obj)
//			return true;
//		if (obj == null)
//			return false;
//		if (getClass() != obj.getClass())
//			return false;
//		CartItem other = (CartItem) obj;
//		return Objects.equals(id, other.id) && Objects.equals(item, other.item);
//	}
	
}
