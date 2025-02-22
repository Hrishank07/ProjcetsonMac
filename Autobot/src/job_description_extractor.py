"""
Module: job_description_extractor.py
Purpose: Given a URL for a job posting, this module:
         1. Fetches the webpage.
         2. Extracts the raw text from the page.
         3. Uses a GenAI model (via LLMIntegration) to extract key job details.
         
The prompt instructs the model to extract and structure the following information:
    1. Job Requirements
    2. Qualifications
    3. Basic Requirements
    4. Responsibilities
    5. Any other relevant details that describe the role.

The output is expected in clear, concise, and organized JSON format.
"""

import requests
import json
import logging
from bs4 import BeautifulSoup
from src.llm_integration import LLMIntegration

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class JobDescriptionExtractor:
    def __init__(self, url: str, model_type: str = None):
        """
        Initialize the extractor with the target URL and an optional model type.
        
        Args:
            url (str): The URL of the job posting.
            model_type (str, optional): The LLM model type (e.g., 'chatgpt', 'gemini', 'deepseek').
                                        If None, the default model will be used.
        """
        self.url = url
        self.html = ""
        self.text = ""
        self.model_type = model_type

    def fetch_webpage(self) -> None:
        """
        Fetch the webpage content using an HTTP GET request.
        """
        try:
            response = requests.get(self.url, timeout=10)
            if response.status_code == 200:
                self.html = response.text
                logger.info("Webpage fetched successfully.")
            else:
                logger.error(f"Failed to fetch webpage. Status code: {response.status_code}")
        except Exception as e:
            logger.error(f"Exception while fetching webpage: {e}")

    def extract_text(self) -> None:
        """
        Uses BeautifulSoup to parse the HTML and extract visible text, removing script and style elements.
        """
        if not self.html:
            logger.error("HTML content is empty. Call fetch_webpage() first.")
            return

        try:
            soup = BeautifulSoup(self.html, "html.parser")
            for element in soup(["script", "style"]):
                element.decompose()
            self.text = soup.get_text(separator="\n")
            logger.info("Text extracted from webpage successfully.")
        except Exception as e:
            logger.error(f"Error during text extraction: {e}")

    def extract_key_job_details(self) -> dict:
        """
        Uses a GenAI model via LLMIntegration to extract key job details from the job posting text.
        
        The prompt used is:
        "Extract key job details from the provided website or job posting link. Include the following information in a structured format: 
         1. Job Requirements
         2. Qualifications
         3. Basic Requirements
         4. Responsibilities
         5. Any other relevant details that describe the role.
         
         Ensure the output is clear, concise, and organized for easy reference."
         
        Returns:
            dict: A JSON/dictionary with the extracted job details.
        """
        if not self.text:
            logger.error("No text available for processing. Ensure fetch_webpage() and extract_text() are called first.")
            return {}

        llm = LLMIntegration(self.model_type)
        prompt = (
            "Extract key job details from the provided website or job posting link. Include the following information in a structured format: \n"
            "1. Job Requirements\n"
            "2. Qualifications\n"
            "3. Basic Requirements\n"
            "4. Responsibilities\n"
            "5. Any other relevant details that describe the role.\n\n"
            "Ensure the output is clear, concise, and organized for easy reference.\n\n"
            "Job Description Text:\n" + self.text
        )
        response_text = llm.generate_text(prompt, max_tokens=500)
        try:
            result = json.loads(response_text)
            logger.info("Job details extracted successfully via LLM.")
            return result
        except Exception as e:
            logger.error(f"Failed to parse LLM response as JSON. Response was: {response_text}\nError: {e}")
            return {}

# # For independent testing.
# if __name__ == "__main__":
#     url = input("Enter the job posting URL: ").strip()
#     extractor = JobDescriptionExtractor(url)
#     extractor.fetch_webpage()
#     extractor.extract_text()
#     job_details = extractor.extract_key_job_details()
#     print("Extracted Job Details:")
#     print(json.dumps(job_details, indent=4))
