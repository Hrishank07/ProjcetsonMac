import os
import json
from src.job_description_extractor import JobDescriptionExtractor
from src.llm_integration import LLMIntegration

def test_extract_text(monkeypatch):
    # Create a dummy HTML to simulate a job description page.
    sample_html = "<html><body><h1>Job Description</h1><p>Basic qualifications: Python, Django.</p></body></html>"
    extractor = JobDescriptionExtractor("http://dummyurl.com")
    
    # Monkeypatch fetch_webpage to set the HTML content directly.
    monkeypatch.setattr(extractor, "fetch_webpage", lambda: setattr(extractor, "html", sample_html))
    extractor.fetch_webpage()
    extractor.extract_text()
    
    assert "Job Description" in extractor.text
    assert "Basic qualifications" in extractor.text

def test_extract_qualifying_criteria(monkeypatch):
    # Create a dummy HTML and set it.
    sample_html = "<html><body><p>Basic qualifications: Python, Django.</p></body></html>"
    extractor = JobDescriptionExtractor("http://dummyurl.com")
    monkeypatch.setattr(extractor, "fetch_webpage", lambda: setattr(extractor, "html", sample_html))
    extractor.fetch_webpage()
    extractor.extract_text()
    
    # Monkeypatch LLMIntegration.generate_text to return a fixed JSON string.
    from src.llm_integration import LLMIntegration
    def fake_generate_text(self, prompt, max_tokens, temperature=0.7):
        return '{"qualifying_criteria": "Python, Django, REST API"}'
    monkeypatch.setattr(LLMIntegration, "generate_text", fake_generate_text)
    
    # criteria = extractor.extract_qualifying_criteria()
    criteria = extractor.extract_key_job_details()

    # Check that the JSON contains the expected key.
    assert "qualifying_criteria" in criteria
    # Verify that the returned string includes one of the keywords.
    assert "Python" in criteria["qualifying_criteria"]
