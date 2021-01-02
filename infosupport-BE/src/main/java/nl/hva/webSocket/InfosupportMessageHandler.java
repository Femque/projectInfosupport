package nl.hva.webSocket;


import lombok.extern.slf4j.Slf4j;
import nl.hva.domain.Room;
import nl.hva.models.User;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.annotation.PostConstruct;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class InfosupportMessageHandler  extends TextWebSocketHandler {
    private Map<String, Room> rooms = new HashMap<>();
    private Map<Integer, WebSocketSession> sessions = new HashMap<>();

    private static int number= 1;
    private int userId;
    private String test;


    @PostConstruct
    public void postConstruct(){
        rooms.put("room", new Room());
    }

    @Override
    @OnOpen
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        test = session.getAttributes().get("user_id").toString();
        userId = Integer.parseInt(test);
        sessions.put(number++, session);
        rooms.get("room").getUserSessions().put(number++, session);
        rooms.get("room").setUserId(userId);
    }


    @Override
    @OnMessage
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        for (WebSocketSession value : this.rooms.get(session.getId()).getUserSessions().values()){
//            value.sendMessage(message);
//        }
        System.out.println(userId);
        rooms.get("room").getUserSessions().forEach((s, websocketSession) -> {
            System.out.println(rooms.get("room"));
            try {
                if (rooms.get("room").getUserId() == userId) {
                    websocketSession.sendMessage(message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

//        session.sendMessage(message);

    }

    @OnClose
    protected void onClose(WebSocketSession session) throws Exception{
        sessions.remove(session);
        this.afterConnectionEstablished(session);
    }

}
