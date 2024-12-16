from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class RequestAIChat(_message.Message):
    __slots__ = ("user_id", "user_name", "context", "message")
    USER_ID_FIELD_NUMBER: _ClassVar[int]
    USER_NAME_FIELD_NUMBER: _ClassVar[int]
    CONTEXT_FIELD_NUMBER: _ClassVar[int]
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    user_id: str
    user_name: str
    context: str
    message: str
    def __init__(self, user_id: _Optional[str] = ..., user_name: _Optional[str] = ..., context: _Optional[str] = ..., message: _Optional[str] = ...) -> None: ...

class AIResponse(_message.Message):
    __slots__ = ("message",)
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    message: str
    def __init__(self, message: _Optional[str] = ...) -> None: ...
