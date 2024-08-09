package com.Incubation.Configuration;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("cart-service", r -> r.path("/cart-service/**")
                        .uri("lb://CART-SERVICE"))
//                        .uri("http://localhost:8082"))
                .route("product-service", r -> r.path("/product-service/**")
                        .uri("lb://PRODUCT-SERVICE"))
//                        .uri("http://localhost:8081"))
                .build();
    }
}
