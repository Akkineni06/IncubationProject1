package com.Incubation.Product_Service.Controller;

import com.Incubation.Product_Service.Entity.Product;
import com.Incubation.Product_Service.Service.ProductService;
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

    @GetMapping("/get/{id}")
    public Product getProduct(@PathVariable Long id) {
        return this.service.getProduct(id);

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