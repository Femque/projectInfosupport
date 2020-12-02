package nl.hva.configuration;


import lombok.RequiredArgsConstructor;
import nl.hva.webSocket.InfosupportMessageHandler;
import org.aspectj.bridge.MessageHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Configuration
@RequiredArgsConstructor
@EnableWebSocket
public class webSocketConfiguration implements WebSocketConfigurer {

    private final InfosupportMessageHandler messageHandler;


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(messageHandler, "/infosupport-messaging/*")
                .addInterceptors(socketInterceptor())
                .setAllowedOrigins("*");
    }

    @Bean
    public HandshakeInterceptor socketInterceptor() {
        return new HandshakeInterceptor() {

            @Override
            public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler webSocketHandler, Map<String, Object> map) throws Exception {
                // Get the URI segment corresponding to the auction id during handshake
                String path = request.getURI().getPath();
                String userId = path.substring(path.lastIndexOf('/') + 1);

                // This will be added to the websocket session
                map.put("user_id", userId);
                return true;
            }

            @Override
            public void afterHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Exception e) {
                // Nothing to do after handshake
            }
        };
    }

    @Bean
    public WebSocketHandler handler() {
        return new InfosupportMessageHandler();
    }

//    @Bean
//    public WebSocketHandler myHandler(){
//        return new InfosupportMessageHandler();
//    }

}
