# DynamoDB Sample Data - Messages & Conversations

## Cách sử dụng

Dữ liệu này dùng để import vào DynamoDB cho testing. Bạn có thể dùng AWS CLI hoặc SDK để import.

### Import bằng AWS CLI (batch-write-item):

```bash
aws dynamodb batch-write-item --request-items file://dynamodb-conversations-data.json
aws dynamodb batch-write-item --request-items file://dynamodb-messages-data.json
aws dynamodb batch-write-item --request-items file://dynamodb-chatbot-sessions-data.json
aws dynamodb batch-write-item --request-items file://dynamodb-emotions-data.json
aws dynamodb batch-write-item --request-items file://dynamodb-media-metadata-data.json
aws dynamodb batch-write-item --request-items file://dynamodb-user-statistics-data.json
aws dynamodb batch-write-item --request-items file://dynamodb-notifications-data.json
```

---

## 1. CONVERSATIONS DATA (15 conversations)

### File: `dynamodb-conversations-data.json`

```json
{
  "Conversations": [
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-direct-user22-user33"},
          "type": {"S": "DIRECT"},
          "participant_ids": {"L": [
            {"S": "22222222-2222-2222-2222-222222222222"},
            {"S": "33333333-3333-3333-3333-333333333333"}
          ]},
          "last_message_id": {"S": "msg-001-010"},
          "last_message_preview": {"S": "Hẹn gặp lại nhé!"},
          "last_message_time": {"N": "1704441600000"},
          "unread_counts": {"M": {
            "22222222-2222-2222-2222-222222222222": {"N": "0"},
            "33333333-3333-3333-3333-333333333333": {"N": "1"}
          }},
          "created_at": {"N": "1704106800000"},
          "updated_at": {"N": "1704441600000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-direct-user22-user44"},
          "type": {"S": "DIRECT"},
          "participant_ids": {"L": [
            {"S": "22222222-2222-2222-2222-222222222222"},
            {"S": "44444444-4444-4444-4444-444444444444"}
          ]},
          "last_message_id": {"S": "msg-002-010"},
          "last_message_preview": {"S": "Ok nhé, thanks!"},
          "last_message_time": {"N": "1704355200000"},
          "unread_counts": {"M": {
            "22222222-2222-2222-2222-222222222222": {"N": "0"},
            "44444444-4444-4444-4444-444444444444": {"N": "0"}
          }},
          "created_at": {"N": "1704193200000"},
          "updated_at": {"N": "1704355200000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-direct-user33-user55"},
          "type": {"S": "DIRECT"},
          "participant_ids": {"L": [
            {"S": "33333333-3333-3333-3333-333333333333"},
            {"S": "55555555-5555-5555-5555-555555555555"}
          ]},
          "last_message_id": {"S": "msg-003-012"},
          "last_message_preview": {"S": "Chúc bạn học tốt!"},
          "last_message_time": {"N": "1704438000000"},
          "unread_counts": {"M": {
            "33333333-3333-3333-3333-333333333333": {"N": "2"},
            {"S": "55555555-5555-5555-5555-555555555555"}: {"N": "0"}
          }},
          "created_at": {"N": "1704193200000"},
          "updated_at": {"N": "1704438000000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-direct-user55-user77"},
          "type": {"S": "DIRECT"},
          "participant_ids": {"L": [
            {"S": "55555555-5555-5555-5555-555555555555"},
            {"S": "77777777-7777-7777-7777-777777777777"}
          ]},
          "last_message_id": {"S": "msg-004-015"},
          "last_message_preview": {"S": "Mai mình gặp nhau nhé"},
          "last_message_time": {"N": "1704441600000"},
          "unread_counts": {"M": {
            "55555555-5555-5555-5555-555555555555": {"N": "1"},
            "77777777-7777-7777-7777-777777777777": {"N": "0"}
          }},
          "created_at": {"N": "1704280200000"},
          "updated_at": {"N": "1704441600000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-direct-user77-user99"},
          "type": {"S": "DIRECT"},
          "participant_ids": {"L": [
            {"S": "77777777-7777-7777-7777-777777777777"},
            {"S": "99999999-9999-9999-9999-999999999999"}
          ]},
          "last_message_id": {"S": "msg-005-010"},
          "last_message_preview": {"S": "👍"},
          "last_message_time": {"N": "1704435600000"},
          "unread_counts": {"M": {
            "77777777-7777-7777-7777-777777777777": {"N": "0"},
            "99999999-9999-9999-9999-999999999999": {"N": "0"}
          }},
          "created_at": {"N": "1704352800000"},
          "updated_at": {"N": "1704435600000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-direct-user66-user88"},
          "type": {"S": "DIRECT"},
          "participant_ids": {"L": [
            {"S": "66666666-6666-6666-6666-666666666666"},
            {"S": "88888888-8888-8888-8888-888888888888"}
          ]},
          "last_message_id": {"S": "msg-006-010"},
          "last_message_preview": {"S": "Cảm ơn bạn nhiều!"},
          "last_message_time": {"N": "1704429600000"},
          "unread_counts": {"M": {
            "66666666-6666-6666-6666-666666666666": {"N": "0"},
            "88888888-8888-8888-8888-888888888888": {"N": "1"}
          }},
          "created_at": {"N": "1704280800000"},
          "updated_at": {"N": "1704429600000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-direct-useraa-userbb"},
          "type": {"S": "DIRECT"},
          "participant_ids": {"L": [
            {"S": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"},
            {"S": "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}
          ]},
          "last_message_id": {"S": "msg-007-010"},
          "last_message_preview": {"S": "Hẹn gặp lại!"},
          "last_message_time": {"N": "1704426000000"},
          "unread_counts": {"M": {
            "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa": {"N": "2"},
            "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb": {"N": "0"}
          }},
          "created_at": {"N": "1704366000000"},
          "updated_at": {"N": "1704426000000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-direct-usercc-userdd"},
          "type": {"S": "DIRECT"},
          "participant_ids": {"L": [
            {"S": "cccccccc-cccc-cccc-cccc-cccccccccccc"},
            {"S": "dddddddd-dddd-dddd-dddd-dddddddddddd"}
          ]},
          "last_message_id": {"S": "msg-008-010"},
          "last_message_preview": {"S": "Tối nay gặp nhé!"},
          "last_message_time": {"N": "1704423000000"},
          "unread_counts": {"M": {
            "cccccccc-cccc-cccc-cccc-cccccccccccc": {"N": "1"},
            "dddddddd-dddd-dddd-dddd-dddddddddddd": {"N": "0"}
          }},
          "created_at": {"N": "1704369600000"},
          "updated_at": {"N": "1704423000000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-direct-useree-userff"},
          "type": {"S": "DIRECT"},
          "participant_ids": {"L": [
            {"S": "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"},
            {"S": "ffffffff-ffff-ffff-ffff-ffffffffffff"}
          ]},
          "last_message_id": {"S": "msg-009-010"},
          "last_message_preview": {"S": "Đã nhận được!"},
          "last_message_time": {"N": "1704420000000"},
          "unread_counts": {"M": {
            "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee": {"N": "0"},
            "ffffffff-ffff-ffff-ffff-ffffffffffff": {"N": "0"}
          }},
          "created_at": {"N": "1704355200000"},
          "updated_at": {"N": "1704420000000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-direct-user11-useraa"},
          "type": {"S": "DIRECT"},
          "participant_ids": {"L": [
            {"S": "11111111-1111-1111-1111-111111111111"},
            {"S": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}
          ]},
          "last_message_id": {"S": "msg-010-010"},
          "last_message_preview": {"S": "Perfect!"},
          "last_message_time": {"N": "1704417600000"},
          "unread_counts": {"M": {
            "11111111-1111-1111-1111-111111111111": {"N": "0"},
            "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa": {"N": "0"}
          }},
          "created_at": {"N": "1704106800000"},
          "updated_at": {"N": "1704417600000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-group-g1111111-1111-1111-1111-111111111111"},
          "type": {"S": "GROUP"},
          "participant_ids": {"L": [
            {"S": "22222222-2222-2222-2222-222222222222"},
            {"S": "33333333-3333-3333-3333-333333333333"},
            {"S": "44444444-4444-4444-4444-444444444444"},
            {"S": "55555555-5555-5555-5555-555555555555"},
            {"S": "77777777-7777-7777-7777-777777777777"}
          ]},
          "last_message_id": {"S": "msg-g1-020"},
          "last_message_preview": {"S": "Tối nay ăn gì nhỉ?"},
          "last_message_time": {"N": "1704441600000"},
          "unread_counts": {"M": {
            "22222222-2222-2222-2222-222222222222": {"N": "0"},
            "33333333-3333-3333-3333-333333333333": {"N": "2"},
            "44444444-4444-4444-4444-444444444444": {"N": "5"},
            "55555555-5555-5555-5555-555555555555": {"N": "0"},
            "77777777-7777-7777-7777-777777777777": {"N": "1"}
          }},
          "created_at": {"N": "1704169200000"},
          "updated_at": {"N": "1704441600000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-group-g2222222-2222-2222-2222-222222222222"},
          "type": {"S": "GROUP"},
          "participant_ids": {"L": [
            {"S": "33333333-3333-3333-3333-333333333333"},
            {"S": "22222222-2222-2222-2222-222222222222"},
            {"S": "55555555-5555-5555-5555-555555555555"},
            {"S": "cccccccc-cccc-cccc-cccc-cccccccccccc"},
            {"S": "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"},
            {"S": "11111111-1111-1111-1111-111111111111"}
          ]},
          "last_message_id": {"S": "msg-g2-025"},
          "last_message_preview": {"S": "Push code lên GitHub chưa mọi người?"},
          "last_message_time": {"N": "1704435000000"},
          "unread_counts": {"M": {
            "33333333-3333-3333-3333-333333333333": {"N": "0"},
            "22222222-2222-2222-2222-222222222222": {"N": "0"},
            "55555555-5555-5555-5555-555555555555": {"N": "1"},
            "cccccccc-cccc-cccc-cccc-cccccccccccc": {"N": "3"},
            "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee": {"N": "2"},
            "11111111-1111-1111-1111-111111111111": {"N": "0"}
          }},
          "created_at": {"N": "1704193200000"},
          "updated_at": {"N": "1704435000000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-group-g4444444-4444-4444-4444-444444444444"},
          "type": {"S": "GROUP"},
          "participant_ids": {"L": [
            {"S": "55555555-5555-5555-5555-555555555555"},
            {"S": "33333333-3333-3333-3333-333333333333"},
            {"S": "66666666-6666-6666-6666-666666666666"},
            {"S": "77777777-7777-7777-7777-777777777777"},
            {"S": "99999999-9999-9999-9999-999999999999"},
            {"S": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"},
            {"S": "dddddddd-dddd-dddd-dddd-dddddddddddd"}
          ]},
          "last_message_id": {"S": "msg-g4-030"},
          "last_message_preview": {"S": "Đà Lạt hay Đà Nẵng nhỉ?"},
          "last_message_time": {"N": "1704439800000"},
          "unread_counts": {"M": {
            "55555555-5555-5555-5555-555555555555": {"N": "0"},
            "33333333-3333-3333-3333-333333333333": {"N": "2"},
            "66666666-6666-6666-6666-666666666666": {"N": "5"},
            "77777777-7777-7777-7777-777777777777": {"N": "0"},
            "99999999-9999-9999-9999-999999999999": {"N": "1"},
            "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa": {"N": "0"},
            "dddddddd-dddd-dddd-dddd-dddddddddddd": {"N": "4"}
          }},
          "created_at": {"N": "1704268800000"},
          "updated_at": {"N": "1704439800000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-group-g8888888-8888-8888-8888-888888888888"},
          "type": {"S": "GROUP"},
          "participant_ids": {"L": [
            {"S": "11111111-1111-1111-1111-111111111111"},
            {"S": "22222222-2222-2222-2222-222222222222"},
            {"S": "33333333-3333-3333-3333-333333333333"},
            {"S": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"},
            {"S": "cccccccc-cccc-cccc-cccc-cccccccccccc"},
            {"S": "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"},
            {"S": "ffffffff-ffff-ffff-ffff-ffffffffffff"},
            {"S": "dddddddd-dddd-dddd-dddd-dddddddddddd"}
          ]},
          "last_message_id": {"S": "msg-g8-040"},
          "last_message_preview": {"S": "GPT-5 khi nào ra nhỉ?"},
          "last_message_time": {"N": "1704440400000"},
          "unread_counts": {"M": {
            "11111111-1111-1111-1111-111111111111": {"N": "0"},
            "22222222-2222-2222-2222-222222222222": {"N": "1"},
            "33333333-3333-3333-3333-333333333333": {"N": "2"},
            "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa": {"N": "0"},
            "cccccccc-cccc-cccc-cccc-cccccccccccc": {"N": "1"},
            "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee": {"N": "1"},
            "ffffffff-ffff-ffff-ffff-ffffffffffff": {"N": "1"},
            "dddddddd-dddd-dddd-dddd-dddddddddddd": {"N": "3"}
          }},
          "created_at": {"N": "1704088800000"},
          "updated_at": {"N": "1704440400000"}
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "conversation_id": {"S": "conv-group-gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"},
          "type": {"S": "GROUP"},
          "participant_ids": {"L": [
            {"S": "cccccccc-cccc-cccc-cccc-cccccccccccc"},
            {"S": "33333333-3333-3333-3333-333333333333"},
            {"S": "77777777-7777-7777-7777-777777777777"},
            {"S": "99999999-9999-9999-9999-999999999999"},
            {"S": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"},
            {"S": "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"}
          ]},
          "last_message_id": {"S": "msg-g10-018"},
          "last_message_preview": {"S": "Good morning everyone!"},
          "last_message_time": {"N": "1704436500000"},
          "unread_counts": {"M": {
            "cccccccc-cccc-cccc-cccc-cccccccccccc": {"N": "0"},
            "33333333-3333-3333-3333-333333333333": {"N": "1"},
            "77777777-7777-7777-7777-777777777777": {"N": "2"},
            "99999999-9999-9999-9999-999999999999": {"N": "1"},
            "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa": {"N": "1"},
            "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee": {"N": "2"}
          }},
          "created_at": {"N": "1704207600000"},
          "updated_at": {"N": "1704436500000"}
        }
      }
    }
  ]
}
```

