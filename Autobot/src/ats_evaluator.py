"""
Module: ats_evaluator.py
Purpose: Evaluate an Applicant Tracking System (ATS) score by comparing resume text against job qualifying criteria.
         It processes text using basic NLP techniques (removing punctuation, lower-casing, and filtering out stopwords)
         and returns an ATS score (0-100) along with two keyword lists: matched and missing.
"""

import re
import string
import logging
from typing import List, Dict

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ATSEvaluator:
    """
    A class to evaluate the ATS (Applicant Tracking System) score by comparing keywords extracted 
    from a candidate's resume and the job's qualifying criteria.
    """
    # Expanded set of common stopwords for better filtering.
    STOPWORDS = {
        'the', 'and', 'to', 'of', 'a', 'in', 'for', 'on', 'with', 'as', 'by',
        'at', 'an', 'be', 'this', 'that', 'from', 'is', 'are', 'it', 'or', 'if',
        'you', 'your', 'i', 'we', 'us', 'our'
    }
    
    def __init__(self, resume_text: str, job_criteria_text: str):
        """
        Initializes the evaluator with the resume text and the job qualifying criteria text.
        
        Args:
            resume_text (str): Text extracted from the resume.
            job_criteria_text (str): Qualifying criteria text extracted from the job description.
        """
        self.resume_text = resume_text.lower() if resume_text else ""
        self.job_criteria_text = job_criteria_text.lower() if job_criteria_text else ""
    
    def _clean_text(self, text: str) -> List[str]:
        """
        Cleans the input text by removing punctuation, converting to lower case, and splitting into words.
        
        Args:
            text (str): The input text.
        
        Returns:
            List[str]: A list of cleaned words.
        """
        translator = str.maketrans('', '', string.punctuation)
        cleaned_text = text.translate(translator)
        words = cleaned_text.split()
        return words
    
    def extract_keywords(self, text: str) -> List[str]:
        """
        Extracts keywords from the provided text by filtering out stopwords and short words.
        
        Args:
            text (str): The input text.
            
        Returns:
            List[str]: A list of keywords.
        """
        words = self._clean_text(text)
        keywords = set(word for word in words if word not in self.STOPWORDS and len(word) > 2)
        return list(keywords)
    
    def evaluate(self) -> Dict[str, object]:
        """
        Evaluates the ATS score by comparing keywords extracted from the job qualifying criteria 
        with those extracted from the resume text.
        
        Returns:
            Dict[str, object]: A dictionary containing:
                - ats_score: The ATS score (0-100).
                - keywords_matched: List of keywords present in both resume and job criteria.
                - keywords_missing: List of keywords from job criteria missing in the resume.
        """
        criteria_keywords = self.extract_keywords(self.job_criteria_text)
        logger.info(f"Extracted job criteria keywords: {criteria_keywords}")
        
        resume_keywords = set(self.extract_keywords(self.resume_text))
        
        matched = []
        missing = []
        for keyword in criteria_keywords:
            if keyword in resume_keywords:
                matched.append(keyword)
            else:
                missing.append(keyword)
        
        total_keywords = len(criteria_keywords)
        ats_score = (len(matched) / total_keywords * 100) if total_keywords > 0 else 0
        
        return {
            "ats_score": round(ats_score, 2),
            "keywords_matched": matched,
            "keywords_missing": missing
        }

# For independent testing of the ATS evaluator.
if __name__ == "__main__":
    sample_resume = """
    John Doe
    Experienced Software Engineer with expertise in Python, Django, and REST APIs.
    Proficient in JavaScript, HTML, CSS, and modern frameworks like React.
    """
    
    sample_job_criteria = """
    Basic Qualifications:
    - Proficiency in Python and Django.
    - Experience with REST APIs, JavaScript, and React.
    Requirements:
    - Ability to work in a team.
    - Excellent problem-solving skills.
    """
    
    evaluator = ATSEvaluator(sample_resume, sample_job_criteria)
    result = evaluator.evaluate()
    print("ATS Evaluation Result:", result)
