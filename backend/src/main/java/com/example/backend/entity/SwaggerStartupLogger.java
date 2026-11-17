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

    @EventListener(ApplicationReadyEvent.class)
    public void logSwaggerUrl() {
        String url = String.format(
                "http://localhost:%s%s/swagger-ui/index.html",
                serverPort,
                contextPath
        );

        System.out.println("\n=============================================");
        System.out.println("\tSwagger UI disponível em: " + url);
        System.out.println("=============================================");
    }
}