---

## 2. MESSAGES DATA (Sample - 100+ messages across conversations)

### File: `dynamodb-messages-data.json`

**Note**: File này rất dài. Tôi sẽ tạo một số sample messages. Trong thực tế, bạn cần generate thêm nhiều messages.

```json
{
  "Messages": [
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-001-001" },
          "conversation_id": { "S": "conv-direct-user22-user33" },
          "sender_id": { "S": "22222222-2222-2222-2222-222222222222" },
          "type": { "S": "TEXT" },
          "content": { "S": "Chào bạn! Bạn khỏe không?" },
          "timestamp": { "N": "1704106800000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-001-002" },
          "conversation_id": { "S": "conv-direct-user22-user33" },
          "sender_id": { "S": "33333333-3333-3333-3333-333333333333" },
          "type": { "S": "TEXT" },
          "content": { "S": "Chào bạn! Mình khỏe, còn bạn?" },
          "timestamp": { "N": "1704106860000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-001-003" },
          "conversation_id": { "S": "conv-direct-user22-user33" },
          "sender_id": { "S": "22222222-2222-2222-2222-222222222222" },
          "type": { "S": "TEXT" },
          "content": { "S": "Mình cũng tốt. Cuối tuần này có rảnh không?" },
          "timestamp": { "N": "1704107400000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-001-004" },
          "conversation_id": { "S": "conv-direct-user22-user33" },
          "sender_id": { "S": "33333333-3333-3333-3333-333333333333" },
          "type": { "S": "TEXT" },
          "content": { "S": "Có đó, bạn có kế hoạch gì không?" },
          "timestamp": { "N": "1704108000000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-001-005" },
          "conversation_id": { "S": "conv-direct-user22-user33" },
          "sender_id": { "S": "22222222-2222-2222-2222-222222222222" },
          "type": { "S": "TEXT" },
          "content": {
            "S": "Mình định đi xem phim, bạn có muốn đi cùng không?"
          },
          "timestamp": { "N": "1704109200000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-001-006" },
          "conversation_id": { "S": "conv-direct-user22-user33" },
          "sender_id": { "S": "33333333-3333-3333-3333-333333333333" },
          "type": { "S": "TEXT" },
          "content": { "S": "Được nhé! Xem phim gì thế?" },
          "timestamp": { "N": "1704110400000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-001-007" },
          "conversation_id": { "S": "conv-direct-user22-user33" },
          "sender_id": { "S": "22222222-2222-2222-2222-222222222222" },
          "type": { "S": "TEXT" },
          "content": { "S": "Phim bom tấn mới ra rạp á, nghe nói hay lắm" },
          "timestamp": { "N": "1704193200000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-001-008" },
          "conversation_id": { "S": "conv-direct-user22-user33" },
          "sender_id": { "S": "33333333-3333-3333-3333-333333333333" },
          "type": { "S": "IMAGE" },
          "content": { "S": "Check poster này xem" },
          "media_url": {
            "S": "https://storage.example.com/images/movie-poster-001.jpg"
          },
          "timestamp": { "N": "1704280800000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-001-009" },
          "conversation_id": { "S": "conv-direct-user22-user33" },
          "sender_id": { "S": "22222222-2222-2222-2222-222222222222" },
          "type": { "S": "TEXT" },
          "content": {
            "S": "Wow nhìn có vẻ hay đó! Chủ nhật lúc 2h được không?"
          },
          "timestamp": { "N": "1704368400000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-001-010" },
          "conversation_id": { "S": "conv-direct-user22-user33" },
          "sender_id": { "S": "33333333-3333-3333-3333-333333333333" },
          "type": { "S": "TEXT" },
          "content": { "S": "Hẹn gặp lại nhé!" },
          "timestamp": { "N": "1704441600000" },
          "status": { "S": "DELIVERED" },
          "read_by": { "L": [{ "S": "22222222-2222-2222-2222-222222222222" }] }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-g1-001" },
          "conversation_id": {
            "S": "conv-group-g1111111-1111-1111-1111-111111111111"
          },
          "sender_id": { "S": "22222222-2222-2222-2222-222222222222" },
          "type": { "S": "SYSTEM" },
          "content": { "S": "Nguyễn Văn A đã tạo nhóm 'Gia đình nhỏ'" },
          "timestamp": { "N": "1704169200000" },
          "status": { "S": "SENT" },
          "read_by": { "L": [] }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-g1-002" },
          "conversation_id": {
            "S": "conv-group-g1111111-1111-1111-1111-111111111111"
          },
          "sender_id": { "S": "33333333-3333-3333-3333-333333333333" },
          "type": { "S": "SYSTEM" },
          "content": { "S": "Trần Thị B đã tham gia nhóm" },
          "timestamp": { "N": "1704169500000" },
          "status": { "S": "SENT" },
          "read_by": { "L": [] }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-g1-003" },
          "conversation_id": {
            "S": "conv-group-g1111111-1111-1111-1111-111111111111"
          },
          "sender_id": { "S": "22222222-2222-2222-2222-222222222222" },
          "type": { "S": "TEXT" },
          "content": {
            "S": "Chào mọi người! Nhóm này để chúng ta liên lạc với nhau nhé"
          },
          "timestamp": { "N": "1704170000000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" },
              { "S": "55555555-5555-5555-5555-555555555555" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-g1-004" },
          "conversation_id": {
            "S": "conv-group-g1111111-1111-1111-1111-111111111111"
          },
          "sender_id": { "S": "33333333-3333-3333-3333-333333333333" },
          "type": { "S": "TEXT" },
          "content": { "S": "Ok nhé, cảm ơn anh!" },
          "timestamp": { "N": "1704172800000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-g1-005" },
          "conversation_id": {
            "S": "conv-group-g1111111-1111-1111-1111-111111111111"
          },
          "sender_id": { "S": "55555555-5555-5555-5555-555555555555" },
          "type": { "S": "TEXT" },
          "content": {
            "S": "Cuối tuần này mọi người có rảnh không? Mình tổ chức tụ họp nhé"
          },
          "timestamp": { "N": "1704279600000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "33333333-3333-3333-3333-333333333333" },
              { "S": "55555555-5555-5555-5555-555555555555" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-g1-020" },
          "conversation_id": {
            "S": "conv-group-g1111111-1111-1111-1111-111111111111"
          },
          "sender_id": { "S": "22222222-2222-2222-2222-222222222222" },
          "type": { "S": "TEXT" },
          "content": { "S": "Tối nay ăn gì nhỉ?" },
          "timestamp": { "N": "1704441600000" },
          "status": { "S": "DELIVERED" },
          "read_by": {
            "L": [
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "55555555-5555-5555-5555-555555555555" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-g2-001" },
          "conversation_id": {
            "S": "conv-group-g2222222-2222-2222-2222-222222222222"
          },
          "sender_id": { "S": "33333333-3333-3333-3333-333333333333" },
          "type": { "S": "SYSTEM" },
          "content": { "S": "Trần Thị B đã tạo nhóm 'Team Dev IUH'" },
          "timestamp": { "N": "1704193200000" },
          "status": { "S": "SENT" },
          "read_by": { "L": [] }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-g2-002" },
          "conversation_id": {
            "S": "conv-group-g2222222-2222-2222-2222-222222222222"
          },
          "sender_id": { "S": "33333333-3333-3333-3333-333333333333" },
          "type": { "S": "TEXT" },
          "content": {
            "S": "Chào các bạn! Nhóm này để mình làm project CNM nhé"
          },
          "timestamp": { "N": "1704193500000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "33333333-3333-3333-3333-333333333333" },
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "11111111-1111-1111-1111-111111111111" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-g2-003" },
          "conversation_id": {
            "S": "conv-group-g2222222-2222-2222-2222-222222222222"
          },
          "sender_id": { "S": "22222222-2222-2222-2222-222222222222" },
          "type": { "S": "TEXT" },
          "content": { "S": "Ok nhé! Mình sẽ cố gắng hoàn thành phần backend" },
          "timestamp": { "N": "1704195000000" },
          "status": { "S": "READ" },
          "read_by": {
            "L": [
              { "S": "33333333-3333-3333-3333-333333333333" },
              { "S": "22222222-2222-2222-2222-222222222222" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-g2-025" },
          "conversation_id": {
            "S": "conv-group-g2222222-2222-2222-2222-222222222222"
          },
          "sender_id": { "S": "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee" },
          "type": { "S": "TEXT" },
          "content": { "S": "Push code lên GitHub chưa mọi người?" },
          "timestamp": { "N": "1704435000000" },
          "status": { "S": "DELIVERED" },
          "read_by": {
            "L": [
              { "S": "33333333-3333-3333-3333-333333333333" },
              { "S": "22222222-2222-2222-2222-222222222222" },
              { "S": "11111111-1111-1111-1111-111111111111" }
            ]
          }
        }
      }
    },
    {
      "PutRequest": {
        "Item": {
          "message_id": { "S": "msg-g8-040" },
          "conversation_id": {
            "S": "conv-group-g8888888-8888-8888-8888-888888888888"
          },
          "sender_id": { "S": "11111111-1111-1111-1111-111111111111" },
          "type": { "S": "TEXT" },
          "content": { "S": "GPT-5 khi nào ra nhỉ?" },
          "timestamp": { "N": "1704440400000" },
          "status": { "S": "DELIVERED" },
          "read_by": {
            "L": [
              { "S": "11111111-1111-1111-1111-111111111111" },
              { "S": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa" }
            ]
          }
        }
      }
    }
  ]
}
```

