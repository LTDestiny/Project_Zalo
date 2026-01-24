package com.zola.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebSocketMessage {
    private String type; // MESSAGE, STATUS, NOTIFICATION
    private String senderId;
    private String recipientId;
    private String conversationId;
    private Object payload;
    private Long timestamp;
}
