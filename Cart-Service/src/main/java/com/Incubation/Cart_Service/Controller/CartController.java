package com.Incubation.Cart_Service.Controller;

import com.Incubation.Cart_Service.Dtos.CartItem;
import com.Incubation.Cart_Service.Entity.Cart;
import com.Incubation.Cart_Service.Service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartController {

    private CartService service;

    public CartController(CartService service) {
        this.service = service;
    }

    @GetMapping("/listAll")
    public List<Cart> listAll() {
        return this.service.listAll();

    }

    @GetMapping("/get/{id}")
    public CartItem getProduct(@PathVariable Long id) {
        return this.service.getCart(id);
    }

    @PostMapping("/create")
    public Cart createCart(@RequestBody Cart cart) {
        return this.service.createCart(cart);
    }

    @DeleteMapping("/delete/{id}")
    public Cart deleteCart(@PathVariable Long id) {
        return this.service.deleteCart(id);
    }

    @PatchMapping("/update/{id}")
    public Cart updateCart(@PathVariable Long id,
                                 @RequestParam(required = false) Long itemId) {
        return this.service.updateCart(id, itemId);
    }
}