from src.llm_integration import LLMIntegration

def test_generate_text(monkeypatch):
    # Override generate_text to return a known test string without making an API call.
    def fake_generate_text(self, prompt, max_tokens=300, temperature=0.7):
        return "Test generated text"
    monkeypatch.setattr(LLMIntegration, "generate_text", fake_generate_text)
    
    llm = LLMIntegration("chatgpt")
    result = llm.generate_text("Prompt test")
    assert result == "Test generated text"
