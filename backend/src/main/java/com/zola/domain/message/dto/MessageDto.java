package com.zola.domain.message.dto;

import com.zola.domain.common.enums.MessageStatus;
import com.zola.domain.common.enums.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageDto {
    private String messageId;
    private String conversationId;
    private String senderId;
    private MessageType type;
    private String content;
    private String mediaUrl;
    private Map<String, String> metadata;
    private Long timestamp;
    private MessageStatus status;
    private List<String> readBy;
    private String replyToMessageId;
}
