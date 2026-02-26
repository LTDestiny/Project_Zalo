package com.zola.domain.analytics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageTypeBreakdownDTO {
    private String type; // text, image, video, voice
    private long count;
    private double percentage;
}
