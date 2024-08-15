package com.Incubation.Cart_Service.Service;

import com.Incubation.Cart_Service.Dtos.CartItem;
import com.Incubation.Cart_Service.Entity.Cart;
import com.Incubation.Cart_Service.Entity.Product;
import com.Incubation.Cart_Service.Repo.CartRepo;
import com.Incubation.Cart_Service.feign.CartFeignInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {
    @Autowired
    private CartRepo repo;

    @Autowired
    CartFeignInterface cartFeignInterface;

    public CartService(CartRepo repo) {
        this.repo = repo;
    }

    public List<Cart> listAll() { return this.repo.findAll();}

    public Cart createCart(Cart cart) { return this.repo.save(cart); }

    @Value("${service.charge}")
    private int serviceCharge;

    public Cart deleteCart(Long id) {
        Cart delete = this.repo.findById(id).get();
        this.repo.deleteById(id);
        return delete;
    }

    public Cart updateCart(Long id,
                                 Long itemId) {
        Cart toUpdate = this.repo.findById(id).get();

//        if (itemId != null){
            List<Long> currentItems = toUpdate.getItemIds();
            currentItems.add(itemId);
            toUpdate.setItemIds(currentItems);
//        }
        return this.repo.save(toUpdate);
    }

    public CartItem getCart(Long id) {

        // Create a Cart object to load the cart details
        Cart cart = this.repo.findById(id).get();
        List<Product> products = new ArrayList<>();
        for(Long itemId : cart.getItemIds()) {
            Product p1 = cartFeignInterface.getProduct(itemId);
            products.add(p1);
        }
        CartItem cartItem = new CartItem();
        cartItem.setId(cart.getId());
        cartItem.setProducts(products);

        return cartItem;

        // Create a list of Products to load the products added to the cart
//        List<Product> products = new ArrayList<>();

        // Loop through the product IDs in the cart and load them onto products list

    }

    public double getCartTotal(Long id) {
        Cart cart = this.repo.findById(id).get();
        double totalPrice = 0D;

        for(Long itemId : cart.getItemIds()) {
            Product p1 = cartFeignInterface.getProduct(itemId);
            totalPrice = totalPrice + p1.getPrice();
        }
        totalPrice = totalPrice + (totalPrice * serviceCharge/100);
        return totalPrice;
    }
}