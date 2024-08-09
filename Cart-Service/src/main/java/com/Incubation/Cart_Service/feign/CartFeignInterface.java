package com.Incubation.Cart_Service.feign;

import com.Incubation.Cart_Service.Entity.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("PRODUCT-SERVICE")
public interface CartFeignInterface {

    @GetMapping("product/get/{id}")
    public Product getProduct(@PathVariable Long id);

}
