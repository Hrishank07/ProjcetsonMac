"""
Module: ats_interface.py
Purpose: Provides an interactive interface to:
         a) Evaluate a single resume against a job description.
         b) Compare two resumes for their ATS score.
         
The module lists PDF resumes from the fixed 'data/' folder, then lets the user choose one
or two files via number input. It then extracts text from the chosen PDF(s) using ResumeParser,
and evaluates the resume(s) against the job description using ATSEvaluator.
"""

import os
import logging
from src.resume_parser import ResumeParser
from src.ats_evaluator import ATSEvaluator

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Determine the data folder location relative to this file.
DATA_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data')

def list_resume_files() -> list:
    """
    Lists all PDF files available in the data folder.
    
    Returns:
        List of PDF file names.
    """
    files = [f for f in os.listdir(DATA_FOLDER) if f.lower().endswith('.pdf')]
    return files

def choose_resume(prompt: str = "Choose a resume by entering its number: ") -> str:
    """
    Lists available resumes and prompts the user to choose one by number.
    
    Args:
        prompt (str): Input prompt for selection.
    
    Returns:
        The full path to the selected PDF file, or None if selection fails.
    """
    files = list_resume_files()
    if not files:
        print("No PDF resumes found in the data folder.")
        return None
    print("\nAvailable Resumes:")
    for idx, file in enumerate(files, start=1):
        print(f"{idx}. {file}")
    choice = input(prompt).strip()
    try:
        index = int(choice) - 1
        if index < 0 or index >= len(files):
            print("Invalid selection.")
            return None
        selected_file = files[index]
        return os.path.join(DATA_FOLDER, selected_file)
    except Exception as e:
        logger.error(f"Error selecting resume: {e}")
        return None

def input_job_description() -> str:
    """
    Prompts the user to input the job description text.
    
    Returns:
        The job description text as a string.
    """
    print("\nEnter the job description text (paste it here and press Enter):")
    jd_text = input()
    return jd_text

def evaluate_single_resume() -> None:
    """
    Evaluates a single selected resume against a job description.
    """
    resume_path = choose_resume("Enter the resume number you want to evaluate: ")
    if not resume_path:
        return
    jd_text = input_job_description()
    
    # Use ResumeParser to extract text from the selected resume PDF.
    parser = ResumeParser(resume_path)
    resume_text = parser.extract_text()
    
    # Evaluate using the ATS evaluator.
    evaluator = ATSEvaluator(resume_text, jd_text)
    result = evaluator.evaluate()
    
    print("\nATS Evaluation Result:")
    print(f"ATS Score: {result['ats_score']}/100")
    print("Keywords Matched:", result['keywords_matched'])
    print("Keywords Missing:", result['keywords_missing'])

def compare_two_resumes() -> None:
    """
    Compares two selected resumes by evaluating each against the same job description.
    """
    print("\nSelect the first resume:")
    resume_path1 = choose_resume("Enter the first resume number: ")
    if not resume_path1:
        return
    print("\nSelect the second resume:")
    resume_path2 = choose_resume("Enter the second resume number: ")
    if not resume_path2:
        return
    jd_text = input_job_description()
    
    # Process the first resume.
    parser1 = ResumeParser(resume_path1)
    resume_text1 = parser1.extract_text()
    evaluator1 = ATSEvaluator(resume_text1, jd_text)
    result1 = evaluator1.evaluate()
    
    # Process the second resume.
    parser2 = ResumeParser(resume_path2)
    resume_text2 = parser2.extract_text()
    evaluator2 = ATSEvaluator(resume_text2, jd_text)
    result2 = evaluator2.evaluate()
    
    print("\nATS Evaluation for Resume 1:")
    print(f"ATS Score: {result1['ats_score']}/100")
    print("Keywords Matched:", result1['keywords_matched'])
    print("Keywords Missing:", result1['keywords_missing'])
    
    print("\nATS Evaluation for Resume 2:")
    print(f"ATS Score: {result2['ats_score']}/100")
    print("Keywords Matched:", result2['keywords_matched'])
    print("Keywords Missing:", result2['keywords_missing'])
    
    # Comparison output.
    if result1['ats_score'] > result2['ats_score']:
        print("\nResume 1 has a better ATS match.")
    elif result1['ats_score'] < result2['ats_score']:
        print("\nResume 2 has a better ATS match.")
    else:
        print("\nBoth resumes have the same ATS score.")

def main() -> None:
    """
    Main interactive function to choose between single resume evaluation or comparing two resumes.
    """
    print("ATS Evaluation Interface")
    print("1. Evaluate a single resume")
    print("2. Compare two resumes")
    choice = input("Enter your choice (1 or 2): ").strip()
    if choice == '1':
        evaluate_single_resume()
    elif choice == '2':
        compare_two_resumes()
    else:
        print("Invalid choice. Exiting.")

if __name__ == "__main__":
    main()
