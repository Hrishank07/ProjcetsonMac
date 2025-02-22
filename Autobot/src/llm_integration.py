"""
Module: llm_integration.py
Purpose: Integrates with various LLM APIs to generate dynamic text (e.g., cover letters).
"""

import logging
import requests
from config.config import get_model_config

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class LLMIntegration:
    """
    A class to interface with an LLM API.
    """
    
    def __init__(self, model_type: str = None):
        """
        Initializes the integration with a chosen model configuration.
        
        Args:
            model_type (str, optional): The model type to use (e.g., 'chatgpt', 'gemini', 'deepseek').
                                          If None, a prompt will ask the user for selection.
        """
        self.model_config = get_model_config(model_type)
    
    def generate_text(self, prompt: str, max_tokens: int = 300, temperature: float = 0.7) -> str:
        """
        Sends a prompt to the LLM API and returns the generated text.
        
        Args:
            prompt (str): The prompt for the LLM.
            max_tokens (int): Maximum tokens for the generated text.
            temperature (float): Sampling temperature for text generation.
            
        Returns:
            The generated text as a string.
        """
        headers = {
            "Authorization": f"Bearer {self.model_config.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "prompt": prompt,
            "max_tokens": max_tokens,
            "temperature": temperature
        }
        try:
            response = requests.post(self.model_config.api_url, headers=headers, json=payload)
            if response.status_code == 200:
                generated_text = response.json()['choices'][0]['text']
                logger.info("LLM generated text successfully.")
                return generated_text
            else:
                logger.error(f"LLM API error: {response.status_code} {response.text}")
                return ""
        except Exception as e:
            logger.error(f"Exception during LLM text generation: {e}")
            return ""

# # For independent testing
# if __name__ == "__main__":
#     prompt = "Generate a cover letter for a software engineer position."
#     llm = LLMIntegration()
#     cover_letter = llm.generate_text(prompt)
#     print("Generated Cover Letter:", cover_letter)
