import os
import pytest
from src.resume_parser import ResumeParser

def test_parse_text(monkeypatch):
    # Sample resume text with expected fields.
    sample_text = "Name: John Doe\nEmail: john.doe@example.com\nPhone: +1 555 123 4567\n"
    
    # Create an instance with a dummy path.
    parser = ResumeParser("dummy.pdf")
    
    # Override extract_text to return our sample_text instead of reading a file.
    monkeypatch.setattr(parser, "extract_text", lambda: sample_text)
    # Directly set the parser's text.
    parser.text = sample_text
    
    result = parser.parse_text()
    assert result.get("name") == "John Doe"
    assert result.get("email") == "john.doe@example.com"
    assert result.get("phone") == "+1 555 123 4567"
