"""
Module: resume_parser.py
Purpose: Provides functionalities to extract text from a PDF resume and parse key data.
"""


import PyPDF2
import re
import logging
from typing import Dict

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ResumeParser:
    """
    A class to extract text from a PDF file and parse key resume information.
    """
    
    def __init__(self, pdf_path: str):
        """
        Initialize the ResumeParser with the path to the PDF file.
        """
        self.pdf_path = pdf_path
        self.text = ""
        self.parsed_data: Dict[str, str] = {}
    
    def extract_text(self) -> str:
        """
        Extracts text from the PDF file.
        
        Returns:
            The extracted text as a single string.
        """
        try:
            with open(self.pdf_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                text = ""
                for page in reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                self.text = text
                logger.info("Successfully extracted text from PDF.")
                return text
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {e}")
            raise
    
    def parse_text(self) -> Dict[str, str]:
        """
        Parses the extracted text to find key resume fields.
        
        Returns:
            A dictionary with parsed resume data (e.g., name, email, phone).
        """
        if not self.text:
            self.extract_text()
            
        data = {}
        try:
            # Example: Extract name assuming it's prefixed with "Name:"
            name_match = re.search(r"Name:\s*(.+)", self.text)
            data['name'] = name_match.group(1).strip() if name_match else "Not found"
            
            # Example: Extract email
            email_match = re.search(r"Email:\s*([\w\.-]+@[\w\.-]+)", self.text)
            data['email'] = email_match.group(1).strip() if email_match else "Not found"
            
            # Example: Extract phone number (simple regex; customize as needed)
            phone_match = re.search(r"Phone:\s*([\d\-\+\(\)\s]+)", self.text)
            data['phone'] = phone_match.group(1).strip() if phone_match else "Not found"
            
            self.parsed_data = data
            logger.info("Successfully parsed resume data.")
            return data
        except Exception as e:
            logger.error(f"Error parsing resume text: {e}")
            raise

# For independent testing
if __name__ == "__main__":
    pdf_path = "../data/sample_resume.pdf"
    parser = ResumeParser(pdf_path)
    parser.extract_text()
    resume_data = parser.parse_text()
    print("Parsed Resume Data:", resume_data)