---

## 3. Python Script to Generate More Messages

Để tạo thêm nhiều messages, bạn có thể dùng script Python sau:

```python
import json
import uuid
from datetime import datetime, timedelta

def generate_messages(conversation_id, sender_ids, num_messages=20):
    """Generate sample messages for a conversation"""
    messages = []
    base_time = int(datetime(2024, 1, 2).timestamp() * 1000)

    sample_texts = [
        "Chào mọi người!",
        "Hôm nay thế nào?",
        "Có ai rảnh không?",
        "Mình vừa xong công việc",
        "Cuối tuần làm gì nhỉ?",
        "Ăn trưa chưa các bạn?",
        "Project tiến triển ra sao rồi?",
        "Mình đang học bài",
        "Tối nay đi chơi không?",
        "Nhớ làm bài tập nhé!",
    ]

    for i in range(num_messages):
        sender = sender_ids[i % len(sender_ids)]
        message = {
            "PutRequest": {
                "Item": {
                    "message_id": {"S": f"msg-{uuid.uuid4().hex[:8]}-{i:03d}"},
                    "conversation_id": {"S": conversation_id},
                    "sender_id": {"S": sender},
                    "type": {"S": "TEXT"},
                    "content": {"S": sample_texts[i % len(sample_texts)]},
                    "timestamp": {"N": str(base_time + (i * 3600000))},
                    "status": {"S": "READ" if i < num_messages - 2 else "DELIVERED"},
                    "read_by": {"L": [{"S": s} for s in sender_ids[:2]]}
                }
            }
        }
        messages.append(message)

    return messages

# Example usage:
# messages = generate_messages("conv-direct-user22-user33",
#                               ["22222222-2222-2222-2222-222222222222",
#                                "33333333-3333-3333-3333-333333333333"],
#                               50)
```

---

## Tổng kết dữ liệu

### PostgreSQL (Relational Data):

- ✅ **15 Users** (đa dạng status)
- ✅ **20 Friendships** (ACCEPTED, PENDING, BLOCKED)
- ✅ **12 Groups** (PRIVATE và PUBLIC)
- ✅ **64 Group Members** (với các role khác nhau)
- ✅ **33 User Activities** (LOGIN, LOGOUT, MESSAGE_SENT, GROUP_CREATED, GROUP_JOINED)

### DynamoDB (NoSQL Data):

- ✅ **10 Conversations** (6 DIRECT, 4 GROUP)
- ✅ **20+ sample Messages** (TEXT, IMAGE, SYSTEM types)
- ⚠️ **Cần generate thêm 80+ messages** để đủ 100 messages

### Mối liên kết:

- ✅ Users ↔ Friendships (quan hệ bạn bè)
- ✅ Users ↔ Groups (người tạo và thành viên)
- ✅ Users ↔ Group Members (với roles)
- ✅ Users ↔ User Activities (lịch sử hoạt động)
- ✅ Conversations ↔ Messages (tin nhắn trong cuộc hội thoại)
- ✅ Users ↔ Conversations (participants)
