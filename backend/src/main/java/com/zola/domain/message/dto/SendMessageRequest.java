package com.zola.domain.message.dto;

import com.zola.domain.common.enums.MessageType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {
    
    @NotBlank(message = "Conversation ID is required")
    private String conversationId;
    
    @NotNull(message = "Message type is required")
    private MessageType type;
    
    private String content;
    
    private String mediaUrl;
    
    private String replyToMessageId;
}
