package nl.hva.configuration;


import lombok.RequiredArgsConstructor;
import nl.hva.webSocket.InfosupportMessageHandler;
import org.aspectj.bridge.MessageHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@RequiredArgsConstructor
@EnableWebSocket
public class webSocketConfiguration implements WebSocketConfigurer {

    private final InfosupportMessageHandler messageHandler;


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
       registry.addHandler(messageHandler, "/infosupport-messaging").setAllowedOrigins("*");
    }

    @Bean
    public WebSocketHandler myHandler(){
        return new InfosupportMessageHandler();
    }

}
