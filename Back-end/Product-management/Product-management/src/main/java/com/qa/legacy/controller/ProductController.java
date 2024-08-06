package com.qa.legacy.controller;


import com.qa.legacy.domain.Product;
import com.qa.legacy.services.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {

    private ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping("/listAll")
    public List<Product> listAll() {
        return this.service.listAll();

    }

    @PostMapping("/create")
    public Product createProduct(@RequestBody Product product) {
        return this.service.createProduct(product);
    }

    @DeleteMapping("/delete/{id}")
    public Product deleteProduct(@PathVariable Long id) {
        return this.service.deleteProduct(id);
    }

    @PatchMapping("/update/{id}")
    public Product updateProduct(@PathVariable Long id,
                                 @RequestParam(required = false) String name,
                                 @RequestParam(required = false) Double price,
                                 @RequestParam(required = false) Long quantity) {
        return this.service.updateProduct(id, name, price, quantity);
    }
}
