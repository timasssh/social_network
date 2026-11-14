package com.example.backend.entity;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class SwaggerStartupLogger {
    @Value("${server.port}")
    private String serverPort;

    @Value("${server.servlet.context-path:}")
    private String contextPath;

    @Value("${springdoc.swagger-ui.path:/swagger-ui.html}")
    private String swaggerPath;

    @EventListener(ApplicationReadyEvent.class)
    public void logSwaggerUrl() {
        String formattedSwaggerPath = swaggerPath.startsWith("/") ? swaggerPath : "/" + swaggerPath;

        String url = String.format("http://localhost:%s%s%s", serverPort, contextPath, formattedSwaggerPath);
        System.out.println("\n=============================================");
        System.out.println("\tSwagger UI disponível em: " + url);
        System.out.println("=============================================");
    }
}
