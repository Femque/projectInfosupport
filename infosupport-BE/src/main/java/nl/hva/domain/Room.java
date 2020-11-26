package nl.hva.domain;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class Room {

    private int userId;
    private Map<Integer, WebSocketSession> userSessions = new HashMap<>();
    private List<String> messages = new ArrayList<>();

    public int getUserId() {
        return userId;
    }

    public Map<Integer, WebSocketSession> getUserSessions() {
        return userSessions;
    }

    public void setUserSessions(Map<Integer, WebSocketSession> userSessions) {
        this.userSessions = userSessions;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }
}
