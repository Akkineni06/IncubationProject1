package com.Incubation.Product_Service.Service;

import com.Incubation.Product_Service.Entity.Product;
import com.Incubation.Product_Service.Repo.ProductRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private ProductRepo repo;

    public ProductService(ProductRepo repo) {
        this.repo = repo;
    }

    public List<Product> listAll() { return this.repo.findAll();}

    public Product createProduct(Product product) { return this.repo.save(product); }

    public Product deleteProduct(Long id) {
        Product delete = this.repo.findById(id).get();
        this.repo.deleteById(id);
        return delete;
    }

    public Product updateProduct(Long id,
                                 String name,
                                 Double price,
                                 Long quantity) {
        Product toUpdate = this.repo.findById(id).get();

        if (name != null) toUpdate.setName(name);
        if (price != null) toUpdate.setPrice(price);
        if (quantity != null) toUpdate.setQuantity(quantity);
        return this.repo.save(toUpdate);
    }

    public Product getProduct(Long id) {
        return this.repo.findById(id).get();
    }
}